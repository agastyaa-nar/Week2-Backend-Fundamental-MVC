export function parsePosition(pos) {
  const files = 'abcdefgh';
  const col = files.indexOf(pos[0]);
  const row = 8 - parseInt(pos[1]);
  return [row, col];
}

export function isValidInput(from, to) {
  const allValid = (pos) => {
    const files = 'abcdefgh';
    const ranks = '12345678';
    return files.includes(pos[0]) && ranks.includes(pos[1]);
  };
  return allValid(from) && allValid(to);
}
