<template>
  <div>
    <div class="grid">
      <div v-for="(row, index) in grid" :key="index" class="rows">
        <div v-for="tile in row" :key="tile.id">
          <LudoSlot :tile="tile" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LudoSlot from './LudoSlot.vue'
export default {
  components: {
    LudoSlot,
  },
  data() {
    return {
      areas: [
        {
          id: 0,
          color: '#20ffaa',
          startArea: ['0,0', '0,1', '0,2', '0,3', '0,4', '0,5', '1,0', '1,5', '2,0', '2,5', '3,0', '3,5', '4,0', '4,5', '5,0', '5,1', '5,2', '5,3', '5,4', '5,5'],
          startTile: '1,6',
          endTiles: ['1,7', '2,7', '3,7', '4,7', '5,7'],
          winTile: '6,7',
          defined: false
        },
        {
          id: 1,
          color: '#30aaff',
          startArea: ['9,0', '10,0', '11,0', '12,0', '13,0', '14,0', '9,1', '10,1', '11,1', '12,1', '13,1', '14,1', '9,2', '10,2', '11,2', '12,2', '13,2', '14,2', '9,3', '10,3', '11,3', '12,3', '13,3', '14,3', '9,4', '10,4', '11,4', '12,4', '13,4', '14,4', '9,5', '10,5', '11,5', '12,5', '13,5', '14,5'],
          startTile: '8,1',
          endTiles: ['7,1', '7,2', '7,3', '7,4', '7,5'],
          winTile: '7,6',
          defined: false
        },
        {
          id: 2,
          color: '#ff22aa',
          startArea: ['9,9', '10,9', '11,9', '12,9', '13,9', '14,9', '9,10', '10,10', '11,10', '12,10', '13,10', '14,10', '9,11', '10,11', '11,11', '12,11', '13,11', '14,11', '9,12', '10,12', '11,12', '12,12', '13,12', '14,12', '9,13', '10,13', '11,13', '12,13', '13,13', '14,13', '9,14', '10,14', '11,14', '12,14', '13,14', '14,14'],
          startTile: '13,8',
          endTiles: ['9,7', '10,7', '11,7', '12,7', '13,7'],
          winTile: '8,7',
          defined: false
        },
        {
          id: 3,
          color: '#ffcc40',
          startArea: ['0,9', '1,9', '2,9', '3,9', '4,9', '5,9', '0,10', '1,10', '2,10', '3,10', '4,10', '5,10', '0,11', '1,11', '2,11', '3,11', '4,11', '5,11', '0,12', '1,12', '2,12', '3,12', '4,12', '5,12', '0,13', '1,13', '2,13', '3,13', '4,13', '5,13', '0,14', '1,14', '2,14', '3,14', '4,14', '5,14'],
          startTile: '6,13',
          endTiles: ['7,9', '7,10', '7,11', '7,12', '7,13'],
          winTile: '7,8',
          defined: false
        }
      ],
      players: [
        {
          id: 0,
          color: '#20ffaa',
          pieces: [
            { x: 2, y: 2, isInHouse: true },
            { x: 3, y: 2, isInHouse: true },
            { x: 2, y: 3, isInHouse: true },
            { x: 3, y: 3, isInHouse: true }
          ]
        },
        {
          id: 1,
          color: '#30aaff',
          pieces: [
            { x: 2, y: 11, isInHouse: true },
            { x: 3, y: 11, isInHouse: true },
            { x: 2, y: 12, isInHouse: true },
            { x: 3, y: 12, isInHouse: true }
          ]
        },
        {
          id: 2,
          color: '#ff22aa',
          pieces: [
            { x: 11, y: 11, isInHouse: true },
            { x: 11, y: 12, isInHouse: true },
            { x: 12, y: 11, isInHouse: true },
            { x: 12, y: 12, isInHouse: true }
          ]
        },
        {
          id: 3,
          color: '#ffcc40',
          pieces: [
            { x: 11, y: 2, isInHouse: true },
            { x: 11, y: 3, isInHouse: true },
            { x: 12, y: 2, isInHouse: true },
            { x: 12, y: 3, isInHouse: true }
          ]
        }
      ],
      GRID_MAX: 15,
      grid: []
    }
  },
  mounted() {
    this.grid = this.createGrid()
    this.initPlayers()
  },
  methods: {
    createGrid() {
      const grid = []
      for (let r = 0; r < this.GRID_MAX; r++) {
        grid[r] = []

        for (let c = 0; c < this.GRID_MAX; c++) {
          grid[r][c] = {
            id: `${r}${c}`,
            x: r,
            y: c,
            content: `${r},${c}`,
            color: this.getColor(c, r),
            player: null,
          }

        }
      }
      return grid
    },

    getColor(tileX, tileY) {
      const tile = `${tileX},${tileY}`
      const green = this.areas[0]
      const blue = this.areas[1]
      const red = this.areas[2]
      const yellow = this.areas[3]

      if (green.startArea.includes(tile) || green.startTile === tile || green.endTiles.includes(tile) || green.winTile === tile) {
        return green.color
      }

      if (blue.startArea.includes(tile) || blue.startTile === tile || blue.endTiles.includes(tile) || blue.winTile === tile) {
        return blue.color
      }

      if (red.startArea.includes(tile) || red.startTile === tile || red.endTiles.includes(tile) || red.winTile === tile) {
        return red.color
      }

      if (yellow.startArea.includes(tile) || yellow.startTile === tile || yellow.endTiles.includes(tile) || yellow.winTile === tile) {
        return yellow.color
      }
    },

    initPlayers() {
      for (let i = 0; i < this.players.length; i++) {
        for (let j = 0; j < this.players[i].pieces.length; j++) {
          const x = this.players[i].pieces[j].x
          const y = this.players[i].pieces[j].y
          this.grid[x][y].player = {
            color: this.players[i].color
          }
        }
      }
    },



    throwDice() {
      //const dice = this.getDiceNumer()
    },
    getDiceNumer() {
      return Math.floor(Math.random() * 6) + 1;
    }
  }
}
</script>

<style lang="scss" scoped>
.grid {
  display: flex;
  flex-wrap: wrap;
  width: 750px;
  margin: 0 auto;
  margin-top: 100px;
  border: 2px solid #ddd;
}

.rows {
  display: flex;
  flex-direction: row;
}
</style>