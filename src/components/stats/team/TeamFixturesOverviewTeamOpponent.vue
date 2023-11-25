<template>
  <div :class="['opponent', `opponent--rating-${rating}`]">
    {{
      opponent.short_name }}</div>
</template>

<script>
export default {
  props: {
    opponent: {
      type: Object,
      required: true,
    },
    ratingType: {
      type: String,
      required: false,
      default: 'totalRounded'
    }
  },
  computed: {
    rating() {
      return this.opponent.rating[this.ratingType]
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
    background: rgb(0, 115, 56);
    color: #fff;
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
    opacity: 0;
  }

  &--rating-5 {
    background: rgb(128, 7, 45);
    color: #fff;
    opacity: 0;
  }
}
</style>