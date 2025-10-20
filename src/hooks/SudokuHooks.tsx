import { useEffect, useState } from 'react';
import type { SudokuGame } from '../services/SudokuService.js';
import { getSudokuGame } from '../services/SudokuService.js';

export function useSudoku() {
  const [game, setGame] = useState<SudokuGame | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false)

  useEffect(() => {
    setLoading(true);
    getSudokuGame()
      .then(setGame)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return { game, loading, error };
}