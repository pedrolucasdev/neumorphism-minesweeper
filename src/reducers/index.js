import { combineReducers } from 'redux';
import configReducer from './configReducer';
import minesweeperReducer from './minesweeperReducer';

export default combineReducers({
  config: configReducer,
  minesweeper: minesweeperReducer
});
