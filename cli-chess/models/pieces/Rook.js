import { Piece } from './Piece.js';

export class Rook extends Piece {
  constructor(color) {
    super(color, color === 'white' ? '♖' : '♜');
    this.type = 'Rook';
  }

  canMove(from, to, board) {
    const [fromRow, fromCol] = from;
    const [toRow, toCol] = to;

    if (fromRow !== toRow && fromCol !== toCol) return false;

    const stepRow = toRow === fromRow ? 0 : (toRow > fromRow ? 1 : -1);
    const stepCol = toCol === fromCol ? 0 : (toCol > fromCol ? 1 : -1);

    let row = fromRow + stepRow;
    let col = fromCol + stepCol;

    while (row !== toRow || col !== toCol) {
      if (board[row][col]) return false;
      row += stepRow;
      col += stepCol;
    }

    const target = board[toRow][toCol];
    return !target || this.isEnemy(target);
  }

  isEnemy(piece) {
    return piece && piece.color !== this.color;
  }
}
