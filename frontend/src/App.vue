<template>
  <div>
    <h2>明日のビットコインはいくら？</h2>
    <MyChart :chartData="chartData" :width="800" :height="300" />
    <table class="table table-striped">
      <body>
        <tr>
          <th scope="col">アルゴリズム</th>
          <th scope="col">95%</th>
          <th scope="col">98%</th>
          <th scope="col">99%</th>
          <th scope="col">最新予想</th>
          <th scope="col">説明</th>
        </tr>
        <tr>
          <td scope="row">KNeighbors</td>
          <td>{{score['knn'][0]}}</td>
          <td>{{score['knn'][1]}}</td>
          <td>{{score['knn'][2]}}</td>
          <td>${{Math.round(score['knn'][3])}}</td>
          <td>K近傍法。各値の距離から予想をするアルゴリズム</td>
        </tr>
        <tr>
          <td scope="row">DecisionTree</td>
          <td>{{score['dtree'][0]}}</td>
          <td>{{score['dtree'][1]}}</td>
          <td>{{score['dtree'][2]}}</td>
          <td>${{Math.round(score['dtree'][3])}}</td>
          <td>決定木。条件分岐を重ねていき最も近い値を選択するアルゴリズム</td>
        </tr>
      </body>
    </table>
  </div>
</template>

<script>

// インポート
import MyChart from './components/MyChart'
export default {
  name: 'BTC-Prediction',
  components: {
    MyChart
  },
  data () {
    return {
      chartData: {},
      score: {'KNeighbors': [0, 0, 0, 0]}
    }
  },
  methods: {
    getPredictions () {
      const json = fetch('https://us-central1-koduki-docker-test-001-1083.cloudfunctions.net/predictionGET')
      Promise.resolve(json).then(result => {
        return result.json()
      }).then(response => {
        this.chartData = {
          labels: response.days,
          datasets: [
            {
              label: '実測値(BTC/USD)',
              borderColor: 'rgba(254,97,132,0.8)',
              backgroundColor: '#11ffee00',
              data: response.actual
            }, {
              label: 'KNeighbors',
              borderColor: 'rgba(54,164,235,0.8)',
              backgroundColor: '#11ffee00',
              data: response.prediction['knn']
            }, {
              label: 'DecisionTree',
              borderColor: '#00F9A9',
              backgroundColor: '#11ffee00',
              data: response.prediction['dtree']
            }
          ]
        }
      }).catch(error => {
        console.log(error)
      })
    },
    getScores () {
      const json = fetch('https://us-central1-koduki-docker-test-001-1083.cloudfunctions.net/scoresGET')
      Promise.resolve(json).then(result => {
        return result.json()
      }).then(response => {
        this.score = response
      }).catch(error => {
        console.log(error)
      })
    }
  },
  created () {
    this.getPredictions()
    this.getScores()
  }
}
</script>
