<template>
  <div class="player-mini">
    <img
      class="player-image" 
      :src="pictureBase + player.code + '.png'" 
      alt=""
    >
    <div class="player-name">
      <h6 class="first-name">{{player.first_name}}</h6>
      <h5 class="last-name">{{player.web_name}}</h5>
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
    background: $pl-purple;
    border: 1px solid #222;
    border-radius: $s;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: $m;
    text-align: center;

    .player-image {
      width: $xxl;
      height: $xxl;
      object-fit: contain;
      //background: #333;
      border-radius: 50%;
    }
    .player-name {
      margin: $m 0;
      .last-name {
        white-space: nowrap;
      }
    }
    .stat-value {
      color: $pl-green;
    }

  }
</style>