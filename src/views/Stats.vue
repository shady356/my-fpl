<template>
  <div
    v-if="bootstrap" 
    class="stats-container default-page-margin">
    <h1>Stats</h1>
    <ul>
      <StatsTeamListItem 
        v-for="team in teams"
        :key="team.id"
        :team="team"
        tag="li"
      />
    </ul>
  </div>
</template>

<script>
import axios from "axios";
import StatsTeamListItem from '@/components/stats/StatsTeamListItem.vue'

export default {
  name: 'Stats',
  components: {
    StatsTeamListItem
  },
  data () {
    return {
      bootstrap: null,
      teams: null,
      BASE_URL: process.env.VUE_APP_FPL_API_URL,
    }
  },
  mounted() {
    this.getBootstrap();
  },
  methods: {
    
    getBootstrap() {
      axios
        .get(`${this.BASE_URL}/api/bootstrap-static/`)
        .then((response) => {
          this.bootstrap = response.data;
          this.teams = response.data.teams
          // this.allPlayers = response.data.elements;
        })
        .catch((error) => {
          console.log(error);
          // this.errored = true;
        });
    },
  }
}
</script>

<style scoped lang="scss">
.stats-container {

}
</style>