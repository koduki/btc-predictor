<script>
import { Bar, mixins } from 'vue-chartjs' // mixinsモジュールをインポート
export default {
  extends: Bar,
  mixins: [mixins.reactiveProp], // reactivePropを使用
  props: {
    chartData: Object // 親コンポーネントからchartDataを受け取る
  },
  mounted () {
    this.renderChart(this.chartData)
  }
}
</script>
