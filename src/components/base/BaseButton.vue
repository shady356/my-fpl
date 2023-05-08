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
    background: $pl-green;
    border-radius: $l;
    border: none;
    color: $pl-purple;
    font-size: 1.25rem;
    font-weight: 700;
    letter-spacing: 1px;
    padding: $s $m;
    cursor: pointer;

    &.ghost {
      background: none;
      border: 1px solid #333;
    }
  }
</style>