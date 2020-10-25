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
          @click="toggleTooltip(player.id)"
          
        >
          <pitch-player-item
            :player="player"
            :GW="GW"
            :tooltip="isTooltip && activeTooltip === player.id"
          />
        </li>
      </ul>
      <ul class="defenders">
        <li 
          v-for="player in defenders" 
          :key="player.id"
          @click="toggleTooltip(player.id)"
        >
          <pitch-player-item
            :player="player"
            :GW="GW"
            :tooltip="isTooltip && activeTooltip === player.id"
          />
        </li>
      </ul>
      <ul class="midfielders">
        <li 
          v-for="player in midfielders" 
          :key="player.id"
          @click="toggleTooltip(player.id)"
        >
          <pitch-player-item
            :player="player"
            :GW="GW"
            :tooltip="isTooltip && activeTooltip === player.id"
          />
        </li>
      </ul>
      <ul class="attackers">
        <li 
          v-for="player in attackers" 
          :key="player.id"
          @click="toggleTooltip(player.id)"
        >
          <pitch-player-item
            :player="player"
            :GW="GW"
            :tooltip="isTooltip && activeTooltip === player.id"
          />
        </li>
      </ul>
      <ul class="bench">
        <li 
          v-for="player in bench" 
          :key="player.id"
          @click="toggleTooltip(player.id)"
        >
          <pitch-player-item
            :player="player"
            :GW="GW"
            :tooltip="isTooltip && activeTooltip === player.id"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// import BaseTooltip from '@/components/base/BaseTooltip.vue'
import PitchPlayerItem from '@/components/pitch/PitchPlayerItem.vue'
export default {
  name: 'PitchFormation',
  components: {
    'pitch-player-item': PitchPlayerItem,
    // 'base-tooltip': BaseTooltip
  },
  props: {
    players: {
      type: Array,
      required: true
    },
    GW: {
      type: Number,
      required: true,
    }
  },
  data() {
    return {
      pitchImg: require('@/assets/pitch.png'),
      isTooltip: false,
      activeTooltip: null,
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
  },
  methods: {
    toggleTooltip (id) {
      this.activeTooltip = id
      this.isTooltip = !this.isTooltip
    }
  }
}
</script>

<style lang="scss" scoped>

.pitch-container {
  background-position: 48% 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-color: #eee;

  ul {
    display: flex;
    justify-content: space-evenly;

    li {
      padding: 8px 0;
      width: 70px;
      text-align: center;
    }
  }
}
.bench {
  background: #eee;
  border-top: 1px solid #ccc;
  flex-direction: row-reverse;
  margin-top: 16px;
}
</style>