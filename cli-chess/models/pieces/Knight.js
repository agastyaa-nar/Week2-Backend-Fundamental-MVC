import Piece from './Piece.js';

export default class Knight extends Piece {
  constructor(color) {
    super(color, color === 'white' ? '♘' : '♞');
  }

  canMove(from, to, board) {
    const [fromRow, fromCol] = from;
    const [toRow, toCol] = to;

    const rowDiff = Math.abs(fromRow - toRow);
    const colDiff = Math.abs(fromCol - toCol);

    const isLShape =
      (rowDiff === 2 && colDiff === 1) ||
      (rowDiff === 1 && colDiff === 2);

    if (!isLShape) return false;

    const target = board[toRow][toCol];
    return !target || this.isEnemy(target);
  }

  isEnemy(piece) {
    return piece && piece.color !== this.color;
  }
}
