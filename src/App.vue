<template>
  <div id="app" class="grid">
    <transition name="opacity" mode="in-out">
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

<style>
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
  grid-template-columns: 100%;
  grid-template-rows: 1fr auto;
}

.main-view {
  grid-row-start: 1;
  grid-row-end: 1;
  min-height: 100vh;
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

/* Color Theme Swatches in Hex */
.pl-red { color: #F2055C; }
.pl-dark { color: #340040; }
.pl-cyan { color: #07F2F2; }
.pl-green { color: #05F26C; }
.pl-yellow { color: #EAF205; }

.slide-enter-active, .slide-leave-active {
  transition: transform .4s;
}
.slide-enter, .slide-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: translateX(100vw);
}

.opacity-enter-active, .opacity-leave-active {
  transition: opacity .4s;
}
.opacity-enter, .opacity-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}


</style>
