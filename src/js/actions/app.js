import {
  TOGGLE
 } from '../action_types.js';

export const toggle = (path) => {
  
    return {
      type: TOGGLE,
      path
   };
 };
