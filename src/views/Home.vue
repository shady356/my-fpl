<template>
  <div v-if="this.isLoaded">
 <!--    <h1>Fantasy Premier League</h1> -->
    <h4>Gameweek {{currentGw.event}}</h4>
    <h2 class="pl-yellow">{{currentGw.points}}</h2>
    <pitch-formation
      :players="myPlayers"
    />
  </div>
  <div v-else>
    <h3>Loading ...</h3>
    Bootstrap: {{isBootstrapLoaded}}<br>
    My Picks: {{isMyPicksLoaded}}<br>
    Gameweeks: {{isGameweeksLoaded}}<br>
    Players loaded: {{numberOfPlayersLoaded}} / 15<br>
  </div>
</template>

<script>
import PitchFormation from '@/components/pitch/PitchFormation.vue'

export default {
  name: 'home',
  components: {
    'pitch-formation': PitchFormation
  },
  data() {
    return {
      GW: 26,
      gameweeks: null,
      allPlayers: null,
      myPicks: null,
      myPicksHistory: [],
      myPicksIds: null,
      bootstrap: null,
      countPlayerScoreFetched: 0,
      localhostBase: 'http://localhost:8080',
      networkBase: 'http://192.168.0.18:8080'  
     }
  },
  computed: {
    BASE_URL() {
      return this.networkBase
    },
    isLoaded () {
      return this.isBootstrapLoaded && this.isMyPicksLoaded && this.isGameweeksLoaded && this.numberOfPlayersLoaded === 15
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
      .get(`${this.BASE_URL}/api/entry/2835090/event/${gw}/picks/`)
      .then(response => {
        this.myPicks = response.data.picks
        this.myPicksIds = this.myPicks.map(player => player.element)
        this.myPicksIds.forEach(playerId => {
          this.getPlayerHistoryByPlayerId(playerId)
        });
      })
      .catch(error => {
        console.log(error)
        this.errored = true
      })
    },
    getPlayerHistoryByPlayerId(playerId) {
      axios
      .get(`${this.BASE_URL}/api/element-summary/${playerId}/`)
      .then(response => {
        let data = response.data.history
        let index = this.findPlayerIndexById(playerId)
        this.myPicks[index]['score'] = data[this.GW-1]
        this.countPlayerScoreFetched++
      })
      .catch(error => {
        console.log(error)
        this.countPlayerScoreFetched++
        this.errored = true
      })
    },
    getGameWeeks() {
      axios
      .get(`${this.BASE_URL}/api/entry/2835090/history/`)
      .then(response => {
        this.gameweeks = response.data
      })
      .catch(error => {
        console.log(error)
        this.errored = true
      })
    }
  }
}
</script>

<style scoped>

</style>