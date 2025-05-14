import readline from 'readline';
import Game from '../models/Game.js';
import ConsoleView from '../views/ConsoleView.js';
import { parsePosition, isValidInput } from '../utils/helpers.js';


export default class GameController {
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
    this.rl.question(`Giliran ${this.game.currentPlayer.toUpperCase()} → Masukkan langkah : `, (input) => {
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

    const result = this.game.movePiece(fromCoord, toCoord);
    if (result.error) {
      this.view.showError(result.error);
    } else if (result.capture) {
      this.view.showCapture(result.piece, result.capture);
    }

    this.start();
  }
}
