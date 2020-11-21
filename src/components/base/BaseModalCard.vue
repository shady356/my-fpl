<template>
  <div class="modal-container">
    <transition 
      name="slide-v" 
      appear
    >
      <div
        class="modal-window"
        :style="{'backgroundColor': backgroundColor, 'color': textColor }"
      >
        <div class="modal-content">
          <slot />
        </div>
      </div>
    </transition>
    <div
      class="close-button"
      @click="closeModal()"
    >
      <img :src="clear" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseModalCard',
  props: {
    backgroundColor: {
      type: String,
      required: false,
      default: '#fff'
    },
    textColor: {
      type: String,
      required: false,
      default: ''
    }
  },
  data() {
    return {
      clear: require('@/assets/icons/clear-24px.svg')
    }
  },
  mounted () {
    document.body.classList.add('disable-scroll')
  },
  destroyed () {
    document.body.classList.remove('disable-scroll')
  },
  methods: {
    closeModal() {
      this.$emit('close')
    }
  }
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
    z-index: 90;

    .modal-window {
      position: fixed;
      overflow-y: auto;
      border-radius: $m;
      top: 1vh;
      left: 2vw;
      width: 96vw;
      height: 96vh;
      padding-bottom: 1rem;
      //background-image: linear-gradient(180deg, hsla(180, 100%, 50%, 0.85), hsla(249, 71%, 35%, 0.85));
    }
    .close-button {
      background: #000;
      border-radius: 50%;
      transform: translateX(50%);
      bottom: 4vh;
      color: #fff;
      font-size: 36px;
      height: 40px;
      position: absolute;
      right: 50%;
      text-align: center;
      width: 40px;
      z-index: 100;
    }
  }

</style>