# vue-mini-state 🔮

vue-mini-state is a simple state management lib for Vuejs. It uses the Observable object.
It's intended to be very simplistic and easy to use. What's the best of it ? It's centralized! Thus, you can use it at different components without worrying about drilling down any prop.

## Motivation

Two of the hardest things to achieve in a frontend project are:

- State Management
- Form Validation

I needed to find a way to create an easy validation mechanism that could be integrated with a state management. It was a requirement that I needed to implement from scratch for my company. Thus, I ended up creating this state management lib, that can also be integrated with a validation mechanism.

## API

- getState
- setState
- resetState

## Getting Started

```bash
$ npm install vue-mini-state
```

## How does it work

vue-mini-state relies on strings that represent the paths that will be used inside the state.
For example: The path 'customer.street.number' represents the path to an object that looks like this:

```json
state = {
  customer: {
    street: {
      number: // any value here
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
 *   name: 'Juan',
 *   street: {
 *     number: 16
 *   }
 * }
 */
getState('customer');
```

## Contribute

See [the contribution guide](./CONTRIBUTE.md)
