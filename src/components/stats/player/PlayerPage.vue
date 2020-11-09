<template>
  <div>
    <BaseModalCard>
      <div class="default-page-margin">
        <div class="cover">
          <router-link :to="{name: 'stats'}">
            <img
              :src="arrowBackIcon" 
              alt="Go back: teams"
            >
          </router-link>
          <div class="player">
            <img
              class="player-image" 
              :src="pictureBase + player.code + '.png'" 
              alt="player image"
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
        <div class="player-stat-chart-master-container">
          <div class="stat-selector-container">
            <select
              class="dropdown"
              name="select-stat-list"
              v-model="selectedChartStat"
              @change="selectChartStat(selectedChartStat)"
            >
              <option value="goals_scored">Goals scored</option>
              <option value="minutes">Minutes</option>
              <option value="assists">Assists</option>
              <option value="value">Value</option>
              <option value="saves">Saves</option>
            </select>
          </div>
          <PlayerStatsChartController
            v-if="playerSummary"
            class="player-stat-chart-layout"
            :playerChartData="playerChartData"
            :playerSummary="playerSummary"
          />
        </div>
        <div>
          <!-- Cost / Selection / tot points -->
          <div class="stats-container">
            <div class="stat-item">
              <h6>Value</h6>
              <h1>{{player.now_cost | playerCost}}</h1>
            </div>
            <div class="stat-item">
              <h6>Selected By</h6>
              <h1>{{player.selected_by_percent}}%</h1>
            </div>
            <div class="stat-item">
              <h6>Total Points</h6>
              <h1>{{player.total_points}}</h1>
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
              <h4>ICT Index</h4>
              <h1>{{player.ict_index}}</h1>
            </div>
            <div class="stat-item">
              <h4>Rank</h4>
              <h1>{{player.ict_index_rank | toRank}}</h1>
            </div>
          </div>
          <!-- Goals / Assists -->
          <div class="stats-container">
            <div class="stat-item">
              <h4>Goals</h4>
              <h1>{{player.goals_scored}}</h1>
            </div>
            <div class="stat-item">
              <h4>Assists</h4>
              <h1>{{player.assists}}</h1>
            </div>
          </div>
          <!-- Clean sheets -->
          <div class="stats-container">
            <div class="stat-item">
              <h4>Clean sheets</h4>
              <h1>{{player.clean_sheets}}</h1>
            </div>
          </div>
        </div>
      </div>
    </BaseModalCard>
  </div>
</template>

<script>
import axios from "axios";
import BaseModalCard from '@/components/base/BaseModalCard.vue'
import PlayerStatsChartController from '@/components/stats/player/PlayerStatsChartController.vue'
export default {
  name: 'PlayerPage',
  components: {
    BaseModalCard,
    PlayerStatsChartController
  },
  props: {
    player: {
      type: Object,
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
      playerPosition: null,
      pictureBase: 'https://resources.premierleague.com/premierleague/photos/players/110x140/p',
      arrowBackIcon: require('@/assets/icons/arrow_back-24px.svg'),
      BASE_URL: process.env.VUE_APP_FPL_API_URL,
      
      playerSummary: null,
      playerChartData: {
        key: 'goals_scored',
        min: 0,
        stepSize: 1
      },
      selectedChartStat: 'goals_scored'
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
    this.getPlayerSummary(this.player.id)
    this.playerPosition = this.getPlayerPosition()
    this.selectChartStat(this.selectedChartStat)
  },
  methods: {
    getPlayerPosition () {
      switch (this.player.element_type) {
        case 1: return 'goalkeeper'
        case 2: return 'defense';
        case 3: return 'midfielder';
        default: return 'forward';
      }
    },
    getPlayerSummary (id) {
      axios
        .get(`${this.BASE_URL}api/element-summary/${id}/`)
        .then((response) => {
          this.playerSummary = response.data;
        })
        .catch((error) => {
          console.log(error);
          // this.errored = true;
        });
    },
    selectChartStat(statName) {
      switch(statName) {
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
    }
  }
}
</script>

<style lang="scss" scoped>
  .cover {
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid #33333366;

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
  .player-stat-chart-master-container {
    .stat-selector-container {
      display: flex;
      justify-content: center;
      margin: $l 0;
      
      .dropdown {
        font-size: 1.5rem;
        background: none;
        border: none;
        color: #fff;
        text-align: right;
        font-weight: 700;
      }
    }
  }
  .stats-container {
    border-bottom: 1px solid $pl-blue;
    box-sizing: border-box;
    color: $pl-blue;
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