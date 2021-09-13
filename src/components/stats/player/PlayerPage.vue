<template>
  <div>
    <BaseModalCard
       v-if="player"
      @close="goBack"
    >
      <div class="default-page-margin">
        <!-- Cover -->
        <div class="cover">
          <!-- <router-link :to="{name: 'stats'}">
            <img
              :src="arrowBackIcon" 
              alt="Go back: teams"
            >
          </router-link> -->
          <div class="player">
            <img
              class="player-image" 
              :src="playerProfilePicture"
              @error="setDefaultPlayerProfilePicture()"
              alt=""
            >
            <div class="player-name">
              <h3>{{player.first_name}}</h3>
              <h2>{{player.web_name}}</h2>
              <h4 :class="['position-tag', playerPosition]">
                {{playerPosition}}
              </h4>
            </div>
          </div>
        </div>
        <!-- Gameweeks results -->
        <h2>Gameweeks</h2>
        <PlayerGameweeksResults
          v-if="playerSummary"
          class="player-gameweeks-results-container"
          :playerSummary="playerSummary"
          :teamBadge="teamBadge"
        />
        <!-- Chart -->
        <div class="player-stat-chart-master-container">
          <h2>Charts</h2>
          <div class="stat-selector-container">
            <BaseTabs 
              :items="chartStatList"
              :activeIndex="selectedChartStatTabIndex"
              horisontal-list
              @selectTab="selectChartStat"
            />
          </div>
          <PlayerStatsChartController
            v-if="playerSummary"
            class="player-stat-chart-layout"
            :playerChartData="playerChartData"
            :playerSummary="playerSummary"
          />
        </div>
        <!-- Meta -->
        <div>
          <h2>Details</h2>
          <!-- Cost / Selection / tot points -->
          <div class="stats-container">
            <div class="stat-item">
              <h6>Value</h6>
              <h3>{{player.now_cost | playerCost}}</h3>
            </div>
            <div class="stat-item">
              <h6>Selected By</h6>
              <h3>{{player.selected_by_percent}}%</h3>
            </div>
            <div class="stat-item">
              <h6>Total Points</h6>
              <h3>{{player.total_points}}</h3>
            </div>
          </div>
          <!-- ICT detailed -->
          <div class="stats-container">
            <div class="stat-item">
              <h6>Influence</h6>
              <h4>{{player.influence}}</h4>
            </div>
            <div class="stat-item">
              <h6>Creativity</h6>
              <h4>{{player.creativity}}</h4>
            </div>
            <div class="stat-item">
              <h6>Threat</h6>
              <h4>{{player.threat}}</h4>
            </div>
            <div class="stat-item">
              <h6>Rank</h6>
              <h4>{{player.influence_rank | toRank}}</h4>
            </div>
            <div class="stat-item">
              <h6>Rank</h6>
              <h4>{{player.creativity_rank | toRank}}</h4>
            </div>
            <div class="stat-item">
              <h6>Rank</h6>
              <h4>{{player.threat_rank | toRank}}</h4>
            </div>
          </div>
          <!-- ICT index -->
          <div class="stats-container">
            <div class="stat-item">
              <h6>ICT Index</h6>
              <h3>{{player.ict_index}}</h3>
            </div>
            <div class="stat-item">
              <h6>Rank</h6>
              <h3>{{player.ict_index_rank | toRank}}</h3>
            </div>
          </div>
          <!-- Goals / Assists -->
          <div class="stats-container">
            <div class="stat-item">
              <h6>Goals</h6>
              <h3>{{player.goals_scored}}</h3>
            </div>
            <div class="stat-item">
              <h6>Assists</h6>
              <h3>{{player.assists}}</h3>
            </div>
          </div>
          <!-- Clean sheets -->
          <div class="stats-container">
            <div class="stat-item">
              <h6>Clean sheets</h6>
              <h3>{{player.clean_sheets}}</h3>
            </div>
          </div>
        </div>
      </div>
    </BaseModalCard>
  </div>
</template>

<script>
import axios from "axios";
import BaseTabs from '@/components/base/BaseTabs.vue'
import BaseModalCard from '@/components/base/BaseModalCard.vue'
import PlayerStatsChartController from '@/components/stats/player/PlayerStatsChartController.vue'
import PlayerGameweeksResults from '@/components/stats/player/PlayerGameweeksResults.vue'
import { $getPlayerById, $getPlayerPositionByType } from '@/helpers/players.js'
import { 
  $getTeamCodeByTeamId,
  $getTeamBadgeByTeamCode } from '@/helpers/teams.js'
export default {
  name: 'PlayerPage',
  components: {
    BaseTabs,
    BaseModalCard,
    PlayerStatsChartController,
    PlayerGameweeksResults
  },
  props: {
    playerId: {
      type: [Number, String],
      required: true
    }
  },
  filters: {
    toRank (value) {
      switch (value) {
        case 1: return value + 'st'
        case 2: return value + 'nd'
        case 3: return value + 'rd'
        default: return value + 'th'
      }
    },
    playerCost(value) {
      return '£' + (value / 10).toFixed(1) 
    }
  },
  data() {
    return {
      allPlayers: this.$store.state.bootstrap.elements,
      player: null,
      playerPosition: null,
      playerProfilePicture: '',
      defaultPlayerProfilePicture: require('@/assets/default_profile.png'),
      pictureBase: 'https://resources.premierleague.com/premierleague/photos/players/110x140/p',
      teamBadge: null,
      arrowBackIcon: require('@/assets/icons/arrow_back-24px.svg'),
      BASE_URL: process.env.VUE_APP_FPL_API_URL,
      
      playerSummary: null,
      playerChartData: {
        key: 'goals_scored',
        min: 0,
        stepSize: 1
      },
      selectedChartStat: 'goals_scored',
      selectedChartStatTabIndex: 0,
      chartStatList: [
        {name: 'Goals scored', value: 'goals_scored'},
        {name: 'Assists', value: 'assists'},
        {name: 'Value', value: 'value'},
        {name: 'Minutes played', value: 'minutes'},
        {name: 'Saves', value: 'saves'}
      ]
    }
  },
  computed: {
    playerMinimumCost() {
      let minCost = this.playerSummary.history[0].value
      this.playerSummary.history.forEach(gameweek => {
        if(gameweek.value < minCost)
          minCost = gameweek.value
      });
      return minCost
    }
  },
  mounted () {
    this.player = $getPlayerById(this.playerId)
    this.getPlayerSummary(this.playerId)
    this.teamBadge = this.getTeamBadge()
    this.playerProfilePicture = this.pictureBase + this.player.code + '.png'
    this.playerPosition = $getPlayerPositionByType(this.player.element_type)
    this.selectChartStat({value: this.selectedChartStat, index: this.selectedChartStatTabIndex})
  },
  methods: {
    getPlayerSummary (id) {
      axios
        .get(`${this.BASE_URL}/api/element-summary/${id}/`)
        .then((response) => {
          this.playerSummary = response.data;
        })
        .catch((error) => {
          console.log(error);
          // this.errored = true;
        });
    },
    selectChartStat(payload) {
      this.selectedChartStatTabIndex = payload.index
      switch(payload.value) {
        case 'goals_scored': this.setChartDataAttributes('goals_scored', 0, 1); break;
        case 'assists': this.setChartDataAttributes('assists', 0, 1); break;
        case 'minutes': this.setChartDataAttributes('minutes', 0, 45); break;
        case 'value': this.setChartDataAttributes('value', this.playerMinimumCost, 1); break;
        case 'saves': this.setChartDataAttributes('saves', 0, 1); break;
      }
    },
    setChartDataAttributes(key, min, stepSize) {
      this.playerChartData.key = key
      this.playerChartData.min = min
      this.playerChartData.stepSize = stepSize
    },
    setDefaultPlayerProfilePicture() {
      this.playerProfilePicture = this.defaultPlayerProfilePicture
    },
    getTeamBadge() {
      const teamCode = $getTeamCodeByTeamId(this.player.team)
      return $getTeamBadgeByTeamCode(teamCode)
    },
    goBack() {
      this.$router.back()
    }
  }
}
</script>

<style lang="scss" scoped>
  .cover {
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid #ddd;
    margin-bottom: $l;

    .player {
      margin-top: $l;
      display: flex;
      align-items: center;
      .player-image {
        width: 100px;
      }
      .player-name {
        margin-left: $m;
      }
      .position-tag {
        display: inline-block;
        padding: $xs $s;
        font-size: 0.75rem;
        font-weight: 700;
        text-transform: uppercase;
        margin-top: $s;
        border-radius: $xs;
        letter-spacing: 1px;

        &.goalkeeper {
          background: $pl-yellow;
          color: darken($pl-yellow, 40%);
        }
        &.defense {
          background: $pl-green;
          color: darken($pl-green, 40%);
        }
        &.midfielder {
          background: $pl-blue;
          color: darken($pl-blue, 40%);
        }
        &.forward {
          background: $pl-red;
          color: #fff;
        }
      }
    }
  }
  .player-gameweeks-results-container {
    margin: $l 0;
  }
  .player-stat-chart-master-container {
    .stat-selector-container {
      margin: $m 0;
    }
  }
  .stats-container {
    border-bottom: 1px solid $pl-purple;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    padding: $l 0;
    text-align: center;
    text-align: center;

    .stat-item {
      width: 30%;
      margin: $xs;
    }
  }
  .player-stat-chart-master-container {
    margin: $l 0;

    .player-stat-chart-layout {
      margin-top: $m;
    }
  }
</style>