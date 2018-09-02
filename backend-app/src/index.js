const Storage = require('@google-cloud/storage');

const filterByDay = (json, start) => {
  const allDays = json['days']
  const allActual = json['actual']
  const allPrediction = json['prediction']

  const days = []
  const actual = []
  const prediction = []
  for(let i=0;i<allDays.length;i++){ 
    if(allDays[i] >= '2018-08-01'){
      days.push(allDays[i])
      actual.push(allActual[i])
      prediction.push(allPrediction[i])
    }
  }
  return {days:days, actual:actual, prediction:prediction}
}

exports.helloGET = (req, res) => {
  const storage = new Storage();

  const file = storage
                .bucket('cn_orz_pascal-bitcoin_prediction')
                .file('btc_prediction.json');

  file.download()
      .then(function(data){
        if (data) return data.toString('utf-8');
      })
      .then(function(data){
        if (data) {
            console.log(data);

            res.set('Access-Control-Allow-Origin', "*")
            res.set('Access-Control-Allow-Methods', 'GET, POST')
            res.writeHead(200, { 'Content-Type': 'application/json' })

            const r = JSON.stringify(filterByDay(JSON.parse(data), '2018-07-01'));
            res.end(r);
        }
      })  
}
