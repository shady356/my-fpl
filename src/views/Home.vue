<template>
  <div v-if="this.isLoaded">
    <!--    <h1>Fantasy Premier League</h1> -->
    <h4>Gameweek {{GW}}</h4>
    <h2 class="pl-yellow">{{gameweeks.current[GW-1].points}}</h2>
    <h3 class="">{{gameweeks.current[GW-1].rank | bigNumber}}</h3>
    <div class="pagination">
      <button
        :disabled="GW < 2"
        @click="changeGameweek(GW-1)"
      >
        Previous
      </button>
      <button
        :disabled="GW === gameweeks.current.length"
        @click="changeGameweek(GW+1)"
      >
        Next
      </button>
    </div>
    <pitch-formation
      :players="myPlayers"
      :GW="GW"
    />
  </div>
  <!-- <div v-else>
    <h3>Loading ...</h3>
    Bootstrap: {{isBootstrapLoaded}}<br>
    My Picks: {{isMyPicksLoaded}}<br>
    Gameweeks: {{isGameweeksLoaded}}<br>
    Players loaded: {{numberOfPlayersLoaded}} / 15<br>
  </div> -->
</template>

<script>
import PitchFormation from '@/components/pitch/PitchFormation.vue'

export default {
  name: 'home',
  components: {
    'pitch-formation': PitchFormation
  },
  filters: {
    bigNumber(value) {
      return new Intl.NumberFormat('en-UK', { maximumSignificantDigits: 7 }).format(value)
    }
  },
  data() {
    return {
      GW: 26,
      gameweeks: null,
      allPlayers: null,
      myPicks: null,
      myPicksIds: null,
      bootstrap: null,
      localhostBase: 'http://localhost:8080',
      networkBase: 'http://192.168.0.18:8080',
      teamId: 2835090
     }
  },
  computed: {
    BASE_URL() {
      return this.networkBase
    },
    isLoaded () { 
      return this.isBootstrapLoaded && this.isMyPicksLoaded && this.isGameweeksLoaded
    },
    isBootstrapLoaded () {
      return !!this.bootstrap
    },
    isMyPicksLoaded () {
      return !!this.myPicks
    },
    isGameweeksLoaded () {
      return !!this.gameweeks
    },
    numberOfPlayersLoaded () {
      return this.countPlayerScoreFetched
    },
    currentGw () {
      if(this.gameweeks !== null)
        return this.gameweeks.current[this.gameweeks.current.length-1]
    },
    myPlayers () {
      let index = 0
      return this.allPlayers.filter(player => {
        if(this.myPicksIds.includes(player.id)) {
          index = this.findPlayerIndexById(player.id)
          player['gameweek'] = this.myPicks[index] || null
          return player
        }
      })
    }
  },
  mounted () {
    this.getBootstrap()
    this.getGameWeeks()
    this.getMyPicks(this.GW)
  },
  methods: {

    findPlayerIndexById(id) {
      return this.myPicks.findIndex(player => player.element === id)
    },
    changeGameweek (n) {
      this.GW = n
      this.updateGameweek(n)
    },

    // Axios
    getBootstrap() {
      axios
      .get(`${this.BASE_URL}/api/bootstrap-static/`)
      .then(response => {
        this.bootstrap = response.data
        this.allPlayers = response.data.elements
      })
      .catch(error => {
        console.log(error)
        this.errored = true
      })
    },
    getMyPicks(gw) {
      axios
      .get(`${this.BASE_URL}/api/entry/${this.teamId}/event/${gw}/picks/`)
      .then(response => {
        this.myPicks = response.data.picks
        this.myPicksIds = this.myPicks.map(player => player.element)
      })
      .catch(error => {
        console.log(error)
        this.errored = true
      })
    },
    getGameWeeks() {
      axios
      .get(`${this.BASE_URL}/api/entry/${this.teamId}/history/`)
      .then(response => {
        this.gameweeks = response.data
      })
      .catch(error => {
        console.log(error)
        this.errored = true
      })
    },
    updateGameweek(gw) {
      this.getMyPicks(gw)
    }
  }
}
</script>

<style scoped>

.pagination {
  display: flex; 
  justify-content: space-between;
}

button {
  padding: 10px 20px;
  background: #333;
  border: none;
  color: #ddd;
  border-radius: 100px;
  margin: 10px;
}
</style>