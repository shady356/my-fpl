<template>
  <div class="menu-container">
    <div class="header">
      <h1>Menu</h1>
      <h1 @click="closeMenu()">X</h1>
    </div>
    <ul class="menu-list">
      <router-link
        :to="item.path"
        tabindex="0"
        tag="li"
        v-for="(item, index) in nav"
        :key="index"
        :class="['menu-item', { active: active === index }]"
        @click="changeActive(index)"
      >
        <img :src="item.icon" alt="icon" />
        <div class="title">
          {{ item.title }}
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Menu",
  data() {
    return {
      active: 1,
      nav: [
        {
          title: "Fantasy",
          path: "/",
          icon: require("@/assets/icons/person_pin-24px.svg"),
        },
        {
          title: "Stats",
          path: "/stats",
          icon: require("@/assets/icons/show_chart-24px.svg"),
        },
        {
          title: "Settings",
          path: "/settings",
          icon: require("@/assets/icons/settings-24px.svg"),
        },
      ],
    };
  },
  methods: {
    changeActive(index) {
      this.active = index;
    },
    closeMenu() {
      this.$emit("closeMenu");
    },
  },
};
</script>

<style lang="scss" scoped>
.menu-container {
  background: $pl-purple;
  color: #fff;
  height: 100vh;
  left: 0;
  padding: 16px;
  position: fixed;
  top: 0;
  width: calc(100% - 32px);
  z-index: 100 !important;

  .header {
    display: flex;

    justify-content: space-between;
  }

  .menu-list {
    margin: 20px;

    .menu-item {
      display: flex;
      font-size: 2rem;
      color: #fff;
      padding: $s;

      .title {
        margin-left: $s;
        font-weight: 700;
      }

      &.active {
        color: $pl-green;
      }
    }
  }
}
</style>