<template>
  <div>
    <ul class="tabs-list">
      <li
        v-for="(tab, index) in items"
        :key="tab.name"
        :class="['tab-item', {'active': isTabActive(index)}]"
        @click="selectTab(index)"
      >
        {{ tab.name }}
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
    }
  },
  methods: {
    isTabActive (index) {
      return index === this.activeIndex
    },
    selectTab (index) {
      this.$emit('selectTab', index)
    }
  }
}
</script>

<style lang="scss" scoped>
.tabs-list {
  display: inline-flex;
  flex-wrap: nowrap;
  background: #eee;
  border-radius: $l;

  .tab-item {
    padding: $s $m;
    border: 1px solid #aaa;

    &:first-child {
      border-radius: $l 0 0 $l;
      //border-right: none;
    }
    &:last-child {
      border-radius: 0 $l $l 0;
      //border-left: none;
    }

    &.active {
      background: #000;
      color: #fff;
      font-weight: 700;
      border-color: transparent;
      transition: background-color 200ms ease-in, font-weight 200ms ease-in;
    }
  }
}
</style>