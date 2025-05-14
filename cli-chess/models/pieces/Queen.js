import Piece from './Piece.js';

export default class Queen extends Piece {
  constructor(color) {
    super(color, color === 'white' ? '♕' : '♛');
  }

  canMove(from, to, board) {
    const [fromRow, fromCol] = from;
    const [toRow, toCol] = to;

    const rowDiff = toRow - fromRow;
    const colDiff = toCol - fromCol;

    const stepRow = Math.sign(rowDiff);
    const stepCol = Math.sign(colDiff);

    const absRow = Math.abs(rowDiff);
    const absCol = Math.abs(colDiff);

    const isStraight = (rowDiff === 0 || colDiff === 0);
    const isDiagonal = (absRow === absCol);

    if (!isStraight && !isDiagonal) return false;

    let row = fromRow + stepRow;
    let col = fromCol + stepCol;

    while (row !== toRow || col !== toCol) {
      if (board[row][col]) return false; // Terhalang
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
