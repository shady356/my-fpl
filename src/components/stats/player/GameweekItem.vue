<template>
  <div>
   <div :class="['node-item', {'active': isActive}]">
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
      v-show="isActive"
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
  </div>
</template>

<script>
export default {
  name: 'GameweekItem',
  props: {
    gameweek: {
      type: Object,
      required: true
    },
    isActive: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  methods: {
    getGameweekResult (gameweek) {
      return gameweek.team_h_score + '-' + gameweek.team_a_score
    }
  }
}
</script>

<style lang="scss" scoped>

  .node-item {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .node-circle {
      background: #222;
      border-radius: 50%;
      border: 1px solid #aaa;
      height: 20px;
      line-height: 20px;
      margin-left: -10px;
      text-align: center;
      width: 20px;
    }
    .gameweek-result {
      display: flex;
      width: 30%;
    }
    .gameweek-points {
      width: 12%;
      text-align: right;
    }

    &.active {
      color: $pl-yellow;
      font-weight: 700;

      .node-circle {
        border-color: $pl-yellow;
      }
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
</style>