<template>
  <header class="header">
    <router-link
      v-if="isBackButton"
      class="row back-button"
      :to="{ name: routerBack }"
    >
      <fa-icon 
        icon="chevron-left" 
        class="go-back" 
      />
    </router-link>
    <div class="row">
      <slot name="title" />
      <div
        class="menu-bar-icon"
        @click="openMenu()"
      >  
        <fa-icon icon="bars"/>
      </div>
    </div>
  </header>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Header",
  props: {
    routerBack: {
      type: String,
      required: false,
      default: ''
    }
  },
  computed: {
    isBackButton () {
      return this.routerBack.length > 0
    }
  },
  methods: {
    ...mapActions(["commitMenuStatus"]),
    openMenu () {
      this.commitMenuStatus(true)
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