import type { CSSProperties } from 'react';

export const styles = {
  grid: {
    display: 'inline-block',
    border: '2px solid #333',
    background: '#fff',
    maxWidth: 'min(90vw, 500px)',
    width: '100%',
    margin: '0 auto',
  } satisfies CSSProperties,

  row: {
    display: 'flex',
    width: '100%',
  } satisfies CSSProperties,

  cell: {
    flex: 1,
    aspectRatio: '1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
    minHeight: 0,
    position: 'relative',
  } satisfies CSSProperties,

  cellNumber: {
    width: '70%',
    height: '70%',
    objectFit: 'contain',
    userSelect: 'none',
    pointerEvents: 'none',
  } satisfies CSSProperties,

  fixedCell: {
    backgroundColor: '#e0e0e0',
  } satisfies CSSProperties,

  selectedCell: {
    backgroundColor: '#ffff00',
  } satisfies CSSProperties,

  annotationGrid: {
    position: 'absolute',
    inset: '4% 4%',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridTemplateRows: 'repeat(3, 1fr)',
    fontSize: 'clamp(0.35rem, 1.6vw, 0.55rem)',
    lineHeight: 1,
    color: '#222',
    pointerEvents: 'none',
    userSelect: 'none',
  } satisfies CSSProperties,

  annotationCell: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 500,
    opacity: 0.6,
  } satisfies CSSProperties,

  annotationCellActive: {
    opacity: 1,
  } satisfies CSSProperties,

  annotationIcon: {
    width: '80%',
    height: '80%',
    objectFit: 'contain',
    pointerEvents: 'none',
    userSelect: 'none',
    display: 'block',
  } satisfies CSSProperties,
};

// Helper to get cell border styles based on position
export function getCellBorderStyle(rowIdx: number, colIdx: number): CSSProperties {
  const style: CSSProperties = {};
  
  // Every 3rd column gets thicker right border
  if ((colIdx + 1) % 3 === 0 && colIdx < 8) {
    style.borderRight = '2px solid #333';
  }
  
  // Every 3rd row gets thicker bottom border
  if ((rowIdx + 1) % 3 === 0 && rowIdx < 8) {
    style.borderBottom = '2px solid #333';
  }
  
  return style;
}

// Helper to combine cell styles
export function getCellStyle(
  isSelected: boolean,
  isFixed: boolean,
  isClickable: boolean,
  rowIdx: number,
  colIdx: number
): CSSProperties {
  return {
    ...styles.cell,
    ...getCellBorderStyle(rowIdx, colIdx),
    ...(isFixed ? styles.fixedCell : {}),
    ...(isSelected ? styles.selectedCell : {}),
    ...(isClickable ? { cursor: 'pointer' } : {}),
  };
}
