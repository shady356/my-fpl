<template>
  <div>
    <div v-if="!hasTeamId">
      <login />
    </div>
    <div v-else>
      <div v-if="this.isLoaded">
        <FantasyHeader 
          :GW="GW"
          :bootstrap="bootstrap"
          :gameweeks="gameweeks"
          @updateGameweek="updateGameweek"
        />
        <pitch-formation 
          :players="myPlayers" 
          :GW="GW" 
        />
      </div>
    </div>
  </div>
</template>

<script>
import FantasyHeader from '@/components/fantasy/FantasyHeader.vue'
import PitchFormation from "@/components/pitch/PitchFormation.vue";
import Login from "@/views/Login.vue";
import axios from "axios";
export default {
  name: "Fantasy",
  components: {
    FantasyHeader,
    "pitch-formation": PitchFormation,
    login: Login,
  },
  data() {
    return {
      GW: 1,
      gameweeks: null,
      allPlayers: null,
      myPicks: null,
      myPicksIds: null,
      bootstrap: null,
      localhostBase: process.env.VUE_APP_FPL_API_URL,
      teamId: 82673,
    };
  },
  computed: {
    BASE_URL() {
      return this.localhostBase;
    },
    hasTeamId() {
      return !!this.teamId;
    },
    isLoaded() {
      return (
        this.isBootstrapLoaded && this.isMyPicksLoaded && this.isGameweeksLoaded
      );
    },
    isBootstrapLoaded() {
      return !!this.bootstrap;
    },
    isMyPicksLoaded() {
      return !!this.myPicks;
    },
    isGameweeksLoaded() {
      return !!this.gameweeks;
    },
    numberOfPlayersLoaded() {
      return this.countPlayerScoreFetched;
    },
    currentGw() {
      if (this.gameweeks !== null) {
        return this.gameweeks.current[this.gameweeks.current.length - 1];
      } else {
        return null;
      }
    },
    myPlayers() {
      let index = 0;
      return this.allPlayers.filter((player) => {
        if (this.myPicksIds.includes(player.id)) {
          index = this.findPlayerIndexById(player.id);
          player["gameweek"] = this.myPicks[index] || null;
          return player;
        }
      });
    },
  },
  mounted() {
    this.getBootstrap();
    this.getGameWeeks();
    this.getMyPicks(this.GW);
  },
  methods: {
    findPlayerIndexById(id) {
      return this.myPicks.findIndex((player) => player.element === id);
    },
    // Axios
    getBootstrap() {
      axios
        .get(`${this.BASE_URL}/api/bootstrap-static/`)
        .then((response) => {
          this.bootstrap = response.data;
          this.allPlayers = response.data.elements;
        })
        .catch((error) => {
          console.log(error);
          this.errored = true;
        });
    },
    getMyPicks(gw) {
      axios
        .get(`${this.BASE_URL}/api/entry/${this.teamId}/event/${gw}/picks/`)
        .then((response) => {
          this.myPicks = response.data.picks;
          this.myPicksIds = this.myPicks.map((player) => player.element);
        })
        .catch((error) => {
          console.log(error);
          this.errored = true;
        });
    },
    getGameWeeks() {
      axios
        .get(`${this.BASE_URL}/api/entry/${this.teamId}/history/`)
        .then((response) => {
          this.gameweeks = response.data;
        })
        .catch((error) => {
          console.log(error);
          this.errored = true;
        });
    },
    updateGameweek(gw) {
      this.GW = gw;
      this.getMyPicks(gw);
    },
  },
};
</script>

<style scoped lang="scss">

</style>