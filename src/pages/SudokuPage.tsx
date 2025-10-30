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
  const [history, setHistory] = useState<Array<{ index: number; prevValue: string | number; prevAnnotations?: number[] }>>([]);
  const [annotationMode, setAnnotationMode] = useState(false);
  const [gameHasFinished, setGameHasFinished] = useState(false);

  const onNumberPressed = (value: number) => {
    if (selectedCell === undefined) return;
    const current = board[selectedCell];
    if (!current || current.fixed) return;

    // Annotation mode: toggle candidate numbers in empty cells
    if (annotationMode) {
      const prevAnnotations = current.annotations || [];
      const has = prevAnnotations.includes(value);
      const nextAnnotations = has
        ? prevAnnotations.filter(n => n !== value)
        : [...prevAnnotations, value].sort((a, b) => a - b);

      const newBoard = [...board];
      // If cell currently has a value, remove it (set to '0') before applying annotations
      const prevValueForHistory = current.value;
      newBoard[selectedCell] = { ...current, value: '0', annotations: nextAnnotations } as SudokuCell;

      setHistory(h => [
        ...h,
        { index: selectedCell, prevValue: prevValueForHistory, prevAnnotations: prevAnnotations }
      ]);

      setBoard(newBoard);
      saveSudokuBoard(newBoard);
      return;
    }

    // Normal number entry path
    const prevValue = current.value;
    const prevAnnotations = current.annotations ? [...current.annotations] : undefined;
    const newBoard = [...board];
    const updated: SudokuCell = { ...current, value: value.toString(), fixed: false };
    if (value === 0) {
      updated.annotations = [];
    } else if (current.annotations) {
      updated.annotations = current.annotations;
    }
    newBoard[selectedCell] = updated;

    if (prevValue !== value.toString()) {
      setHistory(h => [
        ...h,
        prevAnnotations !== undefined
          ? { index: selectedCell, prevValue, prevAnnotations }
          : { index: selectedCell, prevValue }
      ]);
    }

    setBoard(newBoard);
    saveSudokuBoard(newBoard);

    if (checkIfBoardIsComplete(newBoard, game.solution)) {
      onGameFinished();
      setGameHasFinished(true);
    }
  };

  const onClearBoard = () => {
    const clearedBoard = board.map(cell => (cell.fixed ? cell : { ...cell, value: '0', annotations: [] }));
    setBoard(clearedBoard);
    saveSudokuBoard(clearedBoard);
    setHistory([]);
    setGameHasFinished(false);
  };

  const onErase = () => {
    if (selectedCell === undefined) return;

    const current = board[selectedCell];
    if (!current || current.fixed) return;
    
    const prevValue = current.value;
    const prevAnnotations = current.annotations ? [...current.annotations] : undefined;
    
    const isEmpty = prevValue === 0 || prevValue === '0' || prevValue === '';
    if (isEmpty && (!prevAnnotations || prevAnnotations.length === 0)) return;

    const newBoard = [...board];
    const updated: SudokuCell = { ...current, value: '0', fixed: false, annotations: [] };
    newBoard[selectedCell] = updated;

    setHistory(h => [
      ...h,
      prevAnnotations !== undefined
        ? { index: selectedCell, prevValue, prevAnnotations }
        : { index: selectedCell, prevValue }
    ]);
    setBoard(newBoard);
    saveSudokuBoard(newBoard);
    setGameHasFinished(false);
  };

  const onUndo = () => {
    setHistory(h => {
      const len = h.length;
      if (len === 0) return h;
      const lastEntry = h[len - 1];
      if (!lastEntry) return h;
      const newHistory = h.slice(0, len - 1);

      setBoard(prev => {
        const undoneBoard = [...prev];
        const cell = undoneBoard[lastEntry.index];
        if (cell) {
          const restored: SudokuCell = { ...cell, value: lastEntry.prevValue };
          if (lastEntry.prevAnnotations !== undefined) {
            restored.annotations = lastEntry.prevAnnotations;
          } else {
            // If previous annotations undefined and current cell has annotations, remove them to match prior state
            if ('annotations' in restored) {
              delete (restored as any).annotations;
            }
          }
          undoneBoard[lastEntry.index] = restored;
          saveSudokuBoard(undoneBoard);
          // Recalculate finished state after undo
          setGameHasFinished(checkIfBoardIsComplete(undoneBoard, game.solution));
        }
        return undoneBoard;
      });

      return newHistory;
    });
  };

  const onAnnotateToggle = () => {
    setAnnotationMode(m => !m);
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
          onAnnotate={onAnnotateToggle}
          annotateActive={annotationMode}
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