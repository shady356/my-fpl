<template>
  <div :class="['opponent', `opponent--rating-${opponent.rating.totalRounded}`]">
    {{
      opponent.short_name }}</div>
</template>

<script>
export default {
  props: {
    opponent: {
      type: Object,
      required: true,
    }
  }
}
</script>

<style lang="scss" scoped>
.opponent {
  padding: $m $l;
  background: #333;
  border-radius: 8px;

  &--rating-1 {
    //background: rgb(166, 255, 0);
    background: rgb(1, 252, 122);
  }

  &--rating-2 {
    background: rgb(1, 252, 122);
  }

  &--rating-3 {
    background: rgb(200, 231, 200);
  }

  &--rating-4 {
    background: rgb(255, 23, 81);
    color: #fff;
  }

  &--rating-5 {
    background: rgb(128, 7, 45);
    color: #fff;
  }
}
</style>