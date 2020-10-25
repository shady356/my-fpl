<template>
  <div id="app">
    <transition name="opacity" mode="out-in">
      <router-view class="main-layout"/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
*{
  margin: 0;
  padding: 0;
}

#app {
  font-family: 'Roboto Condensed', sans-serif;
  color: $pl-purple;
}

.disable-scroll {
  overflow: hidden;
}

a {
  text-decoration: none;
}

ul li {
  list-style: none;
}

</style>
