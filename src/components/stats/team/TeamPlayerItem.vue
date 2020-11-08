<template>
  <div class="player">
    <img
      class="player-image" 
      :src="pictureBase + player.code + '.png'" 
      alt=""
    >
    <div class="player-name">
      <h6 class="first-name">{{player.first_name}}</h6>
      <h5 class="last-name">{{player.web_name}}</h5>
      <h4 :class="['position-tag', playerPosition]">{{playerPosition}}</h4>
    </div>
    <div 
      class="player-stats"
    >
      <h6 :class="['cost', costChange]">
        {{player.now_cost | playerCost}}m
      </h6>
      <h6>{{player.selected_by_percent}}%</h6>
      <h4>{{player.total_points}} pts</h4>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TeamPlayerItem',
  props: {
    player: {
      type: Object,
      required: true
    }
  },
  filters: {
    playerCost(value) {
      return '£' + (value / 10).toFixed(1) 
    }
  },
  computed: {
    costChange () {
      const costChange = this.player.cost_change_event
      if (costChange > 0) {
        return 'green' 
      } else if (costChange < 0) {
        return 'red'
      } else {
        return ''
      }
    }
  },
  data() {
    return {
      playerPosition: null,
      pictureBase: 'https://resources.premierleague.com/premierleague/photos/players/110x140/p'
    }
  },
  mounted () {
    this.playerPosition = this.getPlayerPosition()
  },
  methods: {
    getPlayerPosition () {
      switch (this.player.element_type) {
        case 1: return 'gk'
        case 2: return 'def';
        case 3: return 'mid';
        default: return 'fwd';
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.player {
  background: #fff;
  border-left: 1px solid transparent;
  border-radius: $s;
  box-shadow: 0 5px $s #ddd;
  display: flex;
  margin: $m 0;
  padding: $m $m 0;
  position: relative;

  .player-image {
    width: 64px;
    margin-right: $m;
  }
  .player-name {
    .first-name {
      font-size: 0.9rem;
    }
  }
  .player-stats {
    position: absolute;
    display: flex;
    flex-direction: column;
    text-align: right;
    right: $m;
    bottom: $s;

    .cost {
      &.green {
        color: $pl-green;
      }
      &.red {
        color: $pl-red;
      }
    }

    h6 {
      padding: $s 0;
    }
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

    &.gk {
      background: $pl-yellow;
      color: darken($pl-yellow, 40%);
    }
    &.def {
      background: $pl-green;
      color: darken($pl-green, 40%);
    }
    &.mid {
      background: $pl-blue;
      color: darken($pl-blue, 40%);
    }
    &.fwd {
      background: $pl-red;
      color: #fff;
    }
  }
}
</style>