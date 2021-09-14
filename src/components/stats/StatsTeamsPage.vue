<template>
  <div>
    <section class="section">
      <h2>Teams</h2>
      <ul class="team-grid-list">
        <router-link
          v-for="team in teams"
          :key="team.id"
          tag="li"
          class="team-item"
          :to="{ name: 'teamPage', params: {teamId: team.id }}"
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
  }
}
</script>

<style lang="scss" scoped>
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