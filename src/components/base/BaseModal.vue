<template>
  <div class="modal-container">
    <div class="modal-window">
      <div class="modal-header">
        <slot name="header"/>
        <div class="exit">x</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseModal'
}
</script>

<style lang="scss" scoped>

  .modal-container {
    background: hsla(0,0%,0%,.75);
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
  }

</style>