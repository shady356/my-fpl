<template>
  <div
    class="player-mini"
  >
    <div class="text-container">
      <div class="stat-value">
        <h1>{{statValue}}</h1>
      </div>
      <div class="player-name">
        <h6 class="first-name">{{player.first_name}}</h6>
        <h4 class="last-name">{{player.web_name}}</h4>
      </div>
    </div>
    <img
      class="player-image" 
      :src="pictureBase + player.code + '.png'" 
      alt=""
    >
  </div>
</template>

<script>
export default {
  name: 'PlayerItemMini',
  filters: {
    firstChar(value) {
      return value.charAt(0) + '.'
    }
  },
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
  computed: {
    playerImage () {
      return this.pictureBase + this.player.code + '.png'
    }
  },
  data () {
    return {
      pictureBase: 'https://resources.premierleague.com/premierleague/photos/players/110x140/p'
      //resources.premierleague.com/premierleague/photos/players/110x140/p101668.png
    }
  }
}
</script>
<style lang="scss" scoped>
  .player-mini {
    box-shadow: 0 5px $s #ddd;
    border-radius: $m;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: linear-gradient($pl-blue);

    .player-image {
      width: 150px;
      height: 116px;
      border-radius: $m;
      object-fit:cover;
      object-position: 50% 0%;
    }

    .text-container {
      display: flex;
      padding: $m;

      .stat-value {
        margin-right: $m;
        h1{

          font-weight: 700;
          color: $pl-purple;
        }
      }

      .player-name {
        .first-name {
          color: $pl-purple;
          line-height: 8px;
          margin-top: 8px;
        }
        .last-name {
          white-space: nowrap;
          font-weight: 700;
          color: $pl-purple;
        }
      }
    }
  }
</style>