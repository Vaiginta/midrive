'use strict';

import { combineReducers } from 'redux-immutablejs';

import app from './app.js';

const rootReducer = combineReducers({
  app
});

export default rootReducer;
