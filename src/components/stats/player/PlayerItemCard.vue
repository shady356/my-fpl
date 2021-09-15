<template>
  <div
    class="player-item"
  >
    <div class="left-content">
      <img
        class="player-image"
        :src="pictureBase + player.code + '.png'"
        alt=""
      >
      <!-- <img
        class="team-logo"
        :src="teamBadge"
        alt=""
      > -->
      <div class="player-name">
        <p class="first-name">{{player.first_name}}</p>
        <p class="last-name">{{player.web_name}}</p>
      </div>
    </div>

    <div class="stat-value">
      <h3>{{statValue}}</h3>
    </div>
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
    index: {
      type: Number,
      required: false,
      default: 0
    },
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
    },
  },
  data () {
    return {
      pictureBase: 'https://resources.premierleague.com/premierleague/photos/players/110x140/p'
    }
  }
}
</script>
<style lang="scss" scoped>
  .player-item {
    background: #fff;
    box-shadow: 0 0 40px #ddd;
    border-radius: $m;
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    .left-content {
      display: flex;
      align-items: center;
      .player-image {
        border-radius: $m;
        height: $xl;
        width: $xl;
        object-fit: cover;
        object-position: 50% 0%;
        margin: $s $s 0;
      }
      .team-logo {
        width: $l;
        border-radius: $s 0 $s 0;
        background: #fff;
        padding: $xs;
      }
      .player-name {
        margin: 0 $s;
        text-align: left;

        .first-name {
          line-height: 10px;
          color: #666;
        }
        .last-name {
          font-weight: 700;
          color: #333;
          font-size: 1.3rem;
        }
      }
    }
    .stat-value {
      margin: 0 $m;
      color: #111;
    }

  }
</style>