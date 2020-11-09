<template>
  <div v-if="bootstrap">
    <section class="section">
      <h2>Top scorers</h2>
      <div class="horizontal-list">
        <router-link
          v-for="player in topScorers"
          :key="player.id"
          :to="{ name: 'playerPage', params: { player: player } }"
        >
          <PlayerItemCard
            class="top-scorer-player-item"
            :player="player"
            :statValue="player.goals_scored"
          />
        </router-link>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import orderBy from "lodash/orderBy";
import PlayerItemCard from "@/components/stats/player/PlayerItemCard";
export default {
  name: "StatsTeamsPage",
  components: {
    PlayerItemCard
  },
  data() {
    return {
      teams: null,
      bootstrap: null,
      BASE_URL: process.env.VUE_APP_FPL_API_URL
    };
  },
  computed: {
    playersSortedByGoalsScored() {
      return orderBy(this.bootstrap.elements, "goals_scored", "desc");
    },
    topScorers() {
      return this.playersSortedByGoalsScored.filter((player, index) => {
        if (index < 10) {
          return player;
        }
      });
    }
  },
  mounted () {
    this.getBootstrap()
  },
  methods: {
    getBootstrap() {
      axios
        .get(`${this.BASE_URL}/api/bootstrap-static/`)
        .then((response) => {
          this.bootstrap = response.data;
        })
        .catch((error) => {
          console.log(error);
          // this.errored = true;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.section {
  margin: $l 0;

  .horizontal-list {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: scroll;
    width: calc(100vw - 33px);
    padding: $s 0;

    .top-scorer-player-item {
      margin: $s;
      min-width: 164px;
    }
  }
}
</style>