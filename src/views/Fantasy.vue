<template>
  <div>
    <div v-if="!hasTeamId">
      <login />
    </div>
    <div v-else>
      <div v-if="this.isLoaded">
        <div class="gameweek-pagination">
          <button :disabled="GW < 2" @click="changeGameweek(GW - 1)">
            Prev
          </button>

          <h4>Gameweek {{ GW }}</h4>

          <button
            :disabled="GW === gameweeks.current.length"
            @click="changeGameweek(GW + 1)"
          >
            Next
          </button>
        </div>

        <ul class="gameweek-score-container">
          <li class="gameweek-average-points">
            <h4>{{ bootstrap.events[GW - 1].average_entry_score }}</h4>
            <h6 class="small-caps">avg pts</h6>
          </li>
          <li class="gameweek-points">
            <h2>{{ gameweeks.current[GW - 1].points }}</h2>
            <h6 class="small-caps">your score</h6>
          </li>
          <li>
            <h4>{{ gameweeks.current[GW - 1].rank | bigNumber }}</h4>
            <h6 class="small-caps">gw rank</h6>
          </li>
        </ul>

        <pitch-formation :players="myPlayers" :GW="GW" />
      </div>
    </div>
  </div>
</template>

<script>
import PitchFormation from "@/components/pitch/PitchFormation.vue";
import Login from "@/views/Login.vue";
import axios from "axios";
export default {
  name: "home",
  components: {
    "pitch-formation": PitchFormation,
    login: Login,
  },
  filters: {
    bigNumber(value) {
      return new Intl.NumberFormat("en-UK", {
        maximumSignificantDigits: 7,
      }).format(value);
    },
  },
  data() {
    return {
      GW: 1,
      gameweeks: null,
      allPlayers: null,
      myPicks: null,
      myPicksIds: null,
      bootstrap: null,
      localhostBase: "http://localhost:8080",
      networkBase: "http://192.168.0.18:8080",
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
    changeGameweek(n) {
      this.GW = n;
      this.updateGameweek(n);
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
      this.getMyPicks(gw);
    },
  },
};
</script>

<style scoped lang="scss">
.gameweek-pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: $pl-purple;

  h4 {
    //font-style: italic;
    color: #fff;
  }

  button {
    padding: $xs $m;
    background: none;
    border: none;
    color: #ddd;
    margin: $s;
  }
}

.gameweek-score-container {
  padding: $s;
  background: $pl-purple;
  display: flex;
  justify-content: space-evenly;
  align-items: baseline;

  li {
    text-align: center;

    h6 {
      font-weight: 300;
    }
    h4 {
      color: #ddd;
    }
    &.gameweek-points {
      h2 {
        color: $pl-green;
        font-weight: 700;
      }
    }
  }
}
</style>