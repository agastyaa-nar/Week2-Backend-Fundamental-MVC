import readline from 'readline'
import { game } from './chessModel.js'
import { board } from './board.js'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export function askMove() {
  console.clear();
  console.log(board(game.board()));
  console.log(`Giliran ${game.turn() === 'w' ? 'Putih ' : 'Hitam '}`);

  rl.question('Masukkan langkah : ', (input) => {
    const [from, to] = input.trim().toLowerCase().split(' ');
    const move = game.move({ from, to });

    if (!move) {
      console.log('Langkah tidak valid!');
    }

    if (game.isCheckmate()) {
      console.log(board(game.board()));
      console.log(`Skakmat! ${game.turn() === 'w' ? 'Hitam' : 'Putih'} menang!`);
      rl.close();
    } else if (game.isDraw()) {
      console.log(board(game.board()));
      console.log('Permainan seri!');
      rl.close();
    } else {
      askMove();
    }
  });
}

