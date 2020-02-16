<template>
  <div>
    <div
      :style="{backgroundImage: `url(${pitchImg})`}" 
      class="pitch-container"
    >
      
      <ul class="goalkeepers">
        <li 
          v-for="player in goalkeepers" 
          :key="player.id"
          
        >
          <pitch-player-item
            :player="player"
          />
        </li>
      </ul>
      <ul class="defenders">
        <li 
          v-for="player in defenders" 
          :key="player.id"
        >
          <pitch-player-item
            :player="player"
          />
        </li>
      </ul>
      <ul class="midfielders">
        <li 
          v-for="player in midfielders" 
          :key="player.id"
        >
          <pitch-player-item
            :player="player"
          />
        </li>
      </ul>
      <ul class="attackers">
        <li 
          v-for="player in attackers" 
          :key="player.id"
        >
          <pitch-player-item
            :player="player"
          />
        </li>
      </ul>
      <ul class="bench">
        <li 
          v-for="player in bench" 
          :key="player.id"
        >
          <pitch-player-item
            :player="player"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import PitchPlayerItem from '@/components/pitch/PitchPlayerItem.vue'
export default {
  name: 'PitchFormation',
  components: {
    'pitch-player-item': PitchPlayerItem
  },
  props: {
    players: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      pitchImg: require('@/assets/pitch.png')
    }
  },
  computed: {
    goalkeepers () {
      return this.players.filter(player => player.element_type === 1 && player.gameweek.position < 12)
    },
    defenders () {
      return this.players.filter(player => player.element_type === 2 && player.gameweek.position < 12)
    },
    midfielders () {
      return this.players.filter(player => player.element_type === 3 && player.gameweek.position < 12)
    },
    attackers () {
      return this.players.filter(player => player.element_type === 4 && player.gameweek.position < 12)
    },
    bench () {
      return this.players.filter(player => player.gameweek.position >= 12)
    }

  }
}
</script>

<style scoped>

.pitch-container {
  background-position: 48% 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-color: #111;
}

ul {
  display: flex;
  justify-content: center;
}

ul li {
  padding: 10px;
  text-align: center;
  width: 50px;
}

.bench {
  border-top: 1px solid #222;
  margin-top: 50px;
  background: #111;
  flex-direction: row-reverse;
}
</style>