<template>
  <section class="section">
    <h2>{{ playerList.title }}</h2>
    <div class="horizontal-list">
      <router-link
        v-for="player in filteredList"
        :key="player.id"
        :to="{ name: 'playerPage', params: { playerId: player.id }}"
      >
        <PlayerItemCard
          class="top-scorer-player-item"
          :player="player"
          :statValue="player[playerList.key]"
        />
      </router-link>
    </div>
  </section>
</template>

<script>
import orderBy from "lodash/orderBy";
import PlayerItemCard from "@/components/stats/player/PlayerItemCard";
export default {
  name: 'FeaturedPlayerList',
  components: {
    PlayerItemCard
  },
  props: {
    playerList: {
      type: Object,
      required: false,
      default: () => {}
    }
  },
  data() {
    return {
      players: this.$store.state.bootstrap.elements
    };
  },
  computed: {
    playersSortedByGoalsScored() {
      return orderBy(this.players, this.playerList.key, this.playerList.listSort);
    },
    filteredList() {
      return this.playersSortedByGoalsScored.filter((player, index) => {
        if (index < this.playerList.maxPlayers) {
          return player;
        }
      });
    }
  }
}
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