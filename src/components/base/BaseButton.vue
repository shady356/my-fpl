<template>
  <button 
    @click="clicked()"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
  methods: {
    clicked () {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped>
  button {
    background: $pl-purple;
    border: none;
    padding: $s $m;
    font-size: 1.25rem;
    color: #333;
    letter-spacing: 1px;
    border-radius: $l;

    &.ghost {
      background: none;
      border: 1px solid #333;
    }
  }
</style>