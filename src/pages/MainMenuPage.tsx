import { styles, getDifficultyButtonStyle } from './MainMenuPage.styles.js';

type Difficulty = 'easy' | 'medium' | 'hard';

interface MainMenuPageProps {
  onSelectDifficulty: (difficulty: Difficulty) => void;
}

interface DifficultyButtonProps {
  label: string;
  color: string;
  onClick: () => void;
}

function DifficultyButton({ label, color, onClick }: DifficultyButtonProps) {
  return (
    <button onClick={onClick} style={getDifficultyButtonStyle(color)}>
      {label}
    </button>
  );
}

const DIFFICULTY_OPTIONS: Array<{ difficulty: Difficulty; label: string; color: string }> = [
  { difficulty: 'easy', label: 'Easy', color: '#4CAF50' },
  { difficulty: 'medium', label: 'Medium', color: '#FF9800' },
  { difficulty: 'hard', label: 'Hard', color: '#f44336' },
];

function MainMenuPage({ onSelectDifficulty }: MainMenuPageProps) {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Sudoku</h1>
      <div style={styles.buttonContainer}>
        {DIFFICULTY_OPTIONS.map(({ difficulty, label, color }) => (
          <DifficultyButton
            key={difficulty}
            label={label}
            color={color}
            onClick={() => onSelectDifficulty(difficulty)}
          />
        ))}
      </div>
    </div>
  );
}

export default MainMenuPage;
