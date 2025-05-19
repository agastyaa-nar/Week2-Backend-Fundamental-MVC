import { pathIsClear } from "../utils/helpers.js";

export function findKingPosition(color, board) {
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board.grid[row][col];
      if (piece && piece.type === 'King' && piece.color === color){
        return [row, col];
      }
    }
  }
  return null; // Jika raja tidak ditemukan
}

export function isCheckmate(color, board) {
  // Jika raja sedang skak dan tidak ada langkah legal, maka skakmat
  return isCheck(color, board) && !hasLegalMoves(color, board);
}


// Mengecek apakah raja warna tertentu sedang skak
export function isCheck(color, board) {
  const kingPos = findKingPosition(color, board);
  if (!kingPos) return false;

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board.grid[row][col];
      if (piece && piece.color !== color) {
        const from = [row, col];
        const to = kingPos;
        if (piece.canMove(from, to, board.grid)) {
          // Tambahan validasi: cek kalau jalurnya tidak terhalang (kecuali Knight)
          if (piece.constructor.name === 'Knight' || pathIsClear(from, to, board.grid)) {
            return true;
          }
        }
      }
    }
  }
  return false;
}


// Mengecek apakah pemain masih memiliki langkah sah
export function hasLegalMoves(color, board) {
  for (let fromRow = 0; fromRow < 8; fromRow++) {
    for (let fromCol = 0; fromCol < 8; fromCol++) {
      const piece = board.grid[fromRow][fromCol];
      if (piece && piece.color === color) {
        for (let toRow = 0; toRow < 8; toRow++) {
          for (let toCol = 0; toCol < 8; toCol++) {
            if ((fromRow !== toRow || fromCol !== toCol) && piece.canMove([fromRow, fromCol], [toRow, toCol], board.grid)) {
              // Simulasikan langkah tersebut
              const temp = board.grid[toRow][toCol];
              board.grid[toRow][toCol] = piece;
              board.grid[fromRow][fromCol] = null;

              const stillInCheck = isCheck(color, board);

              // Kembalikan posisi seperti semula
              board.grid[fromRow][fromCol] = piece;
              board.grid[toRow][toCol] = temp;

              if (!stillInCheck) return true;
            }
          }
        }
      }
    }
  }
  return false;
}