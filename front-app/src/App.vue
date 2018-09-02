<template>
  <div>
    <h2>明日のビットコインはいくら？</h2>
    <MyChart :chartData="chartData" :width="900" :height="300"/>
    <table>
      <body>
        <tr>
          <th>アルゴリズム</th>
          <th>70%</th>
          <th>80%</th>
          <th>90%</th>
          <th>説明</th>
        </tr>
        <tr>
          <td>KNeighbors</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>K近傍法。各値の距離から予想をするアルゴリズム</td>
        </tr>
      </body>
    </table>
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
    fillData () {
      const json = fetch('https://us-central1-koduki-docker-test-001-1083.cloudfunctions.net/helloGET')
      Promise.resolve(json).then(result => {
        return result.json()
      }).then(response => {
        this.chartData = {
          labels: response.days,
          datasets: [
            {
              label: '実測値(BTC/円)',
              borderColor: 'rgba(254,97,132,0.8)',
              backgroundColor: '#11ffee00',
              data: response.actual
            }, {
              label: 'KNeighbors',
              borderColor: 'rgba(54,164,235,0.8)',
              backgroundColor: '#11ffee00',
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
