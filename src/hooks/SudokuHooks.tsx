import { useEffect, useState } from 'react';
import type { SudokuGame } from '../services/SudokuService.js';
import { getSudokuGame } from '../services/SudokuService.js';

export function useSudoku(difficulty: 'easy' | 'medium' | 'hard' = 'easy') {
  const [game, setGame] = useState<SudokuGame | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false)

  useEffect(() => {
    setLoading(true);
    getSudokuGame(difficulty)
      .then(setGame)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [difficulty]);

  return { game, loading, error };
}