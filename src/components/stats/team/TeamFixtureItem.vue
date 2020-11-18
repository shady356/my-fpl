<template>
  <div class="fixture-container">      
    <div class="gameweek-label">
      GW {{fixture.event}}
    </div>
    <div
      class="team-item"
      v-for="(team,index) in teams"
      :key="index"
    >
      <img class="team-logo" :src="team.badge" alt="">
      <h3 class="team-name">{{team.name}}</h3>
      <h3 class="team-score">{{team.score}}</h3>
    </div>
  </div>
</template>

<script>
import { 
  $getTeamBadgeByTeamCode,
  $getTeamById,
  $getTeamCodeByTeamId } from '@/helpers/teams.js'
export default {
  name: 'TeamFixtureItem',
  props: {
    fixture: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      teams: []
    }
  },
  computed: {
    isGameCancelled () {
      return this.fixture.event === null
    }
  },
  mounted() {
    this.teams = this.getTeams()
  },
  methods: {
    getTeamBadgeByTeamId(id) {
      const code = $getTeamCodeByTeamId(id)
      return $getTeamBadgeByTeamCode(code)
    },
    getTeams () {
      return [
        {
          badge: this.getTeamBadgeByTeamId(this.fixture.team_h),
          score: this.fixture.team_h_score,
          name: $getTeamById(this.fixture.team_h).short_name
        },
        {
          badge: this.getTeamBadgeByTeamId(this.fixture.team_a),
          score: this.fixture.team_a_score,
          name: $getTeamById(this.fixture.team_a).short_name
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.fixture-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(255,255,255,0.2);
  padding: $m;
  border-radius: $s;

  .gameweek-label {
    font-weight: bold;
  }

  .team-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: $s 0;

    .team-logo {
      height: 30px;
      text-align: center;
    }
    .team-name {
      padding: 0 $m 0 $s;
    }
    .team-score {
      text-align: right;
    }
  }
  .score {
    text-align: center;
  }
}
</style>