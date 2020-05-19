export const reduceObjectValue = (prop, obj) => prop.split('.').reduce(
  (o, x) => (o[x] ? o[x] : {}), obj
);

export const applyNestedValue = (fieldPath = '', value) => {
  const reducer = (acc, item, index, arr) => ({ [item]: index + 1 < arr.length ? acc : value });
  return fieldPath.split('.').reduceRight(reducer, {});
};
