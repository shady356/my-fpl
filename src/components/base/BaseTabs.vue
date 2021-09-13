<template>
  <div>
    <ul :class="['tabs-list', {'horisontal-list': horisontalList }]">
      <li
        v-for="(item, index) in items"
        :key="item.name"
        :class="['tab-item', {'active': isTabActive(index)}]"
        @click="selectTab(item, index)"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'BaseTabs',
  props: {
    items: {
      type: Array,
      required: true
    },
    activeIndex: {
      type: Number,
      required: true
    },
    horisontalList: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  methods: {
    isTabActive (index) {
      return index === this.activeIndex
    },
    selectTab (item, index) {
      this.$emit('selectTab', {value: item.value, index: index})
    }
  }
}
</script>

<style lang="scss" scoped>
.tabs-list {
  display: inline-flex;
  flex-wrap: nowrap;
  align-items: center;
  background: #eee;
  border-radius: $l;
  padding: $xs;

  .tab-item {
    padding: $s $m;
    border-radius: $l;

    &.active {
      background: #fff;
      font-weight: 700;
      border-color: transparent;
    }
  }
  &.horisontal-list {
    display: flex;
    align-items: flex-start;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-padding: $xs;

    &::-webkit-scrollbar {
      height: 0;  /* Remove scrollbar space */
      background: transparent;  /* Optional: just make scrollbar invisible */
    }

    .tab-item {
      white-space: nowrap;
      margin: 0 $xs;
      scroll-snap-align: start;

      &:first-child {
        margin-left: 0;
      }
      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>