<template>
  <div class="team-container">
    <img
      :src="teamBadge" 
      alt="team-badge"
      class="team-badge"
    >
    <h4>{{team.name}}</h4>
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
    align-items: center;
    background: #fff;
    border-radius: $s;
    box-shadow: 0 5px $s #ddd;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: $m 0;
    padding: $m;

    .team-badge {
      width: $l;
      height: auto;
    }
  }
</style>