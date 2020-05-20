import Vue from 'vue';
import { deepMerge } from './merge';
import { applyNestedValue, reduceObjectValue } from './reducers';

const observable: any = Vue.observable({
  state: {}
});

export const setFormData = (formData: any) => {
  observable.state = Object.assign({}, formData);
};

export const setFormDataProp = (prop: string, data: any) => {
  observable.state = Object.assign({},
    deepMerge(
      observable.state,
      applyNestedValue(prop, data)
    )
  );
}

export const getFormData = () => {
  return observable.state;
}

export const getFormDataProp = (prop: string) => {
  if (!prop) return null;

  const propValue = reduceObjectValue(prop, observable.state);
  if (typeof propValue === 'object' && Object.keys(propValue).length === 0) return null;
  return reduceObjectValue(prop, observable.state);
}