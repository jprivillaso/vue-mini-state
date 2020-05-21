<template>
  <div>
    <button @click="update">
      <slot></slot>
    </button>
  </div>
</template>

<script>
export default {
  name: 'Button',
  props: ['model', 'id', 'update']
}
</script>
