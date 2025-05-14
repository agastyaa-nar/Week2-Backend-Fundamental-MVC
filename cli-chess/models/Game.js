import Board from './Board.js';

export default class Game {
  constructor() {
    this.board = new Board();
    this.currentPlayer = 'white';
  }

  movePiece(from, to) {
    const piece = this.board.getPiece(from);
    const target = this.board.getPiece(to);

    if (!piece) return { error: 'Tidak ada bidak di posisi itu.' };
    if (piece.color !== this.currentPlayer) {
      return { error: `Ini giliran ${this.currentPlayer}.` };
    }
    if (!piece.canMove(from, to, this.board.grid)) {
      return { error: `Langkah tidak valid untuk ${piece.symbol}` };
    }

    this.board.setPiece(to, piece);
    this.board.setPiece(from, null);

    const result = {
      piece,
      capture: target || null
    };

    this.currentPlayer = this.currentPlayer === 'white' ? 'black' : 'white';
    return result;
  }
}
