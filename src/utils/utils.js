export const getCell = (arr, x, y) => {
  try {
    return arr[y][x];
  } catch (e) {}
};
