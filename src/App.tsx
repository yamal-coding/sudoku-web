import './App.css'
import { useState } from 'react';
import SudokuPage from './pages/SudokuPage.js';

type Difficulty = 'easy' | 'medium' | 'hard' | null;

function App() {
  const [difficulty, setDifficulty] = useState<Difficulty>(null);

  if (difficulty === null) {
    return (
      <div className="App">
        <MainMenu onSelectDifficulty={setDifficulty} />
      </div>
    );
  }

  return (
    <div className="App">
      <SudokuPage difficulty={difficulty} onBackToMenu={() => setDifficulty(null)} />
    </div>
  )
}

interface MainMenuProps {
  onSelectDifficulty: (difficulty: 'easy' | 'medium' | 'hard') => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ onSelectDifficulty }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      gap: '20px'
    }}>
      <h1>Sudoku</h1>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
      }}>
        <button
          onClick={() => onSelectDifficulty('easy')}
          style={{
            padding: '15px 40px',
            fontSize: '18px',
            cursor: 'pointer',
            borderRadius: '8px',
            border: '2px solid #4CAF50',
            backgroundColor: '#4CAF50',
            color: 'white',
            fontWeight: 'bold'
          }}
        >
          Easy
        </button>
        <button
          onClick={() => onSelectDifficulty('medium')}
          style={{
            padding: '15px 40px',
            fontSize: '18px',
            cursor: 'pointer',
            borderRadius: '8px',
            border: '2px solid #FF9800',
            backgroundColor: '#FF9800',
            color: 'white',
            fontWeight: 'bold'
          }}
        >
          Medium
        </button>
        <button
          onClick={() => onSelectDifficulty('hard')}
          style={{
            padding: '15px 40px',
            fontSize: '18px',
            cursor: 'pointer',
            borderRadius: '8px',
            border: '2px solid #f44336',
            backgroundColor: '#f44336',
            color: 'white',
            fontWeight: 'bold'
          }}
        >
          Hard
        </button>
      </div>
    </div>
  );
};

export default App
