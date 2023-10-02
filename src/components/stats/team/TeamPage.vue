<template>
  <div v-if="team">
    <BaseModalCard :backgroundColor="teamColor.teamBackground"
      :textColor="teamColor.text">

      <div class="team-page default-page-margin" :key="teamId">
        <router-link :to="{ name: 'stats' }">
          <img :src="arrowBackIcon" alt="Go back: teams">
        </router-link>
        <!-- Cover -->
        <div class="cover">
          <div class="pagination-button" @click="previousTeam()">
            <fa-icon icon="chevron-left" class="item-icon" />
          </div>
          <div class="team">
            <img :src="teamBadge" class="team-badge" alt="">
            <h2>{{ team.name }}</h2>
          </div>
          <div class="pagination-button" @click="nextTeam()">
            <fa-icon icon="chevron-right" class="item-icon" />
          </div>
        </div>
        <!-- Fixtures -->
        <div class="fixtures-container">
          <h3>Fixtures</h3>
          <ul class="fixture-list">
            <TeamPageFixtureItem v-for="fixture in fixtures" :key="fixture.code"
              :fixture="fixture" tag="li" class="fixture-item" />
          </ul>
          <pre>{{ fixtures }}</pre>
        </div>
        <!-- Players -->
        <h3>Players</h3>
        <ul class="player-list">
          <router-link v-for="player in sortedTeam" :key="player.id"
            :to="{ name: 'playerPage', params: { playerId: player.id } }"
            tag="li">
            <TeamPlayerItem :player="player" />
          </router-link>
        </ul>
      </div>
    </BaseModalCard>
  </div>
</template>

<script>
import {
  $getTeamById,
  $getTeamPlayersByTeamCode,
  $getTeamBadgeByTeamCode,
  $getFixturesByTeamId,
  $getTeamColorByTeamCode
} from '@/helpers/teams.js'
import orderBy from 'lodash/orderBy'
import BaseModalCard from '@/components/base/BaseModalCard.vue'
import TeamPageFixtureItem from '@/components/stats/team/TeamPageFixtureItem.vue'
import TeamPlayerItem from '@/components/stats/team/TeamPlayerItem'
export default {
  name: 'TeamPage',
  props: {
    teamId: {
      type: [String, Number],
      required: true
    }
  },
  components: {
    BaseModalCard,
    TeamPageFixtureItem,
    TeamPlayerItem
  },
  data() {
    return {
      team: null,
      teamBadge: null,
      teamColor: '',
      teamPlayers: null,
      fixtures: null,
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
      return orderBy(this.teamPlayers, ['element_type', 'total_points'], ['asc', 'desc'])
    },
    isFirstTeamInList() {
      const teamId = parseInt(this.teamId)
      return teamId === 1
    },
    isLastTeamInList() {
      const teamId = parseInt(this.teamId)
      return teamId === 20
    }
  },
  watch: {
    teamId: {
      handler(id) {
        this.initTeam(id)
      }
    }
  },
  mounted() {
    this.initTeam()
  },
  methods: {
    initTeam() {
      this.team = $getTeamById(this.teamId)
      this.teamPlayers = $getTeamPlayersByTeamCode(this.team.code)
      this.teamBadge = $getTeamBadgeByTeamCode(this.team.code)
      this.teamColor = $getTeamColorByTeamCode(this.team.code)
      this.setTeamPlayerPosition()
      this.fixtures = $getFixturesByTeamId(this.teamId)
    },
    setTeamPlayerPosition() {
      this.teamPlayers.forEach(player => {
        this.teamPlayersPosition[player.element_type - 1].players.push(player)
      })
    },
    nextTeam() {
      if (!this.isLastTeamInList) {
        const teamId = parseInt(this.teamId)
        this.changeTeamPage(teamId + 1)
      }
    },
    previousTeam() {
      if (!this.isFirstTeamInList) {
        const teamId = parseInt(this.teamId)
        this.changeTeamPage(teamId - 1)
      }
    },
    changeTeamPage(teamId) {
      this.$router.replace({ name: 'teamPage', params: { teamId: teamId } })
    }
  }
}
</script>
<style lang="scss" scoped>
.team-page {
  // animation: fade-in 400ms ease-in;

  .cover {
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding: $xl 0;

    .pagination-button {
      background: rgba(255, 255, 255, 0.2);
      padding: $l $m;
      border-radius: $m;
    }

    .team {
      display: flex;
      flex-direction: column;
      align-items: center;

      .team-badge {
        margin-bottom: $m;
      }
    }
  }

  .fixtures-container {

    .fixture-list {
      overflow-x: auto;
      display: flex;
      flex-wrap: nowrap;

      .fixture-item {
        margin: 2%;
      }
    }
  }

  .player-list {
    margin: $m 0;
  }
}

@keyframes slide-left {
  0% {
    transform: translateX(-100px);
  }

  100% {
    transform: translateX(0);
  }
}

@keyframes slide-right {
  0% {
    transform: translateX(100px);
  }

  100% {
    transform: translateX(0);
  }
}
</style>