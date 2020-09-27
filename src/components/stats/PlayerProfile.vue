<template>
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
    <!-- Goals / Assists -->
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
</template>

<script>
export default {
  name: 'PlayerProfile',
  props: {
    player: {
      type: Object,
      required: true
    }
  },
  filters: {
    toRank (value) {
      console.log(typeof value)
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
      arrowBackIcon: require('@/assets/icons/arrow_back-24px.svg')
    }
  },
  mounted () {
    this.playerPosition = this.getPlayerPosition()
  },
  methods: {
    getPlayerPosition () {
      switch (this.player.element_type) {
        case 1: return 'goalkeeper'
        case 2: return 'defense';
        case 3: return 'midfielder';
        default: return 'forward';
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .cover {
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid #333;

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
  .stats-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    text-align: center;
    box-sizing: border-box;
    border-bottom: 1px solid #333;
    padding: $l 0;
    text-align: center;

    .stat-item {
      width: 30%;
      margin: $xs;
    }
  }
</style>