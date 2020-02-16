<template>
  <div>
    <img :src="pictureBase + player.code + '.png'">
    <div class="player-score">{{playerScore}}</div>
    <div class="player-name">
      {{player.web_name}}
      <span v-if="isCaptain">(C)</span>
      <span v-if="isViceCaptain">(V)</span>
    </div>
    <div class="tooltip">
      <ul>
        <li>Assists: 1</li>
        <li>Goals scored: 2</li>
      </ul>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'PitchPlayerItem',
  data() {
    return {
      pictureBase: 'https://platform-static-files.s3.amazonaws.com/premierleague/photos/players/110x140/p'
    }
  },
  props: {
    player: {
      type: Object,
      required: true
    }
  },
  computed: {
    playerScore() {
      if(this.hasScore) {
        return this.points
      } else {
        return '-'
      }
    },
    isCaptain () {
      return this.player.gameweek.is_captain
    },
    isViceCaptain () {
      return this.player.gameweek.is_vice_captain
    },
    hasScore () {
      return !!this.player.gameweek.score
    },
    points () {
      return this.player.gameweek.score.total_points * this.player.gameweek.multiplier || '-'
    }
  }
}
</script>

<style scoped>

.goalkeeper img { border: 1px solid #F2055C; }
.defender img { border: 1px solid #EAF205; }
.midfielder img { border: 1px solid #05F26C; }
.attacker img { border: 1px solid #07F2F2; }


img {
  border-radius: 50%;
  width: 50px;
  height: 45px;
  object-fit: cover;
  object-position: 50% 0%;
  padding-top: 5px;
  margin-bottom: 5px;
  background: hsla(0, 0%, 20%, 0.75);
}

.player-name {
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 10px;
  margin-bottom: 4px;
  font-family: 'Roboto Condensed';
}
.player-score {
  font-weight: 700;
  font-size: 18px;
  text-transform: uppercase;
  color: #aaa;
  font-family: 'Roboto Condensed';
  color: #333;
}

.tooltip {
  background: #000;
  color: #ddd;
  font-size: 10px;
  padding: 10px;
  position: absolute;
  text-align: left;

}
</style>