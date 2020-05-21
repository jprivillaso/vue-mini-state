import Vue from 'vue';
import { deepMerge } from './merge';
import { applyNestedValue, reduceObjectValue } from './reducers';

const observable: any = Vue.observable({
  state: {}
});

const setStateProp = (prop: string, data: any) => {
  observable.state = Object.assign({},
    deepMerge(
      observable.state,
      applyNestedValue(prop, data)
    )
  );
}

export const setState = (data: any, prop?: string) => {
  if (prop) {
    setStateProp(prop, data)
  } else {
    observable.state = Object.assign({}, data);
  }
};

const getStateProp = (prop?: string) => {
  if (!prop) return null;

  const propValue = reduceObjectValue(prop, observable.state);
  if (typeof propValue === 'object' && Object.keys(propValue).length === 0) return null;
  return reduceObjectValue(prop, observable.state);
}

export const getState = (prop: string) => {
  if (prop) return getStateProp(prop);
  return observable.state;
}
