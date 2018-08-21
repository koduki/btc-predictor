exports.helloGET = (req, res) => {
  const Storage = require('@google-cloud/storage');
  const storage = new Storage();

  const file = storage
                .bucket('cn_orz_pascal-bitcoin_prediction')
                .file('btc_prediction.json');

  console.log("kdebug2:" + file);

  file.download()
      .then(function(data){
        if (data)
            return data.toString('utf-8');
      })
      .then(function(data){
        if (data) {
            console.log("get file "+file.name);
            console.log(data);
            res.set('Access-Control-Allow-Origin', "*")
            res.set('Access-Control-Allow-Methods', 'GET, POST')
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(data);
        }
      })  
}