<template>
  <div>
    <ul>
      <li v-for="playerList in playerLists" :key="playerList.key">
        <FeaturedPlayerList :playerList="playerList" />
      </li>
    </ul>
  </div>
</template>

<script>
import FeaturedPlayerList from "@/components/stats/player/FeaturedPlayerList.vue";
export default {
  name: "StatsTeamsPage",
  components: {
    FeaturedPlayerList
  },
  data() {
    return {
      playerLists: [
        {
          title: 'Expected goals',
          key: 'expected_goals',
          listSort: 'desc',
          maxPlayers: 10
        },
        {
          title: 'Expected assists',
          key: 'expected_assists',
          listSort: 'desc',
          maxPlayers: 10
        },
        {
          title: 'Expected goal involvements',
          key: 'expected_goal_involvements',
          listSort: 'desc',
          maxPlayers: 10
        },
        {
          title: 'Expected goals conceded',
          key: 'expected_goals_conceded',
          listSort: 'desc',
          maxPlayers: 10
        },
        {
          title: 'Top Scorers',
          key: 'goals_scored',
          listSort: 'desc',
          maxPlayers: 10
        },
        {
          title: 'Top Assisters',
          key: 'assists',
          listSort: 'desc',
          maxPlayers: 10
        },
        {
          title: 'Top Form',
          key: 'form',
          listSort: 'desc',
          maxPlayers: 10
        },
        {
          title: 'Cost change',
          key: 'cost_change_event',
          listSort: 'desc',
          maxPlayers: 10
        },
        {
          title: 'Selected by (%)',
          key: 'selected_by_percent',
          listSort: 'desc',
          maxPlayers: 10
        }
      ]
    }
  }

};
</script>

<style lang="scss" scoped></style>