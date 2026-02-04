import type { CSSProperties } from 'react';

export const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    gap: '4px',
  } satisfies CSSProperties,

  optionsRow: {
    width: '100%',
    maxWidth: 'min(100%, 500px)',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'stretch',
    margin: '0 auto',
    padding: 0,
    boxSizing: 'border-box',
  } satisfies CSSProperties,

  gameOption: {
    flex: '1 1 0',
    width: '100%',
    height: 'clamp(34px, 6vw, 52px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    borderRadius: '50%',
    position: 'relative',
    background: 'transparent',
    border: 'none',
  } satisfies CSSProperties,

  gameOptionDisabled: {
    opacity: 0.35,
    cursor: 'not-allowed',
    filter: 'grayscale(40%)',
  } satisfies CSSProperties,

  gameOptionActive: {
    backgroundColor: 'rgba(25, 118, 210, 0.1)',
  } satisfies CSSProperties,

  gameOptionIcon: {
    width: '60%',
    height: '60%',
    objectFit: 'contain',
    pointerEvents: 'none',
    userSelect: 'none',
  } satisfies CSSProperties,

  gameOptionLabel: {
    position: 'absolute',
    bottom: '-1.05em',
    left: '50%',
    transform: 'translateX(-50%)',
    fontSize: '0.65rem',
    fontWeight: 500,
    whiteSpace: 'nowrap',
    color: '#222',
    pointerEvents: 'none',
    userSelect: 'none',
  } satisfies CSSProperties,

  keyboard: {
    display: 'flex',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 0,
    margin: '8px auto 0 auto',
    padding: 0,
    maxWidth: 'none',
  } satisfies CSSProperties,

  key: {
    background: 'transparent',
    border: 'none',
    padding: 0,
    width: 'clamp(36px, 6.8vw, 56px)',
    height: 'clamp(36px, 6.8vw, 56px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    position: 'relative',
    borderRadius: '6px',
    transition: 'transform 0.12s ease',
  } satisfies CSSProperties,

  keyIcon: {
    width: '80%',
    height: '80%',
    objectFit: 'contain',
    pointerEvents: 'none',
    userSelect: 'none',
  } satisfies CSSProperties,
};

// Helper to get game option style
export function getGameOptionStyle(disabled: boolean, isActive: boolean): CSSProperties {
  return {
    ...styles.gameOption,
    ...(disabled ? styles.gameOptionDisabled : {}),
    ...(isActive ? styles.gameOptionActive : {}),
  };
}
