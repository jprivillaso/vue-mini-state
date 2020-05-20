<template>
  <div>
    <input
      :id="id"
      ref="input"
      :value="fieldValue"
      type="input"
      @change="update"
    />
  </div>
</template>

<script>
import { getFormDataProp, setFormDataProp } from '@/commons/observable';

export default {
  name: 'Input',
  props: ['model', 'id'],
  computed: {
    fieldValue() {
      return getFormDataProp(this.model);
    }
  },
  methods: {
    update() {
      const input = this.$refs.input;
      setFormDataProp(this.model, input.value);
      this.$emit('change', input.value);
    }
  }
}
</script>
