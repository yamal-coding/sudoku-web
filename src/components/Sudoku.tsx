import React from 'react';
import './sudoku.css';
import n1 from '../assets/number-1.svg';
import n2 from '../assets/number-2.svg';
import n3 from '../assets/number-3.svg';
import n4 from '../assets/number-4.svg';
import n5 from '../assets/number-5.svg';
import n6 from '../assets/number-6.svg';
import n7 from '../assets/number-7.svg';
import n8 from '../assets/number-8.svg';
import n9 from '../assets/number-9.svg';

const numberIcons: Record<string | number, string> = {
  1: n1,
  2: n2,
  3: n3,
  4: n4,
  5: n5,
  6: n6,
  7: n7,
  8: n8,
  9: n9,
};

interface SudokuProps {
  board: SudokuCell[];
  selectedCell?: number | undefined; // Index of the selected cell (0-80)
  onCellClick?: (cellIndex: number) => void;
}

const Sudoku: React.FC<SudokuProps> = ({ board, selectedCell, onCellClick }) => {
  const rows = Array.from({ length: 9 }, (_, row) =>
    board.slice(row * 9, row * 9 + 9)
  );

  const selectedRow = selectedCell !== undefined ? Math.floor(selectedCell / 9) : -1;
  const selectedCol = selectedCell !== undefined ? selectedCell % 9 : -1;

  return (
    <div className="sudoku-grid">
      {rows.map((rowArr, rowIdx) => (
        <div className="sudoku-row" key={rowIdx}>
          {rowArr.map((cell, colIdx) => {
            const value = cell.value === 0 || cell.value === '0' ? '' : cell.value;
            const isEmpty = value === '';
            const selectedCellClassName =
              rowIdx === selectedRow && colIdx === selectedCol ? ' selected-cell' : '';
            const fixedCellClassName = cell.fixed ? ' fixed-cell' : '';
            const cellClassName = `sudoku-cell${selectedCellClassName}${fixedCellClassName}`;
            const cellIndex = rowIdx * 9 + colIdx;

            const iconSrc = !isEmpty ? numberIcons[value] : undefined;
            return (
              <div
                className={cellClassName}
                key={colIdx}
                onClick={
                  !cell.fixed && onCellClick
                    ? () => onCellClick(cellIndex)
                    : undefined
                }
                style={!cell.fixed && onCellClick ? { cursor: 'pointer' } : undefined}
                tabIndex={!cell.fixed && onCellClick ? 0 : -1}
                role={!cell.fixed && onCellClick ? 'button' : undefined}
                aria-label={!cell.fixed ? `Editable cell at ${rowIdx + 1}, ${colIdx + 1}` : undefined}
              >
                {iconSrc && (
                  <img
                    src={iconSrc}
                    alt={String(value)}
                    className="sudoku-cell-number"
                    draggable={false}
                  />
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export interface SudokuCell {
  value: string | number;
  fixed: boolean;
}

export default Sudoku;