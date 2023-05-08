<template>
  <nav class="navigation">
    <router-link
      :to="{ name:item.routeName }"
      tabindex="0"
      v-for="(item, index) in nav"
      :key="index"
      class="navigation__item"
    >
      <fa-icon
        :icon="item.icon"
        class="navigation__item-icon"
      />
      <div class="navigation__item-title">
        {{ item.title }}
      </div>
    </router-link>

  </nav>

</template>

<script>
export default {
  data () {
    return {
      nav: [
        {
          title: "Fantasy",
          path: "/",
          icon: 'futbol',
          routeName: 'fantasy'
        },
        {
          title: "Stats",
          path: "/stats",
          icon: 'chart-bar',
          routeName: 'stats'
        },
        {
          title: "Settings",
          path: "/settings",
          icon: 'cog',
          routeName: 'settings'
        },
      ],
    }
  }
}
</script>

<style lang="scss" scoped>
.navigation {
  background: #eeeeff;
  display: flex;
  justify-content: center;
  gap: $l;
  padding: $s;
  //width: 100%;

  &__item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: $xs;
    width: $l;
    height: $l;
    padding: $m;
    border-radius: 12px;
  }

  &__item-icon {
    height: 20px;
    width: 20px;
  }

  &__item-title {
    font-size: 12px;
    font-variant: small-caps;
    text-transform: lowercase;
  }

  .router-link-active {
    background: #1f5fe933;
    //color: #fff;
  }
}
</style>