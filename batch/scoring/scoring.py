import json
import datetime
from google.cloud import storage as gcs

# configuration
project_name = 'koduki-docker-test-001-1083'
bucket_name = 'cn_orz_pascal-bitcoin_prediction'
btc_history_file = 'btc_history.json'
btc_prediction_file = 'btc_prediction.json'
btc_scores_file = 'btc_scores.json'

# read data
client = gcs.Client(project_name)

blob = gcs.Blob(btc_history_file, client.get_bucket(bucket_name))
content = blob.download_as_string()
btc_history  = json.loads(content)

blob = gcs.Blob(btc_prediction_file, client.get_bucket(bucket_name))
content = blob.download_as_string()
btc_prediction  = json.loads(content)

blob = gcs.Blob(btc_scores_file, client.get_bucket(bucket_name))
content = blob.download_as_string()
btc_scores = json.loads(content)

# calc
today = (datetime.date.today() - datetime.timedelta(days=2)).strftime("%Y-%m-%d")
latest_actual = btc_history['bpi'][today]
latest_prediction = btc_prediction['prediction'][-1]
before_prediction = btc_prediction['prediction'][-2]

if latest_actual > before_prediction:
    a = before_prediction
    b = latest_actual
else:
    a = latest_actual
    b = before_prediction

r = a / b

xs = btc_scores['KNeighbors']
btc_scores['KNeighbors'] = [xs[0] + (0 if 0.95 <= r and r > 0.98 else 1), xs[1] + (0 if 0.98 <= r and r > 0.99 else 1), xs[2] + (0 if r <= 0.99 else 1), latest_prediction]

# write data
client = gcs.Client(project_name)
blob = gcs.Blob(btc_scores_file, client.get_bucket(bucket_name))
blob.upload_from_string(json.dumps(btc_scores))
