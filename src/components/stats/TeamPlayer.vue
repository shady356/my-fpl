<template>
  <div>
    <img
      class="player-image" 
      :src="pictureBase + player.code + '.png'" 
      alt=""
    >
    <div>
      <h5>{{player.first_name}}</h5>
      <h4>{{player.web_name}}</h4>
      <div :class="['position-tag', playerPosition]">{{playerPosition}}</div>
    </div>
    <h6>{{player.now_cost | playerCost}}</h6>
    <h6>{{player.form}}</h6>
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
  display: flex;
  border: 1px solid #222;
  background: #1a1a1a;
  border-radius: $s;
  padding: $m $m 0;
  margin: $m 0;

  .player-image {
    width: 64px;
    margin-right: $m;
  }
  .position-tag {
    display: inline-block;
    padding: $xs $s;
    font-size: 1rem;
    font-weight: 700;
    text-transform: capitalize;
    margin-top: $s;
    //border-radius: $s;
    border-left: 2px solid transparent;
    
    &.goalkeeper {
      border-color: $pl-yellow;
      color: #fff;
    }
    &.defender {
      background: $pl-green;
      color: #333;
    }
    &.midfielder {
      background: $pl-blue;
      color: #333;
    }
    &.forward {
      background: $pl-red;
      color: #fff;
    }
  }
}
</style>