import React, { useCallback } from 'react';
import './Keyboard.css';
import numberIcons from './Numbers.tsx';
import reloadIcon from '../assets/reload.svg';
import undoIcon from '../assets/undo.svg';
import eraseIcon from '../assets/erase.svg';
import annotationIcon from '../assets/annotation.svg';

interface KeyboardProps {
  onNumberPressed?: (value: number) => void;
  onClearBoard: () => void;
  onUndo: () => void;
  undoDisabled: boolean;
  onErase?: () => void;
  onAnnotate?: () => void;
}

const Keyboard: React.FC<KeyboardProps> = ({ 
  onNumberPressed, 
  onClearBoard, 
  onUndo,
  undoDisabled,
  onErase,
  onAnnotate
 }) => (
  <div className="keyboard-wrapper">
    <div className="game-options-row" role="group" aria-label="Game options">
      <GameOption icon={reloadIcon} label="Reload board" onClick={onClearBoard} />
      <GameOption icon={undoIcon} label="Undo" onClick={onUndo} disabled={undoDisabled} />
      {onErase && <GameOption icon={eraseIcon} label="Erase" onClick={onErase} />}
      {onAnnotate && <GameOption icon={annotationIcon} label="Annotation" onClick={onAnnotate} />}
    </div>
    {onNumberPressed && <NumericKeyboard onKeyPress={onNumberPressed} />}
  </div>
);

const GameOption: React.FC<{
  icon: string;
  label: string;
  onClick: () => void;
  disabled?: boolean | undefined;
  className?: string;
}> = ({ icon, label, onClick, disabled = false, className }) => {
  const handle = useCallback(
    (e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>) => {
      if (disabled) return;
      if ('key' in e) {
        if (e.key !== 'Enter' && e.key !== ' ') return;
        e.preventDefault();
      }
      if (!disabled) onClick();
    },
    [onClick, disabled]
  );

  return (
    <div
      className={`game-option${disabled ? ' disabled' : ''}${className ? ' ' + className : ''}`}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-label={label + (disabled ? ' (disabled)' : '')}
      onClick={handle}
      onKeyDown={handle}
    >
      <img src={icon} alt="" aria-hidden="true" draggable={false} />
    </div>
  );
};

interface NumericKeyboardProps {
  onKeyPress: (value: number) => void;
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