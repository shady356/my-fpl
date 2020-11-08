<template>
  <div>
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
import PlayerBaseStatChart from '@/components/stats/player/PlayerBaseStatChart'
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
            backgroundColor: '#05F26C22',
            borderColor: '#05F26C',
            pointRadius: 2,
            borderWidth: 2,
            lineTension: 0.8,
            pointBackgroundColor: '#05F26C',
            pointBorderWidth: 2,
            cubicInterpolationMode: 'monotone',
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
          xAxes:[{
            gridLines: {
              color: '#07F2F222'
            },
            ticks: {
              fontFamily: "Roboto condensed",
              fontColor: '#333'
            }
          }],
          yAxes:[{
            gridLines: {
              color: '#07F2F222'
            },
            ticks: {
              stepSize: 1,
              min: 0,
              fontFamily: "Roboto condensed",
              fontColor: '#333',
              fontSize: 14
            }
          }],
        },
        tooltips: {
          fontFamily: "Roboto condensed",
          bodyAlign: 'center',
          backgroundColor: '#fff',
          bodyFontColor: '#340040',
          titleFontColor: '#340040',
          displayColors: false
        }
      }
    }
  },
  computed: {
    chartStyles () {
      return {
        width: '99%',
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