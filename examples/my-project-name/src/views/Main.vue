<template>
  <form>
    <Input
      id="name"
      model="form.customer.name"
    />
    <Input
      id="age"
      model="page1.customer.age"
    />
    <Button
      id="save"
      @click="update"
    >
      Save
    </Button>
  </form>
</template>

<script lang="ts">
import Vue from "vue";

import Input from '@/components/form/Input.vue';
import Button from '@/components/form/Button.vue';
import { getState, setState } from "../commons/observable";

export default Vue.extend({
  name: "Main",
  components: {
    Input
  },
  beforeMount() {
    setState({
      form: {
        customer: {
          name: 'Juan'
        }
      },
      page1: {
        customer: {
          age: 12
        }
      }
    });
  },
  methods: {
    update(event: Event) {
      event.preventDefault();
      setState(20, 'page1.customer.age')
      setState('Danny', 'form.customer.name')
      console.log(getState('page1'));
    }
  }
});
</script>
