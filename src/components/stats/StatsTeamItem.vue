<template>
  <div class="default-page-margin">
    <router-link
      :to="{name: 'stats'}"
    >
      <img :src="arrowBackIcon" alt="Go back: teams">
    </router-link>
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
      <router-link
        v-for="player in sortedTeam"
        :key="player.id"
        :to="{ name: 'playerProfile', params: {player: player }}"
        tag="li"
      >
        <TeamPlayerItem :player="player"/>
      </router-link>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
import orderBy from 'lodash/orderBy'
import TeamPlayerItem from '@/components/stats/TeamPlayerItem'
export default {
  name: 'StatsTeamItem',
  props: {
    team: {
      type: Object,
      required: true
    }
  },
  components: {
    TeamPlayerItem
  },
  data() {
    return {
      teamPlayers: null,
      teamPlayersPosition: [
        {
          position: 'goalkeepers',
          players: []
        },
        {
          position: 'defenders',
          players: []
        },
        {
          position: 'midfielders',
          players: []
        },
        {
          position: 'forwards',
          players: []
        },
      ],
      BASE_URL: process.env.VUE_APP_FPL_API_URL,
      arrowBackIcon: require('@/assets/icons/arrow_back-24px.svg')
    }
  },
  computed: {
    teamBadge () {
      return `https://fantasy.premierleague.com/dist/img/badges/badge_${this.team.code}_80.png#/`
    },
    sortedTeam() {
      return orderBy(this.teamPlayers, ['element_type','total_points'],['asc', 'desc'])
    }
  },
  mounted () {
    this.getBootstrap()
  },
  methods: {
    setTeamPlayerPosition () {
      this.teamPlayers.forEach(player => {
        this.teamPlayersPosition[player.element_type-1].players.push(player)
      });
    },
    getBootstrap() {
      axios
        .get(`${this.BASE_URL}/api/bootstrap-static/`)
        .then((response) => {
          const allPlayers = response.data.elements;
          this.teamPlayers = allPlayers.filter(player => {
            return player.team_code === this.team.code
          })
          this.setTeamPlayerPosition()
        })
        .catch((error) => {
          console.log(error);
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