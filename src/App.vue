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
import axios from 'axios'
import { mapActions } from "vuex";
import Menu from "@/components/layout/Menu.vue";
export default {
  name: "App",
  components: {
    Menu
  },
  data () {
    return {
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
    this.testFakeApi ()
  },
  methods: {
    ...mapActions(['commitSetBootstrapData', 'commitSetFixturesData']),
    testFakeApi () {
      axios
        .get(`https://api.mocki.io/v1/b043df5a`)
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
          // this.errored = true;
        })
      
    },
    setBootstrapData() {
      axios
        .get(`${this.BASE_URL}/api/bootstrap-static/`)
        .then((response) => {
          this.isBootstrapLoaded = true
          this.commitSetBootstrapData(response.data)
        })
        .catch((error) => {
          console.log(error)
          // this.errored = true;
        })
    },
    setFixturesData () {
      axios
        .get(`${this.BASE_URL}/api/fixtures/`)
        .then((response) => {
          this.isFixturesLoaded = true
          this.commitSetFixturesData(response.data)
        })
        .catch((error) => {
          console.log(error);
          // this.errored = true;
        });
    },
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
  color: $pl-purple;
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
