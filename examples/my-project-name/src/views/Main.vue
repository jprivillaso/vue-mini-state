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

import { setFormDataProp } from "@/commons/observable";

import Input from '@/components/form/Input.vue';
import Button from '@/components/form/Button.vue';
import { getFormData, setFormData, getFormDataProp } from "../commons/observable";

export default Vue.extend({
  name: "Main",
  components: {
    Input
  },
  beforeMount() {
    setFormData({
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
    update(event) {
      event.preventDefault();
      console.log(getFormDataProp('page1'));
    }
  }
});
</script>
