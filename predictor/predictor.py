import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsRegressor

import json
from google.cloud import storage as gcs

# configuration
project_name = 'koduki-docker-test-001-1083'
bucket_name = 'cn_orz_pascal-bitcoin_prediction'
input = 'btc_history.json'
output = 'btc_prediction.json'

# read data
client = gcs.Client(project_name)
blob = gcs.Blob(input, client.get_bucket(bucket_name))
content = blob.download_as_string()
btc_price  = json.loads(content)

# features
x = np.array([[int(k.replace("-", ''))] for k in btc_price['bpi'].keys()])
# targets
y = np.array([k for k in btc_price['bpi'].values()])

# training
train_x, test_x, train_y, test_y = train_test_split(x, y)
model = KNeighborsRegressor(n_neighbors=3)
model.fit(train_x, train_y)
print("Score : %f" % model.score(test_x, test_y))

# prediction
days = np.append(x, np.array([[20180902]]), axis=0)
predict_y = model.predict(days)
actual_y = np.append(y, np.array([0]), axis=0)

data  = {
    'days':list(map(lambda s: f'{s[0:4]}-{s[4:6]}-{s[6:8]}', map(lambda i: str(i[0]), days))),
    'actual':[float(i) for i in actual_y],
    'prediction':[float(i) for i in predict_y]
}

# write data
client = gcs.Client(project_name)
blob = gcs.Blob(output, client.get_bucket(bucket_name))
blob.upload_from_string(json.dumps(data))
