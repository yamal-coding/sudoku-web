import type { CSSProperties } from 'react';

export const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    gap: '20px',
  } satisfies CSSProperties,

  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    margin: 0,
  } satisfies CSSProperties,

  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  } satisfies CSSProperties,

  difficultyButton: {
    padding: '15px 40px',
    fontSize: '18px',
    cursor: 'pointer',
    borderRadius: '8px',
    color: 'white',
    fontWeight: 'bold',
  } satisfies CSSProperties,
};

// Helper to get difficulty button style with color
export function getDifficultyButtonStyle(color: string): CSSProperties {
  return {
    ...styles.difficultyButton,
    border: `2px solid ${color}`,
    backgroundColor: color,
  };
}
