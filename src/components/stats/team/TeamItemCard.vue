<template>
  <div class="team-container">
    <img :src="teamBadge" alt="team-badge" class="team-badge">
    <!--   <h4 class="team-name">{{ team.name }}</h4> -->
  </div>
</template>

<script>
import {
  $getTeamBadgeByTeamCode,
} from '@/helpers/teams.js'
export default {
  name: 'TeamItemCard',
  props: {
    team: {
      type: Object,
      required: true
    }
  },
  computed: {
    teamBadge() {
      return $getTeamBadgeByTeamCode(this.team.code)
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
  padding: $m;
  height: 128px;

  .team-badge {
    width: $xl;
    height: auto;
  }

  .team-name {
    margin-top: $m;
    text-align: center;
  }
}
</style>