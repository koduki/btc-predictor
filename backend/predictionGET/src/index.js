const Storage = require('@google-cloud/storage');

const filterByDay = (jsons, start) => {
  const allDays = jsons[0]['days']
  const allActual = jsons[0]['actual']
  const allPrediction = {}
  allPrediction['knn'] = jsons[0]['prediction']
  allPrediction['dtree'] = jsons[1]['prediction']

  const days = []
  const actual = []
  const knn = []
  const dtree = []
  for(let i=0; i<allDays.length; i++){ 
    if(allDays[i] >= start){
      days.push(allDays[i])
      if(allActual[i] != 0){
        actual.push(allActual[i])
      }
      knn.push(allPrediction['knn'][i])
      dtree.push(allPrediction['dtree'][i])
    }
  }
  return {version:'3', days:days, actual:actual, prediction:{'knn':knn, 'dtree':dtree}}
}

exports.predictionGET = (req, res) => {
  const storage = new Storage();

  const predictionKnn = storage
                .bucket('cn_orz_pascal-bitcoin_prediction')
                .file('btc_prediction_knn.json');

  const predictionDtree= storage
                .bucket('cn_orz_pascal-bitcoin_prediction')
                .file('btc_prediction_dtree.json');

  const knn = predictionKnn.download()
                            .then(function(data){
                              if (data) return data.toString('utf-8');
                            }).then(function(data){
                              return JSON.parse(data)
                            })
  const dtree = predictionDtree.download()
                            .then(function(data){
                              if (data) return data.toString('utf-8');
                            }).then(function(data){
                              return JSON.parse(data)
                            })
  
  Promise.all([knn, dtree]).then(function(values) {
    console.log('kdebug:' + values.length)
    if (values) {

      res.set('Access-Control-Allow-Origin', "*")
      res.set('Access-Control-Allow-Methods', 'GET, POST')
      res.writeHead(200, { 'Content-Type': 'application/json' })

      const rc = JSON.stringify(filterByDay(values, '2018-08-10'));
      res.end(rc);
    }
  })
}
