import Pawn from './pieces/Pawn.js';

export default class Board {
  constructor() {
    this.grid = Array.from({ length: 8 }, () => Array(8).fill(null));
    this.initialize();
  }

  initialize() {
    for (let col = 0; col < 8; col++) {
      this.grid[1][col] = new Pawn('black');
      this.grid[6][col] = new Pawn('white');
    }
  }

  getPiece([row, col]) {
    return this.grid[row][col];
  }

  setPiece([row, col], piece) {
    this.grid[row][col] = piece;
  }
}
