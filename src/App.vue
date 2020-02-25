<template>
  <div id="app" class="grid">
    <transition name="opacity" mode="out-in">
      <router-view class="main-view"/>
    </transition>
    <navigation class="navigation"/>
  </div>
</template>

<script>
import Navigation from '@/components/layout/navigation/Navigation.vue'
export default {
  name: 'App',
  components: {
    'navigation': Navigation
  }
}
</script>

<style lang="scss">
*{
  margin: 0;
  padding: 0;
}

#app {
  font-family: 'Roboto', sans-serif;
  color: #888;
}

.grid {
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: 90vh 10vh;
}

.main-view {
  grid-row-start: 1;
  grid-row-end: 1;
}
.navigation {
  position: sticky;
  bottom: 0;
  grid-row-start: 2;
  grid-row-end: 2;
  align-items: center;
  align-self: end;
}

ul li {
  list-style: none;
}



.slide-enter-active, .slide-leave-active {
  transition: transform .3s;
}
.slide-enter, .slide-leave-to {
  transform: translateX(100vw);
}

.opacity-enter-active, .opacity-leave-active {
  transition: opacity .3s;
}
.opacity-enter, .opacity-leave-to {
  opacity: 0;
}


</style>
