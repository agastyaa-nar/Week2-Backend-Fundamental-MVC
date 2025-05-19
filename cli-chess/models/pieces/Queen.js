import { Piece } from './Piece.js';

export class Queen extends Piece {
  constructor(color) {
    super(color, color === 'white' ? '♕' : '♛');
  }

  async canMove(from, to, board) {
    const bishop = new (await import('./Bishop.js')).Bishop(this.color);
    const rook = new (await import('./Rook.js')).Rook(this.color);
    return bishop.canMove(from, to, board) || rook.canMove(from, to, board);
  }

  isEnemy(piece) {
    return piece && piece.color !== this.color;
  }
}
