# Omni State 🔮

Omni state is a simple state management lib for Vuejs. It uses the Observable object.
It's intended to be very simplistic and easy to use. What's the best of it ? It's centralized! Thus, you can use it at different components without worrying about drilling down any prop.

## Motivation

Two of the hardest things to achieve in a frontend project are:

- State Management
- Form Validation

I needed to find a way to create an easy validation mechanism that could be integrated with a state management. It was a requirement that I needed to implement this for my company. Thus, I ended up creating this state management lib, that can also be integrated with a validation mechanism.

## API

- getState
- setState
- resetState

## Getting Started

```bash
$ npm install omni-state
```

## How does it work

The Omni State relies on strings that represent the paths that will be used inside the state. By using the Observable object, you'll be able to stablish a data-binding and you will be able to set and get the properties from your state using string paths. I only use object manipulations and merge operations.

For example: The string path 'customer.street.number' represents the path to an object that looks like this:

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

```vue
<template>
  <div>
    <input
      id="name"
      @change="onNameChange('customer.name', $event)"
    />
    <button
      id="saveButton"
      @click="save"
    >
      Save Form
    </button>
  </div>
</template>

<script>
import {
  setState,
  getState,
  resetState
} from 'omni-state';

export default {
  name: 'App',
  methods: {
    onNameChange: (stateKey, event) => {
      if (event && event.currentTarget) {
        const newValue = event.currentTarget.value;

        /**
         * This will update the state as follows:
         *
         * state = {
         *   form: {
         *     name: newValue
         *   }
         * }
         */
        setState(stateKey, value, 'form');
      }
    },
    save: () => {
      // This line will return the latest state
      const state = getState('form');

    }
  },
  beforeMount() {
    resetState();
  }
}
</script>
```

## Goals

My goal is to make it easier for you to build Vue projects and integrate state management and form validation.

Maybe I could extend these concepts to other Javascript frameworks, but for now I'll try to solve one problem at a time :)

## Contribute

See [the contribution guide](./CONTRIBUTE.md)
