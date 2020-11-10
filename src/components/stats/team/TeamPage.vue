<template>
  <div v-if="team">
    <BaseModalCard>
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
            :to="{ name: 'playerPage', params: {playerId: player.id }}"
            tag="li"
          >
            <TeamPlayerItem 
              :player="player"
            />
          </router-link>
        </ul>
      </div>
    </BaseModalCard>
  </div>
</template>

<script>
import orderBy from 'lodash/orderBy'
import BaseModalCard from '@/components/base/BaseModalCard.vue'
import TeamPlayerItem from '@/components/stats/team/TeamPlayerItem'
export default {
  name: 'TeamPage',
  props: {
    teamId: {
      type: [String,Number],
      required: true
    }
  },
  components: {
    BaseModalCard,
    TeamPlayerItem
  },
  data() {
    return {
      teams: this.$store.state.bootstrap.teams,
      allPlayers: this.$store.state.bootstrap.elements,
      team: null,
      teamBadge: null,
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
      arrowBackIcon: require('@/assets/icons/arrow_back-24px.svg')
    }
  },
  computed: {
    sortedTeam() {
      return orderBy(this.teamPlayers, ['element_type','total_points'],['asc', 'desc'])
    }
  },
  mounted () {
    this.team = this.getTeamById(this.teamId)
    console.log(this.team)
    this.teamPlayers = this.getTeamPlayers()
    this.setTeamPlayerPosition()
    this.setTeamBadge()
  },
  methods: {
    setTeamPlayerPosition () {
      this.teamPlayers.forEach(player => {
        this.teamPlayersPosition[player.element_type-1].players.push(player)
      });
    },
    getTeamById (id) {
      id = parseInt(id)
      return this.teams.find(team => {
        return id === team.id
      })
    },
    getTeamPlayers () {
      return this.allPlayers.filter(player => {
        return player.team_code === this.team.code
      })
    },
    setTeamBadge () {
      this.teamBadge = `https://fantasy.premierleague.com/dist/img/badges/badge_${this.team.code}_80.png#/`
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