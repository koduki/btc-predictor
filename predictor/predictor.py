import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsRegressor

import json
from google.cloud import storage as gcs

# configuration
project_name = 'koduki-docker-test-001-1083'
bucket_name = 'cn_orz_pascal-bitcoin_prediction'
fname = 'btc_history.json'
fname2 = 'btc_prediction.json'

# read data
client = gcs.Client(project_name)
blob = gcs.Blob(fname, client.get_bucket(bucket_name))
content = blob.download_as_string()
btc_price  = json.loads(content)

# features
x = np.array([[int(k.replace("-", ''))] for k in btc_price['bpi'].keys()])
# targets
y = np.array([k for k in btc_price['bpi'].values()])

# training
train_x,test_x,train_y,test_y = train_test_split(x, y)
model = KNeighborsRegressor(n_neighbors=3)
model.fit(train_x, train_y)

# predict
print("Score : %f" % model.score(test_x, test_y))
py = model.predict(x)

data  = {
    'days':list(map(lambda s: f'{s[0:4]}-{s[4:6]}-{s[6:8]}', map(lambda i: str(i[0]), x))),
    'actual':[float(i) for i in y],
    'prediction':[float(i) for i in py]
}

# write data
client = gcs.Client(project_name)
blob = gcs.Blob(fname2, client.get_bucket(bucket_name))
blob.upload_from_string(json.dumps(data))
