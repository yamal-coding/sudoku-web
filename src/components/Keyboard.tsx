import React, { useCallback } from 'react';
import './Keyboard.css';
import numberIcons from './Numbers.tsx';

interface KeyboardProps {
  onKeyPress?: (value: number) => void;
}

const Keyboard: React.FC<KeyboardProps> = ({ onKeyPress }) => {
  const handleActivate = useCallback(
    (val: number) => (e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>) => {
      // Allow click or Enter/Space key press
      if ('key' in e) {
        if (e.key !== 'Enter' && e.key !== ' ') return;
        e.preventDefault();
      }
      onKeyPress?.(val);
    },
    [onKeyPress]
  );

  return (
    <div className="sudoku-keyboard" role="group" aria-label="Number input">
      {Array.from({ length: 9 }, (_, i) => {
        const num = i + 1;
        return (
          <div
            key={num}
            className="sudoku-key icon-only"
            role="button"
            tabIndex={0}
            aria-label={`Number ${num}`}
            onClick={handleActivate(num)}
            onKeyDown={handleActivate(num)}
          >
            <img
              src={numberIcons[num]}
              alt=""
              aria-hidden="true"
              draggable={false}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Keyboard;