FROM google/cloud-sdk

RUN echo '\n\
curl "https://api.coindesk.com/v1/bpi/historical/close.json?start=2018-01-01&end=$(date +%Y-%m-%d)" > btc_history.json \n\
gsutil cp btc_history.json gs://cn_orz_pascal-bitcoin_prediction/ \n\
gsutil ls -l gs://cn_orz_pascal-bitcoin_prediction/ \n\
' > run.sh

CMD sh -x run.sh