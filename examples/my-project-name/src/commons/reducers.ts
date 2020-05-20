export const applyNestedValue = (fieldPath = '', value: any) => {
  const reducer = (
    acc: any,
    item: any,
    index: any,
    arr: any
  ) => (
    { [item]: index + 1 < arr.length ? acc : value }
  );

  return fieldPath.split('.').reduceRight(reducer, {});
};

export const reduceObjectValue = (
  prop: string,
  obj: any
) => prop.split('.').reduce(
  (o, x) => (o[x] ? o[x] : {}), obj
);