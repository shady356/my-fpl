<template>
  <div>
    <div class="list-headers">
      <h6>GW</h6>
      <h6>Result</h6>
      <h6>Value</h6>
      <h6>Points</h6>
    </div>
    <ul class="gameweek-list">
      <li
        :class="['gameweek-item', {'active': isGameweekActive(index)}]"
        v-for="(gameweek, index) in playerSummary.history"
        :key="gameweek.round"
        @click="selectGameweek(index)"
      >
        <div class="node-item">
          <div class="node-circle">
            {{ gameweek.round }}
          </div>
          <div class="gameweek-result">
            <div>Home</div>
            <div>{{ getGameweekResult(gameweek) }}</div>
            <div>Away</div>
          </div>
          <div>
            £{{(gameweek.value / 10).toFixed(1)}}m
          </div>
          <div class="gameweek-points">
            {{gameweek.total_points}} pts
          </div>
        </div>
        <div
          v-show="isGameweekActive(index)"
          class="node-data"
        >
          <table class="score-breakdown">
            <tr>
              <th class="breakdown letter-spacing small-caps">breakdown</th>
              <th class="value letter-spacing small-caps">value</th>
              <th class="points letter-spacing small-caps">pts</th>
            </tr>
            <tr>
              <td class="breakdown">Minutes</td>
              <td class="value">{{gameweek.minutes}}</td>
              <td class="points">2</td>
            </tr>
            <tr>
              <td class="breakdown">Goals scored</td>
              <td class="value">{{gameweek.goals_scored}}</td>
              <td class="points">5</td>
            </tr>
            <tr>
              <td class="breakdown">Assists</td>
              <td class="value">{{gameweek.assists}}</td>
              <td class="points">4</td>
            </tr>
            <tr>
              <td class="breakdown">Clean sheet</td>
              <td class="value">{{gameweek.clean_sheets}}</td>
              <td class="points">4</td>
            </tr>
            <tr>
              <td class="breakdown">Bonus</td>
              <td class="value">{{gameweek.bonus}}</td>
              <td class="points">{{gameweek.bonus}}</td>
            </tr>
          </table>
        </div>

      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'PlayerGameWeeksResults',
  props: {
    playerSummary: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      activeGameweek: null
    }
  },
  methods: {
    isGameweekActive(index) {
      return index === this.activeGameweek
    },
    selectGameweek (index) {
      this.activeGameweek = index
    },
    getGameweekResult (gameweek) {
      return gameweek.team_h_score + '-' + gameweek.team_a_score
    }
  }
}
</script>

<style lang="scss" scoped>
  .list-headers {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0px;
    padding: $m 0;
    background: #222;
    border-bottom: 1px solid #aaa;
  }
  .gameweek-list {
    border-left: 1px solid #aaa;
    margin-left: 10px;
    
    .gameweek-item {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      padding: $m 0;

      .node-item {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .node-circle {
          background: #222;
          border-radius: 50%;
          border: 1px solid #aaa;
          height: 20px;
          margin-left: -10px;
          width: 20px;
          text-align: center;
          line-height: 20px;
        }
        .gameweek-result {
          display: flex;
          width: 30%;
        }
        .gameweek-points {
          width: 12%;
          text-align: right;
        }
      }
      .node-data {
        color: #fff;
        padding: 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        table {
          text-align: left;
          width: 100%;
          padding: 0 16px;
          font-size: 1.15rem;

          tr {
            th {
              padding-bottom: 8px;
              font-weight: 400;
              color: #ddd;

              &.value {
                text-align: center;
              }
              &.points {
                text-align: center;
              }
            }
            td {
              padding: 4px 0;

              &.breakdown {
                color: #aaa;
              }
              &.value {
                text-align: center;
                font-weight: 700;
              }
              &.points {
                text-align: center;
                font-weight: 700;
                color: #eee;
              }
            }
          }
        }
      }
      &.active {
        color: $pl-yellow;
        font-weight: 700;

        .node-circle {
          border-color: $pl-yellow;
        }
      }
    }
  }
</style>