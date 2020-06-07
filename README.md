# vue-mini-state 🔮

vue-mini-state is a simple state management lib for Vuejs. It uses the Observable object.
It's intended to be very simplistic and easy to use. What's the best of it ? It's centralized! Thus, you can use it at different components without worrying about drilling down any prop.

vue-mini-state uses object manipulations in order to merge multiple paths inside the state.

## Motivation

State Management is something that always lead you to use a complex third-party library or is either something complex to build from scratch. vue-mini-state is intended to be used still as a third party library but it is extremely small and it uses Vue js native Observable, which in my opinion is very good and should be used more broadly.

I needed to find a way to create a state management that could be used easily inside the directive `v-for` and inside the HTML templates. As a result, I created this lightweight lib that might be useful for you as it's being useful for me in my Vue projects.

## API

- *getState()*
Returns the entire state.

- *getState(path)*
Returns the value of the path inside the state.

- *setState(data)*
Makes the **data** object to be the entire state. It will be set at the root.

- *setState(data, path)*
Updates the state at the specified path.

- *resetState()*
Resets the entire state to its initial value.

## Getting Started

```bash
$ npm install vue-mini-state
```

## How does it work

vue-mini-state relies on strings that represent the paths that will be used inside the state.
For example: The path *customer.street.number* represents the path to an object that looks like this:

```js
const state = {
  "customer": {
    "street": {
      "number": 5 // any value here
    }
  }
}
```

You can either select if you want to save the change to the root or if you want to nest it under a specific property

```ts
import { getState, setState } from 'vue-mini-state';

setState(16, 'customer.street.number');
setState({ name: 'Juan' }, 'customer');
getState('customer.street.number') // This will return 16;

/**
 * This will return
 *
 * {
 *   customer: {
 *     name: 'Juan',
 *     street: {
 *       number: 16
 *     }
 *   }
 * }
 */
getState();
```

**IMPORTANT**

As you can see, vue-mini-state works very well for scenarios in which you are going to populate multiple attributes from an object from different places. Moreover, it works assuming that you need the objects to be merged, not replaced.

## Get Rid of the v-model

This sound a bit scary at the beggining, but the truth is that you can get rid of the v-model in your top level components and create easily a new Form with only path declarations. I will create a guide that explains to you how to use the vue-mini-state with a Web Components' library and allow you to create forms in a very fast way. Wait for it! :)

## Contribute

See [the contribution guide](./CONTRIBUTE.md)
