import type { SudokuCell } from '../components/Sudoku.js';

const BOARD_KEY = 'sudoku-board-state';
const SOLUTION_KEY = 'sudoku-solution';

export interface SavedSudoku {
  board: SudokuCell[];
  solution: string;
}

export function loadSudokuGame(): SavedSudoku | null {
  const boardStr = localStorage.getItem(BOARD_KEY);
  const solution: string = localStorage.getItem(SOLUTION_KEY) || '';
  if (boardStr) {
    try {
      const board: SudokuCell[] = JSON.parse(boardStr);
      if (Array.isArray(board) && board.length === 81 && solution.length === 81) {
        return { board, solution };
      }
    } catch {}
  }
  return null;
}

export function saveSudokuGame(game: SavedSudoku) {
  localStorage.setItem(BOARD_KEY, JSON.stringify(game.board));
  localStorage.setItem(SOLUTION_KEY, game.solution);
}

export function saveSudokuBoard(board: SudokuCell[]) {
  localStorage.setItem(BOARD_KEY, JSON.stringify(board));
}

export function removeGame() {
  localStorage.removeItem(BOARD_KEY);
  localStorage.removeItem(SOLUTION_KEY);
}
