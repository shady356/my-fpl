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
      <li
        class="player"
        v-for="player in sortedTeam"
        :key="player.id"
      >
        <img
          class="player-image" 
          :src="pictureBase + player.code + '.png'" 
          alt=""
        >
        <div>
          <h5>{{player.first_name}}</h5>
          <h4>{{player.web_name}}</h4>
          <div :class="['position-tag']">foobar</div>
        </div>
        <h6>{{player.now_cost | playerCost}}</h6>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
import orderBy from 'lodash/orderBy'
export default {
  name: 'StatsTeamItem',
  props: {
    team: {
      type: Object,
      required: true
    }
  },
  filters: {
    playerCost(value) {
      return '£' + (value / 10).toFixed(1) 
    }
  },
  data() {
    return {
      teamPlayers: null,
      BASE_URL: process.env.VUE_APP_FPL_API_URL,
      pictureBase: 'https://resources.premierleague.com/premierleague/photos/players/110x140/p'
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

    .player {
      display: flex;
      border: 1px solid #222;
      background: #1a1a1a;
      border-radius: $s;
      padding: $m $m 0;
      margin: $m 0;

      .player-image {
        width: 64px;
        margin-right: $m;
      }
    }
  }
  .position-tag {
    padding: 10px 20px;
    font-size: 1rem;
    
    .goal-keeper {
      background: yellow;
      color: #333;
    }
  }
</style>