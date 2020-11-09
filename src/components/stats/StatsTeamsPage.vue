<template>
  <div>
    <section class="section">
      <h2 @click="showTeams = !showTeams">Teams</h2>
      <ul class="horizontal-list">
        <router-link
          v-for="team in teams"
          :key="team.id"
          tag="li"
          class="team-item"
          :to="{ name: 'teamPage', params: {team: team }}"
        >
          <TeamItemCard :team="team"/>
        </router-link>
      </ul>
    </section>
  </div>
</template>

<script>
import TeamItemCard from '@/components/stats/team/TeamItemCard.vue'
export default {
  name: 'StatsTeamsPage',
  components: {
    TeamItemCard
  },
  data() {
    return {
      teams: this.$store.state.bootstrap.teams
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.section {
    margin: $l 0;

    .horizontal-list {
      display: flex;
      flex-wrap: nowrap;
      overflow-x: scroll;
      width: calc(100vw - 33px);
      padding: $s 0;

      .team-item {
        margin: $s;
        min-width: 110px;
      }
    }
  }
</style>