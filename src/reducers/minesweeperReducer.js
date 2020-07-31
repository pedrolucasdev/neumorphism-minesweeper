import * as TYPES from '../actions/types';
import { getCell } from '../utils/utils';

const INITIAL_STATE = () => {
  return {
    board: generateBoard(),
    won: false,
    lost: false,
  };
};

function generateBoard() {
  const NUMBER_OF_COLUMNS = 6;
  const NUMBER_OF_ROWS = 9;

  const board = [];
  for (var i = 0; i < NUMBER_OF_ROWS; i++) {
    board[i] = [];
    for (var j = 0; j < NUMBER_OF_COLUMNS; j++) {
      board[i][j] = generateCell();
    }
  }

  board.forEach((row, y) => {
    row.forEach((field, x) => {
      if (field.isBomb) return;
      let count = countBombsAround(board, x, y);
      row[x].bombsAround = count;
    });
  });

  return board;
}

function generateCell() {
  const BOMB_CHANCE = 0.2;
  return {
    isFlagged: false,
    isRevealed: false,
    bombsAround: 0,
    isBomb: Math.random() > 1 - BOMB_CHANCE,
  };
}

function countBombsAround(board, x, y) {
  let count = 0;
  for (let i = y - 1; i <= y + 1; i++) {
    for (let j = x - 1; j <= x + 1; j++) {
      const field = getCell(board, j, i);
      if (field && field.isBomb) count++;
    }
  }
  return count;
}

export default (state = INITIAL_STATE(), action) => {
  console.log(action);
  switch (action.type) {
    case TYPES.UPDATE_MINESWEEPER:
      return { ...state, ...action.payload };
    case TYPES.RESET_MINESWEEPER:
      console.log('XPTO');
      return INITIAL_STATE();
    default:
      return state;
  }
};
