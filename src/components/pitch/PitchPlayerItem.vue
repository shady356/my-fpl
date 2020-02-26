<template>
  <div>
    <div
      class="player" 
      @click="openModal()"
    >
      <img :src="pictureBase + player.code + '.png'">
      <div class="player-score">{{playerScore}}</div>
      <div class="player-name ellipsis">
        {{player.web_name}}
        <span v-if="player.gameweek.is_captain">(C)</span>
        <span v-if="player.gameweek.is_vice_captain">(V)</span>
      </div>

    </div>

    <base-modal 
      v-if="modalStatus"
      @closeModal="closeModal()">
      <template #header>
        Player
      </template>

      <template #content>
        <div class="player-data-grid">

          <!-- Player profile -->
          <div class="player-profile">
            <img class="picture" :src="pictureBase + player.code + '.png'">
            <div class="name">
              <h4 class="first-name">{{player.first_name}}</h4>
              <h3 class="second-name">{{player.second_name}}</h3>
            </div>
          </div>

          <!-- Gameweek stats -->
          <div class="gameweek-stats">
            <h4 class="title letter-spacing">Gameweek {{GW}}</h4>

            <table class="score-breakdown">
              <tr>
                <th class="breakdown letter-spacing small-caps">breakdown</th>
                <th class="value letter-spacing small-caps">value</th>
                <th class="points letter-spacing small-caps">pts</th>
              </tr>
              <tr>
                <td class="breakdown">Minutes</td>
                <td class="value">{{score.minutes}}</td>
                <td class="points">2</td>
              </tr>
              <tr>
                <td class="breakdown">Goals scored</td>
                <td class="value">{{score.goals_scored}}</td>
                <td class="points">5</td>
              </tr>
              <tr>
                <td class="breakdown">Assists</td>
                <td class="value">{{score.assists}}</td>
                <td class="points">4</td>
              </tr>
              <tr>
                <td class="breakdown">Clean sheet</td>
                <td class="value">{{score.clean_sheets}}</td>
                <td class="points">4</td>
              </tr>
              <tr>
                <td class="breakdown">Bonus</td>
                <td class="value">{{score.bonus}}</td>
                <td class="points">3</td>
              </tr>
            </table>

          </div>
        </div>
      </template>
    </base-modal>
  </div>
</template>

<script>
import axios from 'axios'
import BaseModal from '@/components/base/BaseModal.vue'
export default {
  name: 'PitchPlayerItem',
  data() {
    return {
      score: null,
      modalStatus: false,
      localhostBase: 'http://localhost:8080',
      networkBase: 'http://192.168.0.18:8080',
      pictureBase: 'https://platform-static-files.s3.amazonaws.com/premierleague/photos/players/110x140/p'
    }
  },
  components: {
    'base-modal': BaseModal
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
    },
    GW: {
      type: Number,
      required: true,
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
      return !!this.score
    },
    points () {
      if(this.isCaptain || this.isViceCaptain) {
        return this.score.total_points * this.player.gameweek.multiplier || '-'
      }
      return this.score.total_points || '-'
    },
    BASE_URL() {
      return this.networkBase
    },
  },
  watch: {
    GW() {
      this.getPlayerHistoryByPlayerId(this.player.id)
    }
  },
  mounted() {
    this.getPlayerHistoryByPlayerId(this.player.id)
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
    },
    getPlayerHistoryByPlayerId(playerId) {
      
      axios.get(`${this.BASE_URL}/api/element-summary/${playerId}/`)
      .then(response => {
        this.score = response.data.history[this.GW-1]
      })
      .catch(error => {
        console.log(error)
        this.errored = true
      })
    },
    openModal() {
      this.modalStatus = true
    },
    closeModal () {
      console.log('dfdf')
      this.modalStatus = false
    }
  }
}
</script>

<style lang="scss" scoped>

.goalkeeper img { border: 1px solid #F2055C; }
.defender img { border: 1px solid #EAF205; }
.midfielder img { border: 1px solid #05F26C; }
.attacker img { border: 1px solid #07F2F2; }


.player {

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

}

.player-data-grid {

  .player-profile {
    display: flex;
    flex-direction: column;
    align-items: center;

    .picture {
      object-fit: cover;
      object-position: 100% 0%;
      width: 100px;
      height: 90px;
      padding-top: 10px;
      border-radius: 50%;
      background: #1b0119dc;
      margin-bottom: 20px;
    }
    .name {
      .first-name {
        font-weight: 300;
        color: #ccc;
        letter-spacing: 1px;
      }
      .second-name {
        color: #fff;
        font-weight: 300;
        letter-spacing: 1px;
      }
    }
  }

  .gameweek-stats {
    margin-top: 32px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .title {
      font-weight: 300;
      color: #fff;
    }
    table {
      margin-top: 16px;
      text-align: left;
      width: 75%;
      padding: 16px;
      font-size: 1.25rem;

      tr {

        th {
          padding-bottom: 8px;
          font-weight: 400;
          color: #aaa;

          &.value {
            text-align: center;
            //color: #40c1e9;
          }
          &.points {
            text-align: center;
           // color: #05F26C;
          }
        }
        td {
          padding: 4px 0;

          &.breakdown {
            color: #777;
          }
          &.value {
            text-align: center;
            font-weight: 700;
          }
          &.points {
            text-align: center;
            font-weight: 700;
            
          }
        }
      }
    }
  }

}


</style>