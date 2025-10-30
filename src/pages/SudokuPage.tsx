import React from 'react';
import { useState } from 'react';
import { useSudoku } from '../hooks/SudokuHooks.js';
import { saveSudokuBoard, onGameFinished } from '../services/SudokuService.js';
import type { SudokuGame } from '../services/SudokuService.js';
import type { SudokuCell } from '../components/Sudoku.js';
import Keyboard from '../components/Keyboard.js';
import Sudoku from '../components/Sudoku.js';

const SudokuPage: React.FC = () => {
  const { game, loading, error } = useSudoku();

  if (error) {
    return <Error />;
  }

  if (loading || game === null) {
    return <Loading />;
  }

  return <Game game={game}/>;
};

const Error: React.FC = () => {
  return <div>Error loading Sudoku : (</div>;
}

const Loading: React.FC = () => {
  return <div>Loading...</div>;
}

interface GameProps {
  game: SudokuGame;
}

const Game: React.FC<GameProps> = ({ game }) => {
  const [selectedCell, setSelectedCell] = useState<number | undefined>(undefined);
  const [board, setBoard] = useState<SudokuCell[]>(game.mission);
  const [history, setHistory] = useState<Array<{ index: number; prev: string | number }>>([]);
  const [gameHasFinished, setGameHasFinished] = useState(false);

  const onNumberPressed = (value: number) => {
    if (selectedCell === undefined) return;

    const current = board[selectedCell];
    if (!current || current.fixed) return;
    
    const prevValue = current.value;
    const newBoard = [...board];
    newBoard[selectedCell] = { ...current, value: value.toString(), fixed: false } as SudokuCell;

    // Record history only if actual change
    if (prevValue !== value.toString()) {
      setHistory(h => [...h, { index: selectedCell, prev: prevValue }]);
    }
    
    setBoard(newBoard);
    saveSudokuBoard(newBoard);
    
    if (checkIfBoardIsComplete(newBoard, game.solution)) {
      onGameFinished();
      setGameHasFinished(true);
    }
  };

  const onClearBoard = () => {
    const clearedBoard = board.map(cell => (cell.fixed ? cell : { ...cell, value: '0' }));
    setBoard(clearedBoard);
    saveSudokuBoard(clearedBoard);
    setHistory([]);
  };

  const onErase = () => {
    onNumberPressed(0);
  };

  const onUndo = () => {
    setHistory(h => {
      const len = h.length;
      if (len === 0) return h;
      
      const lastEntry = h[len - 1];
      const newHistory = h.slice(0, len - 1);

      setBoard(prev => {
        const undoneBoard = [...prev];
        const cell = undoneBoard[lastEntry.index];
        if (cell) {
          undoneBoard[lastEntry.index] = { ...cell, value: lastEntry.prev } as SudokuCell;
          saveSudokuBoard(undoneBoard);
        }
        return undoneBoard;
      });

      if (gameHasFinished) {
        setGameHasFinished(checkIfBoardIsComplete(board, game.solution));
      }
      return newHistory;
    });
  };

  if (!gameHasFinished) {
    return (
      <>
        <Sudoku 
          board={board}
          selectedCell={selectedCell}
          onCellClick={setSelectedCell}
        />
        <Keyboard 
          onNumberPressed={onNumberPressed} 
          onClearBoard={onClearBoard}
          onErase={onErase}
          onUndo={history.length ? onUndo : () => {}}
            undoDisabled={history.length === 0}
        />
      </>
    );
  } else {
    return (
      <div>
        Game finished
      </div>
    );
  }
};


function checkIfBoardIsComplete(board: SudokuCell[], solution: string): boolean {
  const boardStr = board.map(cell => cell.value).join('');
  return boardStr === solution;
}

export default SudokuPage;