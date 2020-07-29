import * as TYPES from './types';

export const updateConfig = config => {
  return {
    type: TYPES.UPDATE_CONFIG,
    payload: config
  };
};

export const updateMinesweeper = minesweeper => {
  return {
    type: TYPES.UPDATE_MINESWEEPER,
    payload: minesweeper
  };
};
