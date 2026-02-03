interface MainMenuPageProps {
  onSelectDifficulty: (difficulty: 'easy' | 'medium' | 'hard') => void;
}

interface DifficultyButtonProps {
  difficulty: 'easy' | 'medium' | 'hard';
  label: string;
  color: string;
  onClick: () => void;
}

const DifficultyButton: React.FC<DifficultyButtonProps> = ({ label, color, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '15px 40px',
        fontSize: '18px',
        cursor: 'pointer',
        borderRadius: '8px',
        border: `2px solid ${color}`,
        backgroundColor: color,
        color: 'white',
        fontWeight: 'bold'
      }}
    >
      {label}
    </button>
  );
};

const MainMenuPage: React.FC<MainMenuPageProps> = ({ onSelectDifficulty }) => {
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
        <DifficultyButton
          difficulty="easy"
          label="Easy"
          color="#4CAF50"
          onClick={() => onSelectDifficulty('easy')}
        />
        <DifficultyButton
          difficulty="medium"
          label="Medium"
          color="#FF9800"
          onClick={() => onSelectDifficulty('medium')}
        />
        <DifficultyButton
          difficulty="hard"
          label="Hard"
          color="#f44336"
          onClick={() => onSelectDifficulty('hard')}
        />
      </div>
    </div>
  );
};

export default MainMenuPage;
