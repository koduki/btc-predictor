<template>
  <div>
    <h2>BTC予想</h2>
    <MyChart :chartData="chartData"/>
  </div>
</template>

<script>
// インポート
import MyChart from './components/MyChart'

export default {
  name: 'Test',
  components: {
    MyChart
  },
  data () {
    return {
      chartData: {}
    }
  },
  methods: {
    // chartDataのdatasets.dataを埋める
    fillData () {
      const json = fetch('https://us-central1-koduki-docker-test-001-1083.cloudfunctions.net/helloGET')
      Promise.resolve(json).then(result => {
        return result.json()
      }).then(response => {
        this.chartData = {
          labels: response.days,
          datasets: [
            {
              label: 'BTC実測値(円)',
              borderColor: 'rgba(254,97,132,0.8)',
              backgroundColor: 'rgba(254,97,132,0.5)',
              data: response.actual
            }, {
              label: 'BTC予想値(円)',
              borderColor: 'rgba(54,164,235,0.8)',
              backgroundColor: 'rgba(54,164,235,0.5)',
              data: response.prediction
            }
          ]
        }
      }).catch(error => {
        console.log(error)
      })
    }
  },
  created () {
    this.fillData() // インスタンス作成時にfillDataを実行
  }
}
</script>
