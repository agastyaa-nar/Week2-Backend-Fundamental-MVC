import Piece from './Piece.js';

export default class King extends Piece {
  constructor(color) {
    super(color, color === 'white' ? '♔' : '♚');
  }

  canMove(from, to, board) {
    const [fromRow, fromCol] = from;
    const [toRow, toCol] = to;

    const rowDiff = Math.abs(toRow - fromRow);
    const colDiff = Math.abs(toCol - fromCol);

    const isOneStep = rowDiff <= 1 && colDiff <= 1;
    if (!isOneStep) return false;

    const target = board[toRow][toCol];
    return !target || this.isEnemy(target);
  }

  isEnemy(piece) {
    return piece && piece.color !== this.color;
  }
}
