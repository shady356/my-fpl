<template>
  <div>
    <Header>
      <template #title>
        <h1>Stats</h1>
      </template> 
    </Header>
    <BaseTabs
      :items="pageTabItems"
      :activeIndex="activePageTabIndex"
      @selectTab="setPageTab"
      class="page-tabs-layout"
    />

    <div class="stats-container default-page-margin">
      <h4 @click="openPlayerStatFilters()">Filter</h4>
      
      <StatsPlayersPage v-if="isPlayersPage" />
      <StatsTeamsPage v-else />
    </div>
    <BaseModal
      v-if="showPlayerStatFilters"
      @closeModal="closePlayerStatFilters()">
      <template #header>
        Players stat filters
      </template>
      <template #content>
        Player
      </template>
    </BaseModal>
  </div>
</template>

<script>
import Header from '@/components/layout/Header.vue'
import BaseModal from '@/components/base/BaseModal.vue'
import BaseTabs from '@/components/base/BaseTabs.vue'
import StatsPlayersPage from '@/components/stats/StatsPlayersPage.vue'
import StatsTeamsPage from '@/components/stats/StatsTeamsPage.vue'

export default {
  name: 'Stats',
  components: {
    BaseModal,
    BaseTabs,
    Header,
    StatsPlayersPage,
    StatsTeamsPage
  },
  data () {
    return {
      activePageTabIndex: 0,
      showPlayerStatFilters: false,
      pageTabItems: [
        { name: 'Players', value: 'players' },
        { name: 'Teams', value: 'teams' }
      ]
    }
  },
  computed: {
    isPlayersPage () {
      return this.activePageTabIndex === 0
    }
  },
  methods: {
    openPlayerStatFilters() {
      this.showPlayerStatFilters = true
    },
    closePlayerStatFilters() {
      this.showPlayerStatFilters = false
    },
    setPageTab(payload) {
      this.activePageTabIndex = payload.index
    }
  }
}
</script>

<style scoped lang="scss">

.page-tabs-layout {
  text-align: center;
  margin: $l 0;
}
</style>