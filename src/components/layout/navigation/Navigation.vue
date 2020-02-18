<template>
  <ul class="navigation">
    <router-link 
      :to="item.path"
      tabindex="0"
      tag="li"
      v-for="(item, index) in nav"
      :key="index"
      :class="{'active': active === index}"
    >
      <img :src="item.icon" alt="icon">
      <div class="title">
        {{item.title}}
      </div>
    </router-link>
  </ul>
</template>

<script>
export default {
  name: 'Navigation',
  data() {
    return {
      active: 0,
      nav: [
        {
          title: 'Points',
          path: '/',
          icon: require('@/assets/icons/person_pin-24px.svg')
        },
        {
          title: 'Stats',
          path: '/stats',
          icon: require('@/assets/icons/show_chart-24px.svg')
        },
        {
          title: 'About',
          path: '/stats',
          icon: require('@/assets/icons/info-24px.svg')
        }
      ]
    }
  }
}
</script>

<style scoped>

  .navigation {
    background: #000000;
    display: flex;
    justify-content: space-evenly;
  }

  .navigation li {
    padding: 8px;
    text-align: center;
    opacity: .6;
    font-size: 11px;
    font-weight: 700;
    text-transform: lowercase;
    letter-spacing: 1px;
    font-variant: small-caps;
    outline: none;
  }

  .navigation li.active {
    opacity: 1;
  }

</style>