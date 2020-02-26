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

ul li {
  list-style: none;
}


h1 {
  font-size: 2rem;
  margin: 0;
}
h2 {
  font-size: 1.75rem;
  font-weight: 300;
}
h3 {
  font-size: 1.5rem;
  font-weight: 300;
}
h4 {
  font-size: 1.3rem;
  font-weight: 400;
}
h5 {
  font-size: 1.25rem;
  font-weight: 700;
}
h6 {
  font-size: 1.15rem;
  font-weight: 700;
}

.letter-spacing {
  letter-spacing: 1px;
}
.small-caps {
  font-variant: small-caps;
  text-transform: lowercase;
}
.ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.grid {
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: 1fr 10vh;
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
