import type { CSSProperties } from 'react';

export const styles = {
  gameContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    minHeight: '100vh',
    padding: '20px 0',
    gap: '20px',
  } satisfies CSSProperties,

  backButton: {
    padding: '12px 24px',
    fontSize: '16px',
    cursor: 'pointer',
    borderRadius: '8px',
    border: '2px solid #666',
    backgroundColor: '#f5f5f5',
    fontWeight: 600,
    transition: 'all 0.2s ease',
    alignSelf: 'flex-start',
    marginLeft: '20px',
  } satisfies CSSProperties,

  finishedContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
    padding: '20px',
  } satisfies CSSProperties,

  finishedText: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#4CAF50',
  } satisfies CSSProperties,

  finishedButton: {
    margin: '20px',
    padding: '15px 30px',
    fontSize: '18px',
    cursor: 'pointer',
    borderRadius: '8px',
    border: '2px solid #4CAF50',
    backgroundColor: '#4CAF50',
    color: 'white',
    fontWeight: 'bold',
  } satisfies CSSProperties,
};
