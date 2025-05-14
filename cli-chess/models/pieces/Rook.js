import Piece from './Piece.js';

export default class Rook extends Piece {
  constructor(color) {
    super(color, color === 'white' ? '♖' : '♜');
  }

  canMove(from, to, board) {
    const [fromRow, fromCol] = from;
    const [toRow, toCol] = to;

    if (fromRow !== toRow && fromCol !== toCol) return false;

    const stepRow = fromRow === toRow ? 0 : (toRow > fromRow ? 1 : -1);
    const stepCol = fromCol === toCol ? 0 : (toCol > fromCol ? 1 : -1);

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
