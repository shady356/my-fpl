<template>
  <table class="fixtures-table">
    <thead>
      <th class="fixtures-table__th fixtures-table__freeze-left">Teams</th>
      <th class="fixtures-table__th fixtures-table__freeze-top"
        v-for="th in gameweeks" :key="th">GW
        {{ th }}</th>
    </thead>
    <tbody>
      <TeamFixturesOverviewTeam v-for="team in teams" :key="team.id" :team="team"
        :currentGameWeek="gameweeks[0]" :ratingType="ratingType" />
    </tbody>
  </table>
</template>

<script>
import TeamFixturesOverviewTeam from '@/components/stats/team/TeamFixturesOverviewTeam.vue'

export default {
  components: {
    TeamFixturesOverviewTeam,
  },
  props: {
    teams: {
      type: Array,
      required: true
    },
    ratingType: {
      type: String,
      required: false,
      default: 'totalRounded'
    }
  },
  data() {
    return {

    }
  },
  computed: {
    gameweeks() {
      let gameweeks = []
      for (let i = 9; i <= 38; i++) {
        gameweeks.push(i)
      }
      return gameweeks
    }
  }
}
</script>

<style lang="scss" scoped>
.fixtures-table {
  display: sticky;
  top: 68px;
  max-width: fit-content;
  border-collapse: collapse;
  overflow: auto;
  white-space: nowrap;

  &__th {
    padding: $s;
  }

  &__freeze-left {
    position: sticky;
    background: #fff;
    left: 0;
    top: 68px;
    padding: $s $l;
    border-right: 2px solid #fff;
    z-index: 1;
  }

  &__freeze-top {
    position: sticky;
    top: 68px;
    background: #fff;
    border: 1px solid #ddd;
  }
}
</style>