<template>
  <div>
    <div
      :class="['player', playerType]"
      @click="openModal()"
    >
      <img
        :src="pictureBase + player.code + '.png'"
      >
      <div class="player-name ellipsis">
        {{player.web_name}}
      </div>
      <div class="player-score">
        {{playerScore}}
      </div>
      <div
        v-if="player.gameweek.is_captain"
        class="captain-badge" 
      >
        C
      </div>
      <div
        v-if="player.gameweek.is_vice_captain"
        class="viceCaptain-badge"
      >
        V
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
            <img 
              class="picture"
              :src="pictureBase + player.code + '.png'"
            >
            <div class="name">
              <h5 class="first-name letter-spacing">{{player.first_name}}</h5>
              <h3 class="second-name letter-spacing">{{player.second_name}}</h3>
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
  data() {
    return {
      score: null,
      modalStatus: false,
      playerType: '',
      localhostBase: process.env.VUE_APP_FPL_API_URL,
      pictureBase: 'https://resources.premierleague.com/premierleague/photos/players/110x140/p'
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
      return this.localhostBase
    },
  },
  watch: {
    GW() {
      this.getPlayerHistoryByPlayerId(this.player.id)
    }
  },
  mounted() {
    this.getPlayerHistoryByPlayerId(this.player.id)
    this.playerType = this.getPlayerPosition(this.player.element_type)
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
    getPlayerPosition (playerType) {
      switch (playerType) {
        case 1: return 'goalkeeper' 
        case 2: return 'defender' 
        case 3: return 'midfielder' 
        case 4: return 'forward' 
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
      this.modalStatus = false
    }
  }
}
</script>

<style lang="scss" scoped>

.player {
  position: relative;
  padding: $s;
  border-radius: $s;

/*   &.goalkeeper { border-bottom: 2px solid $pl-yellow; }
  &.defender   { border-bottom: 2px solid $pl-green; }
  &.midfielder { border-bottom: 2px solid $pl-blue; }
  &.forward    { border-bottom: 2px solid $pl-red; } */

  img {
    width: 50px;
    height: 50px;
    object-fit: cover;
    object-position: 50% 0%;
  }
  .player-name {
    font-weight: 400;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 0.8rem;
    margin-bottom: 4px;
    color: $pl-purple;
  }
  .player-score {
    font-weight: 700;
    font-size: 1.25rem;
    color: $pl-purple;
  }
  .captain-badge, .viceCaptain-badge {
    position: absolute;
    top: 0;
    right: $s;
    line-height: 10px;
    text-align: center;
    font-weight: 700;
    color: #fff;
    width: 10px;
    height: 10px;
    padding: $s;
    border-radius: 50%;
  }
  .captain-badge {
    background: $pl-red;
  }
  .viceCaptain-badge {
    background: $pl-purple;
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
      margin-bottom: 16px;
    }
    .name {
      .first-name {
        color: #ccc;
      }
      .second-name {
        color: #fff;
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
      font-size: 1.15rem;

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