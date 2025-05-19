import readline from 'readline';
import { Game } from '../models/Game.js';
import { ConsoleView } from '../views/ConsoleView.js';
import { parsePosition, isValidInput } from '../utils/helpers.js';
import { isCheckmate, isCheck, hasLegalMoves } from '../utils/chessRules.js';


export class GameController {
  constructor() {
    this.game = new Game();
    this.view = new ConsoleView();
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  start() {
    this.view.printBoard(this.game.board);
    this.rl.question(`\n Giliran ${this.game.currentPlayer} → Masukkan langkah : `, (input) => {
      this.handleMove(input);
    });
  }

  handleMove(input) {
    const [from, to] = input.trim().split(' ');

    if (!isValidInput(from, to)) {
      this.view.showError('Format salah.');
      return this.start();
    }

    const fromCoord = parsePosition(from);
    const toCoord = parsePosition(to);

    const current = this.game.currentPlayer;

    const result = this.game.movePiece(fromCoord, toCoord);
    if (result.error) {
      this.view.showError(result.error);
      return this.start();
    }

    if (result.capture) {
      this.view.showCapture(result.piece, result.capture);
    }

    this.view.printBoard(this.game.board);

    // Cek kondisi lawan setelah giliran berganti
    const opponent = current === 'white' ? 'black' : 'white';
    const gameEnded = this.checkGameState(opponent);

    if (!gameEnded) {
      this.start();
    }
  }

  checkGameState(player) {
    const board = this.game.board;

    if (isCheckmate(player, board)) {
      const winner = player === 'white' ? 'black' : 'white';
      this.view.showCheckmate(winner);
      this.rl.close();
      return true;
    }

    if (isCheck(player, board)) {
      this.view.showCheck(player);
      return false;
    }

    if (!hasLegalMoves(player, board)) {
      this.view.showDraw(player);
      this.rl.close();
      return true;
    }

    return false;
  }

}
