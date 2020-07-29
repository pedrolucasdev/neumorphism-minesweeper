import * as TYPES from '../actions/types';

const INITIAL_STATE = {
  theme: 'light',
  timePassed: 0
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TYPES.UPDATE_CONFIG:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
