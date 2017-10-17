'use strict';

import { compose, createStore, applyMiddleware }  from 'redux';
import thunk                                      from 'redux-thunk';
import reducer                     from './reducers';

export default state => {
  const store   = compose(applyMiddleware(...[thunk]))
    (createStore)
    (reducer, state)
  ;

  return { store };
};
