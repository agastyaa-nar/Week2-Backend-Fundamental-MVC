const allPieces = {
  p: '♙', r: '♖', n: '♘', b: '♗', q: '♕', k: '♔',
  P: '♟', R: '♜', N: '♞', B: '♝', Q: '♛', K: '♚',
};

export function board(input) {
  let output = '\n  a b c d e f g h\n';
  for (let i = 8; i >= 1; i--) {
    output += i + ' ';
    for (let j = 0; j < 8; j++) {
      const piece = input[8 - i][j];
      let symbol = '.';

      if (piece) {
        let key;
        if (piece.color === 'w') {
          key = piece.type.toUpperCase(); // White piece
        } else {
          key = piece.type.toLowerCase(); // Black piece
        }
        symbol = allPieces[key] || '?';
      }
      output += symbol + ' ';
    }
    output += i + '\n';
  }
  output += '  a b c d e f g h\n';
  return output;
}

