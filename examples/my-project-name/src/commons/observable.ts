import Vue from 'vue';
import { deepMerge } from './merge';

export const state = Vue.observable({
  formData: {}
});

const applyNestedValue = (fieldPath = '', value: any) => {
  const reducer = (acc: any, item: any, index: any, arr: any) => ({ [item]: index + 1 < arr.length ? acc : value });
  return fieldPath.split('.').reduceRight(reducer, {});
};

const reduceObjectValue = (prop: string, obj: any) => prop.split('.').reduce(
  (o, x) => (o[x] ? o[x] : {}), obj
);

export const mutations = {
  setFormData(formData: any) {
    state.formData = Object.assign({}, formData);
  },
  setFormDataProp(prop: string, data: any) {
    state.formData = Object.assign({},
      deepMerge(
        state.formData,
        applyNestedValue(prop, data)
      ));
  },
  resetFormData() {
    state.formData = Object.assign({});
  }
};

export const getters = {
  getFormData: () => state.formData,
  getFormDataProp(prop: string) {
    if (!prop) return null;

    const propValue = reduceObjectValue(prop, state.formData);
    if (typeof propValue === 'object' && Object.keys(propValue).length === 0) return null;
    return reduceObjectValue(prop, state.formData);
  }
};