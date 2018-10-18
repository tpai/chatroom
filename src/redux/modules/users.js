import { createAction, handleActions } from 'redux-actions';

export const SET_DATA = `users/SET_DATA`;

export const setData = createAction(SET_DATA, (value) => value);

export const defaultState = {
  data: null,
};

export const reducer = handleActions(
  {
    [SET_DATA]: (state, { payload }) => ({
      ...state,
      data: payload,
    }),
  },
  defaultState,
);
