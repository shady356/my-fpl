<template>
  <header class="header">
    <div class="row back-button">
      <router-link
        class="column"
        :to="{ name: routerBack }"
      >
        <fa-icon 
          icon="chevron-left" 
          class="go-back" 
        />
      </router-link>
    </div>
    <div class="row">
      <slot name="title" />
      <div
        class="menu-bar-icon"
        @click="openMenu()"
      >  
        <fa-icon icon="bars"/>
      </div>
      <Menu
        v-if="isMenuOpen"
        @closeMenu="closeMenu()"
        class="menu"
      />
    </div>
  </header>
</template>

<script>
import Menu from  '@/components/layout/Menu.vue'
export default {
  name: "Header",
  components: {
    Menu
  },
  props: {
    routerBack: {
      type: String,
      required: false,
      default: 'fantasy'
    }
  },
  data() {
    return {
      isMenuOpen: false
    }
  },
  methods: {
    openMenu () {
      this.isMenuOpen = true
    },
    closeMenu () {
      this.isMenuOpen = false
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  align-items: center;
  padding: $s;
  position: sticky;
  top: 0;
  padding: 16px 16px 0;
  background: #eee;

  .row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    &.back-button {
      margin-bottom: $s;
      font-size: 1.25rem;
    }

    .menu-bar-icon {
      font-size: 1.75rem;
    }
  }
}
</style>