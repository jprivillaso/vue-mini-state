import Vue from 'vue';

import {
  applyNestedValue,
  reduceObjectValue
} from './utils/reducers';

import {
  deepMerge
} from './utils/merge';

let state = Vue.observable({
  form: {}
});

const getStateProp = (prop) => {
  const propValue = reduceObjectValue(prop, state);
  if (typeof propValue === 'object' && Object.keys(propValue).length === 0) return null;
  return propValue;
};

const getState = (prop) => {
  if (prop) {
    return getStateProp(prop);
  }

  return state;
};

const setStateProp = (value, prop) => {
  const newState = Object.assign({},
    deepMerge(
      Object.assign({}, state.form),
      applyNestedValue(prop, value)
    )
  );

  return newState || {};
};

const setState = (value, prop = null) => {
  if (prop) {
    return setStateProp(value, prop);
  }

  state.form = Object.assign({}, value);
};

const resetState = (newState = {}) => {
  state = new Vue.observable(newState);
};

export {
  getState,
  setState,
  resetState
};
