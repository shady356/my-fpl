<template>
  <div id="app">
    <div v-if="isAppLoaded">
      <transition name="opacity" mode="out-in">
        <router-view class="main-layout" />
      </transition>
      <Menu
        v-if="isMenuOpen"
        class="menu"
        @closeMenu="closeMenu()"
      />
    </div>
    <div 
      v-else
      class="loading-app-feedback"
    >
      <h3>Loading FPL App ...</h3>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import fplApi from '@/service/fplApi.js'
import Menu from "@/components/layout/Menu.vue";
export default {
  name: "App",
  components: {
    Menu
  },
  data () {
    return {
      config: { headers:{'Access-Control-Allow-Origin': '*'}},
      isBootstrapLoaded: false,
      isFixturesLoaded: false,
      BASE_URL: process.env.VUE_APP_FPL_API_URL
    }
  },
  computed: {
    isMenuOpen () {
      return this.$store.state.isMenuOpen
    },
    isAppLoaded () {
      return this.isBootstrapLoaded && this.isFixturesLoaded 
    }
  },
  created () {
    this.setBootstrapData()
    this.setFixturesData()
  },
  methods: {
    ...mapActions(['commitSetBootstrapData', 'commitSetFixturesData']),
    async setBootstrapData () {
      const response = await fplApi.getBootstrapData()
      console.log(response)
      this.isBootstrapLoaded = true
      this.commitSetBootstrapData(response.data)
      if (response.error) {
        console.log('error') // TODO: replace with toast
      }
    },
    async setFixturesData () {
      const response = await fplApi.getFixturesData()
      this.isFixturesLoaded = true
      this.commitSetFixturesData(response.data)
      if (response.error) {
        console.log('error') // TODO: replace with toast
      }
    }
  }
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

#app {
  font-family: "Roboto Condensed", sans-serif;
  color: #333;
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

.loading-app-feedback {
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
}
</style>
