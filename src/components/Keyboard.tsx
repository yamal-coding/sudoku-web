import { useCallback } from 'react';
import type { MouseEvent, KeyboardEvent } from 'react';
import numberIcons from './Numbers.js';
import reloadIcon from '../assets/reload.svg';
import undoIcon from '../assets/undo.svg';
import eraseIcon from '../assets/erase.svg';
import annotationIcon from '../assets/annotation.svg';
import { styles, getGameOptionStyle } from './Keyboard.styles.js';

interface KeyboardProps {
  onNumberPressed?: (value: number) => void;
  onClearBoard: () => void;
  onUndo: () => void;
  undoDisabled: boolean;
  onErase: () => void;
  onAnnotate: () => void;
  annotateActive?: boolean;
}

function Keyboard({ 
  onNumberPressed, 
  onClearBoard, 
  onUndo,
  undoDisabled,
  onErase,
  onAnnotate,
  annotateActive = false,
}: KeyboardProps) {
  return (
    <div style={styles.wrapper}>
      <div style={styles.optionsRow} role="group" aria-label="Game options">
        <GameOption icon={reloadIcon} label="Clear" onClick={onClearBoard} />
        <GameOption icon={undoIcon} label="Undo" onClick={onUndo} disabled={undoDisabled} />
        <GameOption icon={eraseIcon} label="Erase" onClick={onErase} />
        <GameOption
          icon={annotationIcon}
          label={`Notes (${annotateActive ? 'On' : 'Off'})`}
          onClick={onAnnotate}
          isActive={annotateActive}
        />
      </div>
      {onNumberPressed && <NumericKeyboard onKeyPress={onNumberPressed} />}
    </div>
  );
}

interface GameOptionProps {
  icon: string;
  label: string;
  onClick: () => void;
  disabled?: boolean;
  isActive?: boolean;
}

function GameOption({ icon, label, onClick, disabled = false, isActive = false }: GameOptionProps) {
  const handleInteraction = useCallback(
    (e: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>) => {
      if (disabled) return;
      if ('key' in e) {
        if (e.key !== 'Enter' && e.key !== ' ') return;
        e.preventDefault();
      }
      onClick();
    },
    [onClick, disabled]
  );

  return (
    <div
      style={getGameOptionStyle(disabled, isActive)}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-label={label + (disabled ? ' (disabled)' : '')}
      onClick={handleInteraction}
      onKeyDown={handleInteraction}
    >
      <img src={icon} alt="" aria-hidden="true" draggable={false} style={styles.gameOptionIcon} />
      <span style={styles.gameOptionLabel} aria-hidden="true">{label}</span>
    </div>
  );
}

interface NumericKeyboardProps {
  onKeyPress: (value: number) => void;
}

function NumericKeyboard({ onKeyPress }: NumericKeyboardProps) {
  const handleActivate = useCallback(
    (val: number) => (e: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>) => {
      if ('key' in e) {
        if (e.key !== 'Enter' && e.key !== ' ') return;
        e.preventDefault();
      }
      onKeyPress(val);
    },
    [onKeyPress]
  );

  return (
    <div style={styles.keyboard} role="group" aria-label="Number input">
      {Array.from({ length: 9 }, (_, i) => {
        const num = i + 1;
        return (
          <div
            key={num}
            style={styles.key}
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
              style={styles.keyIcon}
            />
          </div>
        );
      })}
    </div>
  );
}

export default Keyboard;