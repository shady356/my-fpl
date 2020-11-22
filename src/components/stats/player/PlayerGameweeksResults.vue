<template>
  <div>
    <div class="list-headers">
      <h6>GW</h6>
      <h6>Result</h6>
      <h6>Value</h6>
      <h6>Points</h6>
    </div>
    <ul class="gameweek-list">
      <li
        class="gameweek-item"
        v-for="(gameweek, index) in playerSummary.history"
        :key="gameweek.round"
        @click="selectGameweek(index)"
      >
       <GameweekItem
        :gameweek="gameweek"
        :isActive="isGameweekActive(index)"
        :teamBadge="teamBadge"
       />
      </li>
    </ul>
  </div>
</template>

<script>
import GameweekItem from '@/components/stats/player/GameweekItem.vue'
export default {
  name: 'PlayerGameWeeksResults',
  components: {
    GameweekItem
  },
  props: {
    playerSummary: {
      type: Object,
      required: true
    },
    teamBadge: {
      type: String,
      required: false,
      default: ''
    }
  },
  data() {
    return {
      activeGameweek: null
    }
  },
  methods: {
    isGameweekActive(index) {
      return index === this.activeGameweek
    },
    selectGameweek (index) {
      this.activeGameweek = index
    }
  }
}
</script>

<style lang="scss" scoped>
  .list-headers {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0px;
    padding: $m 0;
    background: #222;
    border-bottom: 1px solid #aaa;
  }
  .gameweek-list {
    border-left: 1px solid #aaa;
    margin-left: 10px;

    .gameweek-item {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      padding: $m 0; 
    } 
  }
</style>