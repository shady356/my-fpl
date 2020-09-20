<template>
  <div class="team-container">
    <img
      :src="teamBadge" 
      alt="team-badge"
      class="team-badge"
    >
    <h4>{{team.name}}</h4>
  <!--   <div v-if="team.name === 'Arsenal'">
      <pre>{{team}}</pre>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'StatsTeamListItem',
  props: {
    team: {
      type: Object,
      required: true
    }
  },
  computed: {
    teamBadge () {
      return `https://fantasy.premierleague.com/dist/img/badges/badge_${this.team.code}_80.png#/`
    }
  }
}
</script>

<style lang="scss" scoped>
  .team-container {
    background: #1a1a1a;
    display: flex;
    align-items: center;
    margin: $m 0;
    padding: $m;
    border-radius: $s;
    border: 1px solid #333;

    .team-badge {
      margin-right: $m;
      width: $l;
      height: auto;
    }
  }
</style>