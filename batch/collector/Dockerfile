FROM google/cloud-sdk

RUN curl -o /usr/bin/hwrap https://storage.googleapis.com/shared-artifact/hwrap && chmod a+x /usr/bin/hwrap
RUN echo '\n\
#!/bin/bash
curl "https://api.coindesk.com/v1/bpi/historical/close.json?start=2018-01-01&end=$(date +%Y-%m-%d)" > btc_history.json \n\
gsutil cp btc_history.json gs://cn_orz_pascal-bitcoin_prediction/ \n\
gsutil ls -l gs://cn_orz_pascal-bitcoin_prediction/ \n\
gsutil ls -l gs://cn_orz_pascal-bitcoin_prediction/ \n\
' > run.sh

EXPOSE $PORT
CMD /usr/bin/hwrap -p $PORT "bash -x ./run.sh"