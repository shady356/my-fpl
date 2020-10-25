<template>
  <header class="header">
    <router-link
      class="column"
      :to="{ name: routerBack }"
    >
      <!-- <fa-icon 
        icon="chevron-left" 
        class="go-back" 
      /> -->
    </router-link>
    <div class="column">
      <slot name="title" />
    </div>
    <div 
      class="column"
      @click="openMenu()"
    >  
      Menu
    </div>
    <div
      v-if="isMenuOpen"
       
      class="menu">
      <Menu
        @closeMenu="closeMenu()"
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
      default: 'Home'
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
  background: hsla(0, 0%, 100%, 0.9);
  border-bottom: 1px solid #ddd;
  display: flex;
  padding: $s;
  position: sticky;
  top: 0;

  .column {
    text-align: center;

    &:nth-child(1) {
      flex-grow: 1;
    }
    &:nth-child(2) {
      flex-grow: 12;
    }
    &:nth-child(3) {
      flex-grow: 1;
    }
  }
}
.dark {
  .header {
    background: hsla(0, 0%, 10%, 0.9);
    border-bottom: 1px solid #333;
    color: #fff;
    
    .go-back {
      color: #fff;
    }
  }
}
</style>