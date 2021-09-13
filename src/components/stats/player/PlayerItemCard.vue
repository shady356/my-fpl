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
    <!-- <img
      class="team-logo"
      :src="teamBadge"
      alt=""
    > -->
    <img
      class="player-image" 
      :src="pictureBase + player.code + '.png'"
      alt=""
    >
  </div>
</template>

<script>
export default {
  name: 'PlayerItemCard',
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
    },
    teamBadge () {
      return `https://fantasy.premierleague.com/dist/img/badges/badge_${this.player.team_code}_80.png#/`
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
    align-items: center;
    background: #ddd;
    border-radius: $s;
    //box-shadow: 0 0 $s #bbc;
    //border: 1px solid #ccd;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;

    .team-logo {
      position: absolute;
      bottom: 0;
      right: 0;
      width: $l;
      border-radius: $s 0 $s 0;
      background: #fff;
      padding: $xs;
    }

    .player-image {
      border-radius: $m;
      height: 116px;
      object-fit: cover;
      object-position: 50% 0%;
      width: 130px;
    }

    .text-container {
      display: flex;
      justify-content: flex-start;
      padding: $m 0;

      .stat-value {
        padding: 0 $xs;
        color: #111;
      }

      .player-name {
        padding: 0 $s;

        .first-name {
          line-height: 10px;
          margin-top: 8px;
          color: #222;
        }
        .last-name {
          white-space: nowrap;
          font-weight: 700;
          color: #333;
        }
      }
    }
  }
</style>