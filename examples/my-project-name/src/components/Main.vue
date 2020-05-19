<template>
  <div>
    <Input id="name" model="customer.name" />
    <button @click="update">save</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mutations, getters } from "../commons/observable";

import Input from './Input.vue';

export default Vue.extend({
  name: "Main",
  components: {
    Input
  },
  beforeMount() {
    console.log('Before mount main');
    mutations.setFormDataProp('customer.name', 'Mary');
  },
  methods: {
    update() {
      mutations.setFormDataProp('customer.name', 'Danny');
      console.log(getters.getFormData());
    }
  }
});
</script>
