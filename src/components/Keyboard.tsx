import React from 'react';
import './Keyboard.css';

interface KeyboardProps {
  onKeyPress?: (value: number) => void;
}

const Keyboard: React.FC<KeyboardProps> = ({ onKeyPress }) => (
  <div className="sudoku-keyboard">
    {Array.from({ length: 9 }, (_, i) => (
      <button
        key={i + 1}
        className="sudoku-key"
        onClick={() => onKeyPress && onKeyPress(i + 1)}
        type="button"
      >
        {i + 1}
      </button>
    ))}
  </div>
);

export default Keyboard;