import './App.css'
import { useState, useEffect } from 'react';
import SudokuPage from './pages/SudokuPage.js';
import MainMenuPage from './pages/MainMenuPage.js';
import { getOngoingGame, fetchNewGame, onGameFinished } from './services/SudokuService.js';
import type { SudokuGame } from './services/SudokuService.js';

type Difficulty = 'easy' | 'medium' | 'hard' | null;

function App() {
  const [difficulty, setDifficulty] = useState<Difficulty>(null);
  const [game, setGame] = useState<SudokuGame | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    const ongoingGame = getOngoingGame();
    if (ongoingGame) {
      setGame(ongoingGame);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (difficulty !== null) {
      setLoading(true);
      fetchNewGame(difficulty)
        .then(setGame)
        .catch(() => setError(true))
        .finally(() => setLoading(false));
    }
  }, [difficulty]);

  if (loading) {
    return <div className="App"><div>Loading...</div></div>;
  }

  if (error) {
    return <div className="App"><div>Error loading Sudoku : (</div></div>;
  }

  if (game !== null) {
    return (
      <div className="App">
        <SudokuPage 
          game={game}
          onBackToMenu={() => {
            setDifficulty(null);
            setGame(null);
            onGameFinished();
          }} 
        />
      </div>
    );
  }

  return (
    <div className="App">
      <MainMenuPage onSelectDifficulty={setDifficulty} />
    </div>
  )
}

export default App
