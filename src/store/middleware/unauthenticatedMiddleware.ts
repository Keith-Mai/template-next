import { isRejectedWithValue } from '@reduxjs/toolkit';
import type { Middleware } from 'redux';
import { resetStateAction } from '../actions/resetState';

export const unauthenticatedMiddleware: Middleware =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (isRejectedWithValue(action) && action.payload) {
      if (action.payload.status === 401) {
        dispatch(resetStateAction());
      } else {
        console.log('ERROR:', action.payload);
      }
    }

    return next(action);
  };
