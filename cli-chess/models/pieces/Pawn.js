import { Piece } from './Piece.js'

export class Pawn extends Piece {
  constructor(color) {
    super(color, color === 'white' ? '♙' : '♟');
    this.type = 'Pawn';
  }

  canMove(from, to, board) {
    const [fromRow, fromCol] = from;
    const [toRow, toCol] = to;

    const direction = this.color === 'white' ? -1 : 1;
    const startRow = this.color === 'white' ? 6 : 1;
    const diffRow = toRow - fromRow;
    const diffCol = toCol - fromCol;

    // Maju 1 langkah
    if (diffCol === 0 && diffRow === direction && !board[toRow][toCol]) {
      return true;
    }

    // Maju 2 langkah dari baris awal
    if (
      fromRow === startRow &&
      diffCol === 0 &&
      diffRow === 2 * direction &&
      !board[fromRow + direction][fromCol] &&
      !board[toRow][toCol]
    ) {
      return true;
    }

    // Menyerang diagonal
    const target = board[toRow][toCol];
    if (
      Math.abs(diffCol) === 1 &&
      diffRow === direction &&
      target &&
      this.isEnemy(target)
    ) {
      return true;
    }

    return false;
  }

  isEnemy(piece) {
    return piece && piece.color !== this.color;
  }
}

