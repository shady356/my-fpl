<template>
  <tr>
    <td class="freeze">{{ team.name }}</td>
    <td v-for="fixture in filteredFixtures" :key="fixture.id">
      <TeamFixturesOverviewTeamOpponent :ratingType="ratingType"
        :opponent="findTeamOpponent(fixture, team)" />
    </td>
  </tr>
</template>

<script>
import {
  $getTeamById,
  //$getTeamPlayersByTeamCode,
  //$getTeamBadgeByTeamCode,
  $getFixturesByTeamId,
  //$getTeamColorByTeamCode
} from '@/helpers/teams.js'

import TeamFixturesOverviewTeamOpponent from '@/components/stats/team/TeamFixturesOverviewTeamOpponent.vue'
export default {
  components: {
    TeamFixturesOverviewTeamOpponent
  },
  props: {
    team: {
      type: Object,
      required: true
    },
    currentGameWeek: {
      type: Number,
      required: true,
    },
    ratingType: {
      type: String,
      required: false,
      default: 'totalRounded'
    }
  },
  data() {
    return {
      fixtures: []
    }
  },
  created() {
    this.fixtures = $getFixturesByTeamId(this.team.id)
  },
  computed: {
    filteredFixtures() {
      return this.fixtures.filter(fixture => fixture.event >= this.currentGameWeek)
    }
  },
  methods: {
    findTeamOpponent(fixture, team) {
      const opponentId = fixture.team_h === team.id ? fixture.team_a : fixture.team_h
      return $getTeamById(opponentId)
    }
  }
}
</script>

<style lang="scss" scoped>
td {
  border: 8px solid #fff;
  border-radius: 8px;
}

.freeze {
  position: sticky;
  background: #fff;
  left: 0;
  top: 68px;
  z-index: 1;
}
</style>