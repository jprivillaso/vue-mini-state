import Vue from 'vue';

import {
  deepMerge,
  applyNestedValue,
  reduceObjectValue
} from './transformers';

let observable: any = Vue.observable({
  state: {}
});

const setStateProp = (
  prop: string,
  data: any
): void => {
  observable.state = (<any>Object).assign({},
    deepMerge(
      observable.state,
      applyNestedValue(prop, data)
    )
  );
};

export const setState = (
  data: any,
  prop?: string
): void => {
  if (prop) {
    setStateProp(prop, data)
  } else {
    observable.state = (<any>Object).assign({}, data);
  }
};

const getStateProp = (
  prop?: string
): any => {
  if (!prop) return null;

  const propValue = reduceObjectValue(prop, observable.state);
  if (typeof propValue === 'object' && Object.keys(propValue).length === 0) return null;
  return reduceObjectValue(prop, observable.state);
};

export const getState = (
  prop?: string
): any => {
  if (prop) return getStateProp(prop);
  return observable.state;
};

export const resetState = () => {
  observable = Vue.observable({
    state: {}
  });
};
