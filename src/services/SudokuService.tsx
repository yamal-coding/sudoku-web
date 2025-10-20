import { fetchSudoku } from '../api/SudokuApi.js';
import type { SudokuCell } from '../components/Sudoku.js';
import { loadSudokuGame, saveSudokuGame, saveSudokuBoard as saveBoard, removeGame } from './SudokuLocalStorage.js';

export interface SudokuGame {
  mission: SudokuCell[];
  solution: string;
}

export async function getSudokuGame(): Promise<SudokuGame> {
  // Check for saved board and solution in localStorage before making API request
  const saved = loadSudokuGame();
  if (saved) {
    return { mission: saved.board, solution: saved.solution };
  }

  const data = await fetchSudoku();
  const parsedBoard = parseBoardString(data.mission);
  // Save both board and solution to localStorage
  saveSudokuGame({ board: parsedBoard, solution: data.solution });
  return {
    mission: parsedBoard,
    solution: data.solution,
  };
}

function parseBoardString(boardStr: string): SudokuCell[] {
  return boardStr.split('').map((char) => ({
    value: char,
    fixed: char !== '0',
  }));
}

export function saveSudokuBoard(board: SudokuCell[]) {
  saveBoard(board)
}

export function onGameFinished() {
  removeGame()
}