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
const mergeArrays = (source: any[], target: any[]) => {
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


export const deepMerge = (target: any, source: any) => {
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
