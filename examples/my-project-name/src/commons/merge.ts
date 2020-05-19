export const deepMerge = (target: any, source: any) => {
  if (typeof target === 'object' && typeof source === 'object') {
    for (const key in source) {
      if (source[key] === null && (target[key] === undefined || target[key] === null)) {
        target[key] = null;
      } else if (source[key] instanceof Array) {
        if (!target[key]) target[key] = [];
        // concatenate arrays
        target[key] = target[key].concat(source[key]);
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
