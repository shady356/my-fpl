<template>
  <div v-if="players">
    <section class="section">
      <h2>Top scorers</h2>
      <div class="horizontal-list">
        <router-link
          v-for="player in topScorers"
          :key="player.id"
          :to="{ name: 'playerPage', params: { player: player }}"
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
import orderBy from "lodash/orderBy";
import PlayerItemCard from "@/components/stats/player/PlayerItemCard";
export default {
  name: "StatsTeamsPage",
  components: {
    PlayerItemCard
  },
  data() {
    return {
      players: this.$store.state.bootstrap.elements
    };
  },
  computed: {
    playersSortedByGoalsScored() {
      return orderBy(this.players, "goals_scored", "desc");
    },
    topScorers() {
      return this.playersSortedByGoalsScored.filter((player, index) => {
        if (index < 10) {
          return player;
        }
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