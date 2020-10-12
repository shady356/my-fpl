<template>
  <div>
    <pre>{{playerChartData}}</pre>
    <PlayerBaseStatChart
      v-if="isChartGenerated"
      :chart-data="baseStatChartData" 
      :options="baseStatChartOptions"
      :styles="chartStyles"
      ref="baseStatsChart"
      class="stat-chart-container"
    />
  </div>
</template>

<script>
import PlayerBaseStatChart from '@/components/stats/PlayerBaseStatChart'
export default {
  name: 'PlayerStatsChartController',
  components: {
    PlayerBaseStatChart
  },
  props: {
    playerSummary: {
      type: Object,
      required: true
    },
    playerChartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isChartGenerated: false,
      baseStatChartData: {
        labels: [],
        datasets: [
          {
            backgroundColor: '#00aaddcc',
            borderColor: '#00aaddcc',
            pointRadius: 5,
            borderWidth: 2,
            data: []
          }
        ]
      },
      baseStatChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        scales: {
          yAxes:[{
            ticks: {
              stepSize: 1,
              min: 0
            } 
          }]
        }
      }
    }
  },
  computed: {
    chartStyles () {
      return {
        width: '90%',
        position: 'relative'
      }
    }
  },
  watch: {
    playerChartData: {
      deep: true,
      handler() {
        this.isChartGenerated = false
        this.setChartData()
        this.$refs.baseStatsChart.update()
      }
    }
  },
  mounted() {
    this.setChartData()
  },
  methods: {
    setChartData () {
      const labels = []
      const datasets = []

      this.baseStatChartData.labels = []
      this.baseStatChartData.datasets.data = []

      this.playerSummary.history.forEach((gameweek, index) => {
        labels.push(index + 1)
        datasets.push(gameweek[this.playerChartData.key])
      });

      this.baseStatChartOptions.scales.yAxes[0].ticks.min = this.playerChartData.min
      this.baseStatChartOptions.scales.yAxes[0].ticks.stepSize = this.playerChartData.stepSize

      this.baseStatChartData.labels = labels
      this.baseStatChartData.datasets[0].data = datasets
      this.isChartGenerated = true
      
    }
  }
}
</script>

<style lang="scss" scoped>
  .stat-chart-container {
    margin: 0 auto;
    height: 200px;
    width: 100%;
  }
</style>