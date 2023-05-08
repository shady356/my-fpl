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
    <button
      class="close-button"
      @click="closeModal()"
    >
      <img :src="clear" alt="">
    </button>
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
      default: '#333'
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
      transition: background-color 400ms ease-in;
      //background-image: linear-gradient(180deg, hsla(300, 79%, 94%, 0.85), hsla(250, 75%, 89%, 0.85));
    }
    .close-button {
      display: flex;
      justify-content: center;
      align-items: center;
      background: #000;
      border-radius: 50%;
      border: none;
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