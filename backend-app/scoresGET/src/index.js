const Storage = require('@google-cloud/storage');

exports.scoresGET = (req, res) => {
  const storage = new Storage();

  const file = storage
                .bucket('cn_orz_pascal-bitcoin_prediction')
                .file('btc_scores.json');

  file.download()
      .then(function(data){
        if (data) return data.toString('utf-8');
      })
      .then(function(data){
        if (data) {
            res.set('Access-Control-Allow-Origin', "*")
            res.set('Access-Control-Allow-Methods', 'GET, POST')
            res.writeHead(200, { 'Content-Type': 'application/json' })

            const r = data;
            res.end(r);
        }
      })  
}
