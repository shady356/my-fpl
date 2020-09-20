<template>
  <div id="app" class="grid">
    <transition name="opacity" mode="out-in">
      <router-view class="main-layout"/>
    </transition>
    <navigation class="navigation-layout"/>
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
  color: #aaa;
}

.disable-scroll {
  overflow: hidden;
}

ul li {
  list-style: none;
}


.grid {
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto 8vh;
  min-height: 100vh;
}

.main-layout {
  grid-row-start: 1;
  grid-row-end: 1;
}
.navigation-layout {
  position: sticky;
  bottom: 0;
  grid-row-start: 2;
  grid-row-end: 2;
  align-items: center;
  align-self: end;
}

</style>
