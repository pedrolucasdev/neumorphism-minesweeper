import * as TYPES from './types';

//Mainly used to update the application theme
export const updateConfig = (config) => {
  return {
    type: TYPES.UPDATE_CONFIG,
    payload: config,
  };
};

//Update the minesweeper board
export const updateMinesweeper = (minesweeper) => {
  return {
    type: TYPES.UPDATE_MINESWEEPER,
    payload: minesweeper,
  };
};

//Clean up and reset minesweeper board
export const resetMinesweeper = () => {
  return {
    type: TYPES.RESET_MINESWEEPER,
  };
};
