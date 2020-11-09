<template>
  <div>
    <Header>
      <template #title>
        <h1>Stats</h1>
      </template> 
    </Header>
    <div
      v-if="bootstrap" 
      class="stats-container default-page-margin"
    >
      <h4 @click="openPlayerStatFilters()">Filter</h4>
      <section class="section">
        <h2>Top scorers</h2>
        <div class="horizontal-list">
          <router-link
            v-for="player in topScorers"
            :key="player.id"
            :to="{ name: 'playerPage', params: {player: player }}"
          >
            <PlayerItemCard
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
          <router-link
            v-for="player in topAssisters"
            :key="player.id"
            :to="{ name: 'playerPage', params: {player: player }}"
          >
            <PlayerItemCard
              class="top-scorer-player-item"
              :player="player"
              :statValue="player.assists"
            />
          </router-link>
        </div>
      </section>
      <section class="section">
        <h2>Top most points</h2>
        <div class="horizontal-list">
          <router-link
            v-for="player in topTotalPoints"
            :key="player.id"
            :to="{ name: 'playerPage', params: {player: player }}"
          >
            <PlayerItemCard
              class="top-scorer-player-item"
              :player="player"
              :statValue="player.total_points"
            />
          </router-link>
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
            :to="{ name: 'teamPage', params: {team: team }}"
          >
            <TeamItemCard :team="team"/>
          </router-link>
        </ul>
      </section>
    </div>
    <BaseModal
      v-if="showPlayerStatFilters"
      @closeModal="closePlayerStatFilters()">
      <template #header>
        Players stat filters
      </template>
      <template #content>
        Player
      </template>
    </BaseModal>
  </div>
</template>

<script>
import axios from "axios";
import orderBy from 'lodash/orderBy'
import Header from '@/components/layout/Header.vue'
import BaseModal from '@/components/base/BaseModal.vue'
import PlayerItemCard from '@/components/stats/player/PlayerItemCard'
import TeamItemCard from '@/components/stats/team/TeamItemCard.vue'

export default {
  name: 'Stats',
  components: {
    BaseModal,
    PlayerItemCard,
    TeamItemCard,
    Header
  },
  data () {
    return {
      bootstrap: null,
      teams: null,
      showTeams: true,
      showPlayerStatFilters: false,
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
    playersSortedByTotalPoints () {
      return orderBy(this.bootstrap.elements, 'total_points','desc')
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
    },
    topTotalPoints () {
      return this.playersSortedByTotalPoints.filter((player, index) => {
        if (index < 50) {
          return player
        }
      })
    }
  },
  mounted () {
    this.getBootstrap();
  },
  methods: {
    openPlayerStatFilters() {
      this.showPlayerStatFilters = true
    },
    closePlayerStatFilters() {
      this.showPlayerStatFilters = false
    },
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
      width: calc(100vw - 33px);
      padding: $s 0;

      .top-scorer-player-item {
        margin: $s;
        min-width: 164px;
      }
      .team-item {
        margin: $s;
        min-width: 110px;
      }
    }
  }
</style>