import numberIcons from './Numbers.js';
import { styles, getCellStyle } from './Sudoku.styles.js';

interface SudokuProps {
  board: SudokuCell[];
  selectedCell?: number | undefined; // Index of the selected cell (0-80)
  onCellClick?: (cellIndex: number) => void;
}

function Sudoku({ board, selectedCell, onCellClick }: SudokuProps) {
  const rows = Array.from({ length: 9 }, (_, row) =>
    board.slice(row * 9, row * 9 + 9)
  );

  const selectedRow = selectedCell !== undefined ? Math.floor(selectedCell / 9) : -1;
  const selectedCol = selectedCell !== undefined ? selectedCell % 9 : -1;

  return (
    <div style={styles.grid}>
      {rows.map((rowArr, rowIdx) => (
        <div style={styles.row} key={rowIdx}>
          {rowArr.map((cell, colIdx) => {
            const value = cell.value === 0 || cell.value === '0' ? '' : cell.value;
            const isEmpty = value === '';
            const isSelected = rowIdx === selectedRow && colIdx === selectedCol;
            const isClickable = !cell.fixed && !!onCellClick;
            const cellIndex = rowIdx * 9 + colIdx;

            const iconSrc = !isEmpty ? numberIcons[value] : undefined;
            const annotations = cell.annotations || [];

            const handleClick = isClickable ? () => onCellClick(cellIndex) : undefined;

            return (
              <div
                key={colIdx}
                style={getCellStyle(isSelected, cell.fixed, isClickable, rowIdx, colIdx)}
                onClick={handleClick}
                tabIndex={isClickable ? 0 : -1}
                role={isClickable ? 'button' : undefined}
                aria-label={!cell.fixed ? `Editable cell at ${rowIdx + 1}, ${colIdx + 1}` : undefined}
              >
                {iconSrc && (
                  <img
                    src={iconSrc}
                    alt={String(value)}
                    style={styles.cellNumber}
                    draggable={false}
                  />
                )}
                {!iconSrc && annotations.length > 0 && (
                  <div style={styles.annotationGrid} aria-hidden="true">
                    {Array.from({ length: 9 }, (_, k) => {
                      const noteNum = k + 1;
                      const active = annotations.includes(noteNum);
                      const svgSrc = numberIcons[noteNum];
                      return (
                        <div
                          key={noteNum}
                          style={{
                            ...styles.annotationCell,
                            ...(active ? styles.annotationCellActive : {}),
                          }}
                        >
                          {active && (
                            <img
                              src={svgSrc}
                              alt=""
                              draggable={false}
                              style={styles.annotationIcon}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export interface SudokuCell {
  value: string | number;
  fixed: boolean;
  annotations?: number[];
}

export default Sudoku;