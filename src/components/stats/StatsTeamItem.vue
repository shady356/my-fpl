<template>
  <div class="default-page-margin">
    <div class="cover">
      <img 
        :src="teamBadge" 
        class="team-badge"
        alt=""
      >
      <h2>{{team.name}}</h2>
    </div>
    <h3>Players</h3>
    <ul class="player-list">
      <TeamPlayer
        class="player"
        v-for="player in sortedTeam"
        :key="player.id"
        :player="player"
        tag="li"
      />
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
import orderBy from 'lodash/orderBy'
import TeamPlayer from '@/components/stats/TeamPlayer'
export default {
  name: 'StatsTeamItem',
  props: {
    team: {
      type: Object,
      required: true
    }
  },
  components: {
    TeamPlayer
  },
  data() {
    return {
      teamPlayers: null,
      BASE_URL: process.env.VUE_APP_FPL_API_URL
    }
  },
  computed: {
    teamBadge () {
      return `https://fantasy.premierleague.com/dist/img/badges/badge_${this.team.code}_80.png#/`
    },
    sortedTeam() {
      return orderBy(this.teamPlayers, ['element_type','form'],['asc', 'desc'])
    }
  },
  mounted () {
    this.getBootstrap()
  },
  methods: {
    getBootstrap() {
      axios
        .get(`${this.BASE_URL}/api/bootstrap-static/`)
        .then((response) => {
          const allPlayers = response.data.elements;
          console.log(allPlayers)
          this.teamPlayers = allPlayers.filter(player => {
            return player.team_code === this.team.code
          })
        })
        .catch((error) => {
          console.log(error);
          // this.errored = true;
        })
    },
  }
}
</script>
<style lang="scss" scoped>
  .cover {
    padding: $xl 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    
    .team-badge {
      margin-bottom: $m;
    }
  }
  .player-list {
    margin: $m 0;
  }
</style>