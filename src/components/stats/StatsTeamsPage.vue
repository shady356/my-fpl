<template>
  <div v-if="isDataLoaded">
    <section class="section">

      <h2>Team fixtures</h2>
      <TeamFixturesOverview :teams="teams" style="margin-bottom: 40px;"
        ratingType="totalRounded" />

      <h2>Team stats</h2>
      <table>
        <thead>
          <th class="number" :class="{ 'sorted': isSortKey('id') }"
            @click="setTeamsSort('id')">#</th>

          <th :class="{ 'sorted': isSortKey('name') }"
            @click="setTeamsSort('name')">Team</th>

          <th class="number" :class="{ 'sorted': isSortKey('stats.played') }"
            @click="setTeamsSort('stats.played')">Games
          </th>

          <!-- Rating -->
          <th class="number" :class="{ 'sorted': isSortKey('rating.points') }"
            @click="setTeamsSort('rating.points')">pts r
          </th>

          <th class="number" :class="{ 'sorted': isSortKey('rating.attack') }"
            @click="setTeamsSort('rating.attack')">attk r
          </th>

          <th class="number" :class="{ 'sorted': isSortKey('rating.defense') }"
            @click="setTeamsSort('rating.defense')">def r
          </th>

          <th class="number" :class="{ 'sorted': isSortKey('rating.total') }"
            @click="setTeamsSort('rating.total')">Rating
          </th>
          <th class="number"
            :class="{ 'sorted': isSortKey('rating.totalRounded') }"
            @click="setTeamsSort('rating.totalRounded')">RatingRounded
          </th>
          <!-- End: Rating -->

          <th class="number" :class="{ 'sorted': isSortKey('stats.pts') }"
            @click="setTeamsSort('stats.pts')">Points</th>

          <th class="number" :class="{ 'sorted': isSortKey('stats.xpts') }"
            @click="setTeamsSort('stats.xpts')">xPts</th>

          <th class="number" :class="{ 'sorted': isSortKey('stats.goals') }"
            @click="setTeamsSort('stats.goals')">Goals</th>

          <th class="number" :class="{ 'sorted': isSortKey('stats.xg') }"
            @click="setTeamsSort('stats.xg')">xG</th>

          <th class="number" :class="{ 'sorted': isSortKey('stats.ga') }"
            @click="setTeamsSort('stats.ga')">Goals a
          </th>

          <th class="number" :class="{ 'sorted': isSortKey('stats.xga') }"
            @click="setTeamsSort('stats.xga')">
            xGA</th>

          <th class="number" :class="{ 'sorted': isSortKey('stats.shots') }"
            @click="setTeamsSort('stats.shots')">
            Shots</th>

          <th class="number" :class="{ 'sorted': isSortKey('stats.sot') }"
            @click="setTeamsSort('stats.sot')">
            Shots target</th>

          <th class="number" :class="{ 'sorted': isSortKey('stats.sa') }"
            @click="setTeamsSort('stats.sa')">
            Shots a</th>

          <th class="number" :class="{ 'sorted': isSortKey('stats.sota') }"
            @click="setTeamsSort('stats.sota')">
            Shots target a</th>

          <th class="number" :class="{ 'sorted': isSortKey('stats.deep_avg') }"
            @click="setTeamsSort('stats.deep_avg')">
            Deep average</th>

          <th class="number" :class="{ 'sorted': isSortKey('stats.ppda_avg') }"
            @click="setTeamsSort('stats.ppda_avg')">
            PPDA average</th>
          <!--           <th>points</th>
          <th>attack</th>
          <th>defense</th>
          <th>total</th> -->
        </thead>
        <tbody>
          <tr v-for="team in sortedTeams" :key="team.id">
            <td class="number">{{ team.id }}</td>
            <td>{{ team.name }}</td>
            <td class="number">{{ team.stats.played }}</td>
            <td class="number">{{ team.rating.points }}</td>
            <td class="number">{{ team.rating.attack }}</td>
            <td class="number">{{ team.rating.defense }}</td>
            <td class="number">{{ team.rating.total }}</td>
            <td class="number">{{ team.rating.totalRounded }}</td>
            <td class="number">{{ team.stats.pts }}</td>
            <td class="number">{{ team.stats.xpts }}</td>
            <td class="number">{{ team.stats.goals }}</td>
            <td class="number">{{ team.stats.xg }}</td>
            <td class="number">{{ team.stats.ga }}</td>
            <td class="number">{{ team.stats.xga }}</td>
            <td class="number">{{ team.stats.shots }}</td>
            <td class="number">{{ team.stats.sot }}</td>
            <td class="number">{{ team.stats.sa }}</td>
            <td class="number">{{ team.stats.sota }}</td>
            <td class="number">{{ team.stats.deep_avg }}</td>
            <td class="number">{{ team.stats.ppda_avg }}</td>
          </tr>
        </tbody>
      </table>

      <h2>Teams</h2>
      <ul class="team-grid-list">
        <router-link v-for="team in teams" :key="team.id" tag="li"
          class="team-item"
          :to="{ name: 'teamPage', params: { teamId: team.id } }">
          <TeamItemCard :team="team" />
        </router-link>
      </ul>
    </section>
  </div>
</template>

<script>
import TeamItemCard from '@/components/stats/team/TeamItemCard.vue'
import TeamFixturesOverview from '@/components/stats/team/TeamFixturesOverview.vue'
import { $getStats } from '../../helpers/teams';
import orderBy from "lodash/orderBy";
import { round } from '@/helpers/numbers'

export default {
  name: 'StatsTeamsPage',
  components: {
    TeamFixturesOverview,
    TeamItemCard,
  },
  data() {
    return {
      isDataLoaded: false,
      teams: this.$store.state.bootstrap.teams,
      sortKey: 'stats.goals',
      orderDirection: 'desc',
    }
  },
  computed: {
    sortedTeams() {
      return orderBy(this.teams, this.sortKey, this.orderDirection)
    },
  },
  mounted() {
    const data = $getStats(23)

    const extremum = {}

    extremum.ptsMax = Math.max(...data.map(o => o.pts))
    extremum.ptsMin = Math.min(...data.map(o => o.pts))
    extremum.xPtsMax = Math.max(...data.map(o => o.xpts))
    extremum.xPtsMin = Math.min(...data.map(o => o.xpts))
    extremum.gMax = Math.max(...data.map(o => o.goals))
    extremum.gMin = Math.min(...data.map(o => o.goals))
    extremum.xGMax = Math.max(...data.map(o => o.xg))
    extremum.xGMin = Math.min(...data.map(o => o.xg))
    extremum.gAMax = Math.max(...data.map(o => o.ga))
    extremum.gAMin = Math.min(...data.map(o => o.ga))
    extremum.xGaMax = Math.max(...data.map(o => o.xga))
    extremum.xGaMin = Math.min(...data.map(o => o.xga))

    data.forEach((teamStats, index) => {
      this.teams[index].stats = teamStats
      this.teams[index].rating = this.calcTeamRating(teamStats, extremum, false)
    })

    extremum.totalMax = Math.max(...this.teams.map(o => o.rating.totalCrude))
    extremum.totalMin = Math.min(...this.teams.map(o => o.rating.totalCrude))

    this.teams.forEach((team) => {
      team.rating.total = this.calcTeamRatingTotalRounded(team.rating.totalCrude, extremum.totalMax, extremum.totalMin, 2)
      team.rating.totalRounded = this.calcTeamRatingTotalRounded(team.rating.totalCrude, extremum.totalMax, extremum.totalMin)
      team.rating.totalRounded = this.reviseTotalRating(team.rating.total)
    })

    this.isDataLoaded = true
  },
  methods: {
    calcTeamRating(stats, extremum, expectedOnly = false) {
      const ptsMax = extremum.ptsMax
      const ptsMin = extremum.ptsMin
      const xPtsMax = extremum.xPtsMax
      const xPtsMin = extremum.xPtsMin
      const gMax = extremum.gMax
      const gMin = extremum.gMin
      const xGMax = extremum.xGMax
      const xGMin = extremum.xGMin
      const gAMax = extremum.gAMax
      const gAMin = extremum.gAMin
      const xGaMax = extremum.xGaMax
      const xGaMin = extremum.xGaMin

      let points, attack, defense = 0

      if (expectedOnly) {
        points = this.calcRating(
          xPtsMax,
          xPtsMin,
          stats.xpts
        )
        attack = this.calcRating(
          xGMax,
          xGMin,
          stats.xg
        )
        defense = this.calcRating(
          xGaMax,
          xGaMin,
          stats.xga,
          true
        )
      } else {
        points = this.calcRating(
          round(ptsMax + xPtsMax, 2),
          round(ptsMin + xPtsMin, 2),
          round(stats.pts + stats.xpts, 2)
        )
        attack = this.calcRating(
          round(gMax + xGMax, 2),
          round(gMin + xGMin, 2),
          round(stats.goals + stats.xg, 2)
        )
        defense = this.calcRating(
          round(gAMax + xGaMax, 2),
          round(gAMin + xGaMin, 2),
          round(stats.ga + stats.xga, 2),
          true
        )
      }

      return {
        points: points,
        attack: attack,
        attackRounded: round(attack),

        defense: defense,
        defenseRounded: round(defense),

        totalCrude: round(((points + attack + defense) / 3), 2),
      }
    },

    calcTeamRatingTotalRounded(ratingCrude, max, min, decimal = 0) {
      return round(this.calcRating(max, min, ratingCrude), decimal)
    },

    reviseTotalRating(rating) {
      const decimal = rating - Math.floor(rating)
      if (decimal >= 0.75) {
        return Math.floor(rating + 1)
      } else {
        return Math.floor(rating)
      }
    },

    calcRating(scoreMax, scoreMin, score, reverse = false) {
      const min = 1
      const max = 5
      const newRange = max - min
      const currentRange = scoreMax - scoreMin
      let rating = 0
      rating = round(((score - scoreMin) / currentRange) * newRange + min, 2)
      if (reverse) {
        rating = round((max + min) - rating, 2)
      }
      return rating
    },

    setTeamsSort(key) {
      let directionBool = this.orderDirection === 'desc'
      if (key === this.sortKey) {
        directionBool = !directionBool
      }

      this.orderDirection = directionBool ? 'desc' : 'asc'
      this.sortKey = key
    },

    isSortKey(key) {
      return this.sortKey === key
    }
  }
}
</script>

<style lang="scss" scoped>
$table-spacing-v: 10px;
$table-spacing-h: 4px;

table {
  width: 100%;
  border-collapse: collapse;

  th {
    text-align: left;
    padding: $table-spacing-v $table-spacing-h;
    cursor: pointer;

    &.number {
      text-align: right;
    }

    &.sorted {
      color: rgb(123, 0, 255);
      border-radius: 12px;
    }
  }

  tr {
    background: hsl(200, 100%, 95%);

    &:nth-child(odd) {
      background: hsl(200, 100%, 88%);
    }

    &:hover {
      background: rgb(123, 0, 255);
      color: #fff;
    }
  }

  td {
    padding: $table-spacing-v $table-spacing-h;

    &.number {
      text-align: right;
    }
  }
}

.section {
  margin: $l 0;

  .team-grid-list {
    display: flex;
    flex-wrap: wrap;
    padding: $s 0;

    .team-item {
      width: 18%;
      margin: 1%;
    }
  }
}
</style>