<template>
  <div>
    <div class="gameweek-pagination">
      <button :disabled="GW < 2" @click="changeGameweek(GW - 1)">
        Prev
      </button>
      <h4>Gameweek {{ GW }}</h4>
      <button
        :disabled="GW === gameweeks.current.length"
        @click="changeGameweek(GW + 1)"
      >
        Next
      </button>
    </div>
    <ul class="gameweek-score-container">
      <li class="gameweek-average-points">
        <h4>{{ bootstrap.events[GW - 1].average_entry_score }}</h4>
        <h5 class="small-caps">avg pts</h5>
      </li>
      <li class="gameweek-points">
        <h2>{{ gameweeks.current[GW - 1].points }}</h2>
        <h5 class="small-caps">your score</h5>
      </li>
      <li>
        <h4>{{ gameweeks.current[GW - 1].rank | bigNumber }}</h4>
        <h5 class="small-caps">gw rank</h5>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'FantasyHeader',
  filters: {
    bigNumber(value) {
      return new Intl.NumberFormat("en-UK", {
        maximumSignificantDigits: 7,
      }).format(value)
    },
  },
  props: {
    GW: {
      type: Number,
      required: true
    },
    gameweeks: {
      type: Object,
      required: true
    },
    bootstrap: {
      type: Object,
      required: true
    }
  },
  methods: {
    changeGameweek (gw) {
      this.$emit('updateGameweek', gw)
    }
  }
}
</script>

<style lang="scss" scoped>
.gameweek-pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;

  h4 {
    font-style: italic;
  }

  button {
    padding: $xs $m;
    border: none;
    font-style: italic;
    font-weight: 700;
    background: $pl-blue;
    margin: $s;

    :disabled {
      background: #f00;
    }
  }
}

.gameweek-score-container {
  padding: $s;
  display: flex;
  justify-content: space-evenly;
  align-items: baseline;
  color: $pl-purple;

  li {
    text-align: center;
    width: calc(100% / 3);

    &.gameweek-points {
      h2 {
        font-weight: 700;
      }
    }
  }
}
</style>