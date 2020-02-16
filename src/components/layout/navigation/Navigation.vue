<template>
  <ul class="navigation">
    <li
      v-for="(item, index) in nav"
      :key="index"
      :class="{'active': active === index}"
    >
      <img :src="item.icon" alt="icon">
      <div class="title">
        {{item.title}}
      </div>
    </li>
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
          icon: require('@/assets/icons/person_pin-24px.svg')
        },
        {
          title: 'Stats',
          icon: require('@/assets/icons/show_chart-24px.svg')
        },
        {
          title: 'About',
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
  }

  .navigation li.active {
    opacity: 1;
  }

</style>