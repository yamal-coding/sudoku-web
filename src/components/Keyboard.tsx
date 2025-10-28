import React, { useCallback } from 'react';
import './Keyboard.css';
import numberIcons from './Numbers.tsx';
import reloadIcon from '../assets/reload.svg';

interface KeyboardProps {
  onKeyPress?: (value: number) => void;
  onClearBoard?: () => void;
}

interface NumericKeyboardProps {
  onKeyPress: (value: number) => void;
}

const Keyboard: React.FC<KeyboardProps> = ({ onKeyPress, onClearBoard }) => {
  const activateReload = useCallback(
    (e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>) => {
      if ('key' in e) {
        if (e.key !== 'Enter' && e.key !== ' ') return;
        e.preventDefault();
      }
      onClearBoard?.();
    },
    [onClearBoard]
  );

  return (
    <div className="keyboard-wrapper">
      <div
        className="reload-key"
        role="button"
        tabIndex={0}
        aria-label="Reload board"
        onClick={activateReload}
        onKeyDown={activateReload}
      >
        <img src={reloadIcon} alt="" aria-hidden="true" draggable={false} />
      </div>
      {onKeyPress && <NumericKeyboard onKeyPress={onKeyPress} />}
    </div>
  );
}

const NumericKeyboard: React.FC<NumericKeyboardProps> = ({ onKeyPress }) => {
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