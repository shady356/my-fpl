<template>
  <div>
    <nav :class="['tabs-list', {'horisontal-list': horisontalList }]">
      <button
        v-for="(item, index) in items"
        :key="item.name"
        :class="['tab-button', {'tab-button--active': isTabActive(index)}]"
        @click="selectTab(item, index)"
      >
        {{ item.name }}
      </button>
    </nav>
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
  background: #eeeeff;
  border-radius: $l;
  padding: $s;

  .tab-button {
    padding: $s $m;
    border-radius: $l;
    background: none;
    border: none;
    cursor: pointer;
    white-space: nowrap;

    &--active {
      background: #1f5fe9;
      color: #fff;
      font-weight: 700;
      border-color: transparent;
    }
  }
  &.horisontal-list {
    display: flex;
    align-items: flex-start;
    overflow-x: auto;

    &::-webkit-scrollbar {
      height: 0;  /* Remove scrollbar space */
      background: transparent;  /* Optional: just make scrollbar invisible */
    }

    .tab-item {
      white-space: nowrap;
      margin: 0 $xs;

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