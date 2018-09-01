import * as Storage from "@google-cloud/storage"

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
            console.log("get file2 " + file.name);
            console.log(data);

            res.set('Access-Control-Allow-Origin', "*")
            res.set('Access-Control-Allow-Methods', 'GET, POST')
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(data);
        }
      })  
}
