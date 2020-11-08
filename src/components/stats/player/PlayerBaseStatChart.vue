<script>
import { Line } from 'vue-chartjs'
export default {
  extends: Line,
  name: 'PlayerBaseStatChart',
  props: {
    chartData: {
      type: Object,
      required: true
    },
    options: {
      type: Object,
      required: true
    }
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
  },
  methods: {
    update() {
      //this.$data._chart.destroy()
      //this.renderChart(this.chartData, this.options)
      this.$data._chart.update()
    }
  }
}
</script>