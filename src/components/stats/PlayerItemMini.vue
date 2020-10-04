<template>
  <div
    class="player-mini">
    <img
      class="player-image" 
      :src="pictureBase + player.code + '.png'" 
      alt=""
    >
    <div class="player-name">
      <h6 class="first-name">{{player.first_name}}</h6>
      <h4 class="last-name">{{player.web_name}}</h4>
    </div>
    <div class="stat-value">
      <h1>{{statValue}}</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlayerItemMini',
  props: {
    player: {
      type: Object,
      required: true
    },
    statValue: {
      type: [String, Number],
      required: false,
      default: ''
    }
  },
  data () {
    return {
      pictureBase: 'https://resources.premierleague.com/premierleague/photos/players/110x140/p'
    }
  }
}
</script>
<style lang="scss" scoped>
  .player-mini {
    background: #fff;
    box-shadow: 0 5px $s #ddd;
    border-radius: $s;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: $m;
    text-align: center;

    .player-image {
      width: 100px;
      height: 95px;
      padding-top: 5px;
      object-fit: contain;
      object-position: 50% 0%;
      background: #eee;
      border-radius: 50%;
    }
    .player-name {
      margin: $m 0;
      
      .last-name {
        white-space: nowrap;
      }
    }
    .stat-value {
    
    }

  }
</style>