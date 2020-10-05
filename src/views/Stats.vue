<template>
  <div
    v-if="bootstrap" 
    class="stats-container default-page-margin">
    <h1>Stats</h1>
    <section class="section">
      <h2>Top scorers</h2>
      <div class="horizontal-list">
        <router-link
          v-for="player in topScorers"
          :key="player.id"
          :to="{ name: 'playerProfile', params: {player: player }}"
        >
          <PlayerItemMini
            class="top-scorer-player-item"
            :player="player"
            :statValue="player.goals_scored"
          />
        </router-link>
      </div>
    </section>
    <section class="section">
      <h2>Top assisters</h2>
      <div class="horizontal-list">
        <PlayerItemMini
          class="top-scorer-player-item"
          v-for="player in topAssisters"
          :key="player.id"
          :player="player"
          :statValue="player.assists"
        />
      </div>
    </section>
    <section class="section">
      <h2 @click="showTeams = !showTeams">Teams</h2>
      <ul class="horizontal-list">
        <router-link
          v-for="team in teams"
          :key="team.id"
          tag="li"
          class="team-item"
          :to="{ name: 'statsTeamItem', params: {team: team }}"
        >
          <StatsTeamListItem :team="team"/>
        </router-link>
      </ul>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import orderBy from 'lodash/orderBy'
import PlayerItemMini from '@/components/stats/PlayerItemMini'
import StatsTeamListItem from '@/components/stats/StatsTeamListItem.vue'

export default {
  name: 'Stats',
  components: {
    PlayerItemMini,
    StatsTeamListItem
  },
  data () {
    return {
      bootstrap: null,
      teams: null,
      showTeams: true,
      BASE_URL: process.env.VUE_APP_FPL_API_URL,
    }
  },
  computed: {
    playersSortedByGoalsScored () {
      return orderBy(this.bootstrap.elements, 'goals_scored','desc')
    },
    playersSortedByAssists () {
      return orderBy(this.bootstrap.elements, 'assists','desc')
    },
    topScorers () {
      return this.playersSortedByGoalsScored.filter((player, index) => {
        if (index < 10) {
          return player
        }
      })
    },
    topAssisters () {
      return this.playersSortedByAssists.filter((player, index) => {
        if (index < 10) {
          return player
        }
      })
    }
  },
  mounted () {
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
    }
  }
}
</script>

<style scoped lang="scss">

  .section {
    margin: $l 0;

    .horizontal-list {
      display: flex;
      flex-wrap: nowrap;
      overflow-x: scroll;
      width: calc(100vw - 32px);
      padding: $s 0;

      .top-scorer-player-item {
        margin: $s;
        min-width: 100px;
      }
      .team-item {
        margin: $s;
        min-width: 110px;
      }
    }
  }
</style>