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
  
  const [board, setBoard] = useState<SudokuCell[]>(
    game.mission
  );

  const [gameHasFinished, setGameHasFinished] = useState(false);

  const onNumberPressed = (value: number) => {
    if (
      selectedCell !== undefined &&
      !board[selectedCell]?.fixed === true
    ) {
      const newBoard = [...board];
      newBoard[selectedCell] = { ...newBoard[selectedCell], value: value.toString(), fixed: false };
      setBoard(newBoard);
      saveSudokuBoard(newBoard);

      if (checkIfBoardIsComplete(newBoard, game.solution)) {
        onGameFinished()
        setGameHasFinished(true);
      }
    }
  };

  const onClearBoard = () => {
    const clearedBoard = board.map(cell => cell.fixed ? cell : { ...cell, value: '0' });
    setBoard(clearedBoard);
    saveSudokuBoard(clearedBoard);
  }

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