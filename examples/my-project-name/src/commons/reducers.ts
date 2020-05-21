export const reduceObjectValue = (prop: string, obj: any) => prop.split('.').reduce(
  (o, x) => {
    if (/\[[^\]]*\]/.test(x)) {
      const [key] = x.split('[');
      const openBracket = x.indexOf('[');
      const closeBracket = x.indexOf(']');

      const arrayIndex: number = parseInt(
        (x as string).substring(openBracket + 1, closeBracket),
        10
      );

      return o[key] ? o[key][arrayIndex] : [];
    }

    return o && o[x] ? o[x] : {};
  }, obj
);

export const applyNestedValue = (fieldPath = '', value: any) => {
  const reducer = (acc: any, item: any, index: number, arr: any[]) => {
    if (/\[[^\]]*\]/.test(item)) {
      const [key] = item.split('[');

      const openBracket = item.indexOf('[');
      const closeBracket = item.indexOf(']');

      const arrayIndex: number = parseInt(
        (item as string).substring(openBracket + 1, closeBracket),
        10
      );

      const list = new Array(arrayIndex + 1);
      list[arrayIndex] = index + 1 < arr.length ? acc : value;

      return { [key]: list };
    }

    return { [item]: index + 1 < arr.length ? acc : value };
  };

  return fieldPath.split('.').reduceRight(reducer, {});
};

