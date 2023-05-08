<template>
  <div>

    <h3>Settings</h3>

    <div class="default-page-margin">
      <h1>Settings</h1>

      <ul class="settings-list">
        <li
          v-for="item in settingsList"
          :key="item.name"
        >
          <img
            class="item-icon"
            :src="item.icon"
            :alt="item.name + ' icon'"
          >
          <h3>{{item.name}}</h3>
        </li>
      </ul>

      <!-- About button -->
      <router-link to="/about">
        <base-button class="ghost">
          About
        </base-button>
      </router-link>

    </div>
  </div>
</template>

<script>

import BaseButton from '@/components/base/BaseButton.vue'
export default {
  name: 'Settings',
  components: {
    BaseButton,
  },
  data () {
    return {
      settingsList: [
        {
          name: 'Theme',
          icon: require('@/assets/icons/moon-24px.svg')
        },
        {
          name: 'Vibration',
          icon: require('@/assets/icons/vibration-24px.svg')
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.settings-list {
  margin: $l 0 $xl;
  display: flex;
  flex-wrap: wrap;

  li {
    display: flex;
    flex-direction: column;
    height: 100px;
    flex-basis: 50%;

    justify-content: center;
    text-align: center;

    .item-icon {
      margin-bottom: $m;
    }
  }
}
</style>