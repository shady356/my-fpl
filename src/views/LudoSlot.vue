<template>
  <div class="slot" :style="computedTile">
    <div v-if="tile.player" :style="computedPlayer" class="player" />
    <div v-else>

    </div>
  </div>
</template>

<script>
export default {
  props: {
    tile: {
      type: Object,
      required: true
    }
  },
  computed: {
    computedTile() {
      return {
        'background-color': this.tile.color
      }
    },
    computedPlayer() {
      return {
        'background-color': this.tile.player.color
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.slot {
  display: flex;
  align-items: center;
  justify-content: center;
  $border-size: calc(1px + 1px);
  $size: calc(50px - #{$border-size});
  border: 1px solid #fff;
  width: $size;
  height: $size;
}

.player {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #fff;

}
</style>