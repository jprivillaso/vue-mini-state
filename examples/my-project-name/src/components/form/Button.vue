<template>
  <div>
    <button
      @click="update"
    >
      <slot></slot>
    </button>
  </div>
</template>

<script>
import { getFormDataProp, setFormDataProp } from '@/commons/observable';

export default {
  name: 'Button',
  props: ['model', 'id', 'update']
}
</script>
