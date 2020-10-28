<template>
  <div class="menu-container">
    <div class="header">
      <h1>Menu</h1>
      <h1 @click="closeMenu()">
        Close
      </h1>
    </div>
    <ul class="menu-list">
      <li
        tabindex="0"
        v-for="(item, index) in nav"
        :key="index"
        class="menu-item"
        @click="goToLink(item.path)"
      >
        <fa-icon 
          :icon="item.icon"
          class="item-icon"
        />
        <div class="item-title">
          {{ item.title }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Menu",
  data() {
    return {
      active: 1,
      nav: [
        {
          title: "Fantasy",
          path: "/",
          icon: 'futbol'
        },
        {
          title: "Stats",
          path: "/stats",
          icon: 'chart-bar'
        },
        {
          title: "Settings",
          path: "/settings",
          icon: 'cog'
        },
      ],
    };
  },
  methods: {
    ...mapActions(["commitMenuStatus"]),
    closeMenu() {
      this.commitMenuStatus(false);
    },
    goToLink(path) {
      this.$router.push({path: path})
      this.closeMenu()
    }
  },
};
</script>

<style lang="scss" scoped>
.menu-container {
  position: relative;
  background: #fff;
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
    margin: $m $xs;

    .menu-item {
      display: flex;
      font-size: 2rem;
      align-items: center;
      padding: $m;

      .item-icon {
        font-size: 1.25rem;
      }
      .item-title {
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