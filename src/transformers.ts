export const reduceObjectValue = (
  prop: string,
  obj: any
): any => prop.split('.').reduce(
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

export const applyNestedValue = (
  fieldPath = '',
  value: any
): any => {
  const reducer = (
    acc: any,
    item: any,
    index: number,
    arr: any[]
  ) => {
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

/**
 * @param source array of items
 * @param target array of items
 *
 * Target elements have preference over source elements.
 * If there is a position with values on position i,
 * the target value will be used.
 *
 * If there are undefined values, those with values will be preserved
 */
const mergeArrays = (
  source: any[],
  target: any[]
): any[] => {
  const max = Math.max(source.length, target.length);
  const mergedArray: any[] = [];

  for (let i = 0; i < max; i++) {
    if (!source[i]) {
      mergedArray[i] = target[i];
    } else if (!target[i]) {
      mergedArray[i] = source[i];
    } else {
      // eslint-disable-next-line
      mergedArray[i] = deepMerge(target[i], source[i]);
    }
  }

  return mergedArray;
};

export const deepMerge = (
  target: any,
  source: any
): any => {
  if (typeof target === 'object' && typeof source === 'object') {
    for (const key in source) {
      if (source[key] === null && (target[key] === undefined || target[key] === null)) {
        target[key] = null;
      } else if (source[key] instanceof Array) {
        if (!target[key]) target[key] = [];
        target[key] = mergeArrays(source[key], target[key]);
      } else if (typeof source[key] === 'object') {
        if (!target[key]) target[key] = {};
        deepMerge(target[key], source[key]);
      } else {
        target[key] = source[key];
      }
    }
  }
  return target;
};
