<template>
  <div v-if="isDataLoaded">
    <section class="section">
      <h2>Team stats</h2>
      <table>
        <thead>
          <th>#</th>
          <th>Team</th>
          <th>Games</th>
          <!--     <th>Pts</th> -->
          <th>xPts</th>
          <th>G</th>
          <th>xG</th>
          <th>GA</th>
          <th>xGA</th>
          <!--           <th>points</th>
          <th>attack</th>
          <th>defense</th>
          <th>total</th> -->
        </thead>
        <tbody>
          <tr v-for="team in teams" :key="team.id">
            <td>{{ team.id }}</td>
            <td>{{ team.name }}</td>
            <td>{{ team.stats.played }}</td>
            <!--  <td>{{ team.stats.pts }}</td> -->
            <td>{{ team.stats.xpts }}</td>
            <td>{{ team.stats.goals }}</td>
            <td>{{ team.stats.xg }}</td>
            <td>{{ team.stats.ga }}</td>
            <td>{{ team.stats.xga }}</td>
            <!--             <td>{{ team.stats.rating.points }}</td>
            <td>{{ team.stats.rating.attack }}</td>
            <td>{{ team.stats.rating.defense }}</td>
            <td>{{ team.stats.rating.total }}</td> -->
          </tr>
        </tbody>
      </table>
      <h2>Teams</h2>
      <ul class="team-grid-list">
        <router-link v-for="team in teams" :key="team.id" tag="li"
          class="team-item"
          :to="{ name: 'teamPage', params: { teamId: team.id } }">
          team code:{{ team.code }}
          team id:{{ team.id }}
          <TeamItemCard :team="team" />
        </router-link>
      </ul>
    </section>
  </div>
</template>

<script>
import TeamItemCard from '@/components/stats/team/TeamItemCard.vue'
import { $getStats } from '../../helpers/teams';
export default {
  name: 'StatsTeamsPage',
  components: {
    TeamItemCard
  },
  data() {
    return {
      isDataLoaded: false,
      teams: this.$store.state.bootstrap.teams
    }
  },
  mounted() {
    const data = $getStats(23)

    data.forEach((team, index) => {
      this.teams[index].stats = team
    })
    this.isDataLoaded = true
  },
  methods: {
    getTeamRating(stats) {
      const ptsBest = 12
      // const ptsWorst = 0
      const xPtsBest = 9.76
      // const xPtsWorst = 1.53
      const gBest = 12
      //const gWorst = 2
      const xGBest = 10.22
      //const xGWorst = 2.61
      const gABest = 2
      //const gAWorst = 11
      const xGaBest = 2.79
      //const xGaWorst = 11.29

      const ptsScore = Math.round(((ptsBest / 5) * (stats.pts / 5) || 1))
      const xPtsScore = Math.round(((xPtsBest / 5) * (stats.xPts / 5) || 1))

      const attackScore = Math.round(((gBest / 5) * (stats.g / 5) || 1))
      const xAttackScore = Math.round(((xGBest / 5) * (stats.xG / 5) || 1))

      const defenseScore = Math.round(((gABest * 5) / stats.ga))
      const xDefenseScore = Math.round(((xGaBest * 5) / stats.xGa))

      const points = (ptsScore + xPtsScore) / 2
      const attack = (attackScore + xAttackScore) / 2
      const defense = (defenseScore + xDefenseScore) / 2

      return {
        points: points,
        attack: attack,
        defense: defense,
        total: Math.round(((points + attack + defense) / 3))
      }
    }
  }
}
</script>

<style lang="scss" scoped>
table {
  width: 100%;

  th {
    text-align: left;
  }

  tr {

    &:nth-child(odd) {
      background: #eee;
    }
  }

  td {
    padding: 4px;
  }
}

.section {
  margin: $l 0;

  .team-grid-list {
    display: flex;
    flex-wrap: wrap;
    padding: $s 0;

    .team-item {
      width: 30%;
      margin: 1.5%;
    }
  }
}
</style>