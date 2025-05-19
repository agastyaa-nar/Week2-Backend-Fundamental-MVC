import readline from 'readline';
import { Game } from '../models/Game.js';
import { ConsoleView } from '../views/ConsoleView.js';
import { parsePosition, isValidInput } from '../utils/helpers.js';
import { isCheck, hasLegalMoves } from '../utils/chessRules.js';


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

    const result = this.game.movePiece(fromCoord, toCoord);
    if (result.error) {
      this.view.showError(result.error);
      return this.start(); // tambahkan return di sini agar tidak lanjut evaluasi
    }

    if (result.capture) {
      this.view.showCapture(result.piece, result.capture);
    }

    this.view.printBoard(this.game.board); // tampilkan papan setelah langkah

    const gameEnded = this.checkGameState();
    if (!gameEnded) {
      this.start(); // hanya lanjut jika permainan belum selesai
    }
  }

  checkGameState() {
    const current = this.game.currentPlayer;
    const board = this.game.board;

    if (isCheck(current, board)) {
      if (!hasLegalMoves(current, board)) {
        this.view.showCheckmate(current === 'white' ? 'black' : 'white');
        this.rl.close();
        return true;
      } else {
        this.view.showCheck(current);
      }
    } else if (!hasLegalMoves(current, board)) {
      this.view.showDraw(current);
      this.rl.close();
      return true;
    }

    return false;
  }

}
