import React from 'react';
import './sudoku.css';

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
                {value}
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