<template>
  <div :class="['player', playerPosition]">
    <img
      class="player-image" 
      :src="pictureBase + player.code + '.png'" 
      alt=""
    >
    <div>
      <h6>{{player.first_name}}</h6>
      <h5>{{player.web_name}}</h5>
    </div>
    <div class="player-stats">
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
  name: 'TeamPlayer',
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
      playerPosition: '-',
      pictureBase: 'https://resources.premierleague.com/premierleague/photos/players/110x140/p'
    }
  },
  mounted () {
    this.playerPosition = this.getPlayerPosition()
  },
  methods: {
    getPlayerPosition () {
      switch (this.player.element_type) {
        case 1: return 'goalkeeper'
        case 2: return 'defender';
        case 3: return 'midfielder';
        default: return 'forward';
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.player {
  position: relative;
  display: flex;
  border: 1px solid #222;
  background: #1a1a1a;
  border-radius: $s;
  padding: $m $m 0;
  margin: $m 0;
  border-left: 1px solid transparent;

  &.goalkeeper {
    border-left-color: $pl-yellow;
  }
  &.defender {
    border-left-color: $pl-green;
  }
  &.midfielder {
    border-left-color: $pl-blue;
  }
  &.forward {
    border-left-color: $pl-red;
  }

  .player-image {
    width: 64px;
    margin-right: $m;
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
    font-size: 1rem;
    font-weight: 700;
    text-transform: capitalize;
    margin-top: $s;
    border-radius: $s;
  }
}
</style>