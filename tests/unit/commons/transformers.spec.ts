import {
  reduceObjectValue,
  applyNestedValue,
  deepMerge
} from '../../../src/transformers';

import {
  setState,
  getState,
  resetState
} from '../../../src';

const formData = {
  a: {
    b: {
      c: 5
    }
  }
};

const formDataWithArray = {
  a: {
    b: {
      c: [5]
    }
  }
};

describe('Data transformers used during validation', () => {
  it('Test flat structure should return all valid objects', () => {
    const objectDefinition = 'a.b.c';
    const result = 5;

    expect(reduceObjectValue(objectDefinition, formData)).toBe(result);
  });

  it('Return object that is inside an array', () => {
    const objectDefinition = 'a.b.c[0]';
    const result = 5;

    expect(reduceObjectValue(objectDefinition, formDataWithArray)).toBe(result);
  });

  it('Set plain item at nested property', () => {
    const expected = {
      a: {
        b: {
          c: [undefined, undefined, undefined, undefined, 5]
        }
      }
    };

    expect(applyNestedValue('a.b.c[4]', 5)).toEqual(expected);
  });

  it('Set item at nested property, using objects', () => {
    const expected = {
      a: {
        b: {
          c: [{
            d: 5
          }]
        }
      }
    };

    expect(applyNestedValue('a.b.c[0].d', 5)).toEqual(expected);
  });

  it('Set item at nested property, using objects at random position', () => {
    const expected = {
      a: {
        b: {
          c: [undefined, undefined, undefined, {
            d: 190
          }]
        }
      }
    };

    expect(applyNestedValue('a.b.c[3].d', 190)).toEqual(expected);
  });

  it('Set item at nested property, with deep merge', () => {
    const original = {
      a: {
        b: {
          c: [1, 2, 3]
        }
      }
    };

    const expected = {
      a: {
        b: {
          c: [1, 2, 3, 5]
        }
      }
    };

    const result = applyNestedValue('a.b.c[3]', 5);

    expect(deepMerge(original, result)).toEqual(expected);
  });

  it('Set item at nested property, with deep merge at random position', () => {
    const original = {
      a: {
        b: {
          c: [1, 2, 3]
        }
      }
    };

    const expected = {
      a: {
        b: {
          c: [1, 2, 3, undefined, 5]
        }
      }
    };

    const result = applyNestedValue('a.b.c[4]', 5);

    expect(deepMerge(original, result)).toEqual(expected);
  });

  it('It should return an empty object when the path you want to reduce does not exist', () => {
    const original = {
      a: {
      }
    };
    const expected = {};

    expect(reduceObjectValue('a.b.c', original)).toEqual(expected);
  });

  it('It should set the value of an item whose structure does not exist', () => {
    setState(1290, 'page2.costsRoom[0].meter_id');
    expect(getState('page2.costsRoom[0].meter_id')).toEqual(1290);
  });

  it('It must merge two items that are inside an array at the same position', () => {
    resetState();

    setState({
      page2: {
        costsRoom: [
          {
            meter_id: 12
          }
        ]
      }
    });

    setState(20, 'page2.costsRoom[0].meter_id');
    setState(1000, 'page2.costsRoom[0].meter_reading');

    const expected = {
      page2: {
        costsRoom: [
          {
            meter_id: 20,
            meter_reading: 1000
          }
        ]
      }
    };

    expect(getState()).toEqual(expected);
  });
});
