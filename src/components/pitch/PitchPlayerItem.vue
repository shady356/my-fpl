<template>
  <div>
    <img :src="pictureBase + player.code + '.png'">
    <div class="player-score">{{playerScore}}</div>
    <div class="player-name">
      {{player.web_name}}
      <span v-if="isCaptain">(C)</span>
      <span v-if="isViceCaptain">(V)</span>
    </div>

    <base-tooltip
      v-if="tooltip && hasScore"
    >
      <ul class="stats-list">
        <li>Goals scored: {{score.goals_scored}}</li>
        <li>Assists: {{score.assists}}</li>
        <li>Minutes played: {{score.minutes}}</li>
        <li>Clean Sheet: {{score.clean_sheets}}</li>
        <li>Bonus: {{score.bonus}}</li>
      </ul>
      
    </base-tooltip>
    
  </div>
</template>

<script>
import BaseTooltip from '@/components/base/BaseTooltip.vue'
export default {
  name: 'PitchPlayerItem',
  data() {
    return {
      pictureBase: 'https://platform-static-files.s3.amazonaws.com/premierleague/photos/players/110x140/p'
    }
  },
  components: {
    'base-tooltip': BaseTooltip
  },
  props: {
    player: {
      type: Object,
      required: true
    },
    tooltip: {
      type: Boolean,
      required: false,
      default: false
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
    score () {
      return this.player.gameweek.score
    },
    points () {
      if(this.isCaptain || this.isViceCaptain) {
        return this.player.gameweek.score.total_points * this.player.gameweek.multiplier || '-'
      }
      return this.player.gameweek.score.total_points || '-'
    }
  },
  methods: {
    getStats () {
      return {
        assists: this.score.assists,
        bonus: this.score.bonus,
        goalsScorder: this.score.goals_scored,
        minutes: this.score.minutes,
        cleanSheet: this.score.clean_sheets
      }
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
}

.stats-list li {
  padding: 4px;
}

</style>