<template>
  <input
    :id="id"
    ref="input"
    :value="fieldValue"
    type="input"
    @change="update"
  />
</template>

<script>
import { getters, mutations } from '../commons/observable';

export default {
  name: 'Input',
  props: ['model', 'id'],
  beforeMount() {
    console.log('Input before mount', this.model);
  },
  computed: {
    fieldValue() {
      console.log(getters.getFormData());
      return getters.getFormDataProp(this.model);
    }
  },
  methods: {
    update() {
      const input = this.$refs.input;
      mutations.setFormDataProp(this.model, input.value);
      this.$emit('input', input.value);
    }
  }
}
</script>
