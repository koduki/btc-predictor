```bash
docker build -t koduki/ml-bitcoin/collector .
```

```bash
docker run -ti --name gcloud-config google/cloud-sdk gcloud auth login
docker run --rm -ti --volumes-from gcloud-config google/cloud-sdk gcloud compute instances list --project koduki-docker-test-001-1083
```

```bash
docker run --rm -ti --volumes-from gcloud-config koduki/ml-bitcoin/collector
```

```bash
gcloud container clusters get-credentials cluster-3 

docker build -t gcr.io/koduki-docker-test-001-1083/collector .
gcloud docker -- push gcr.io/koduki-docker-test-001-1083/collector


kubectl run "bmcollector14" --restart=OnFailure --image="gcr.io/koduki-docker-test-001-1083/collector"
kubectl create -f my-job.yaml
kubectl get job
kubectl describe jobs/btc-collector-batch-job2
kubectl log jobs/btc-collector-batch-job2
```

```bash
kubectl delete cronjob bmcollector
kubectl run "bmcollector" --schedule="*/1 * * * *" --restart=OnFailure --image="gcr.io/koduki-docker-test-001-1083/collector

kubectl get cronjob 
kubectl get jobs
kubectl get jobs --watch
kubectl log jobs/bmcollector-1532557140
```

memo

```
AccessDeniedException: 403 Insufficient OAuth2 scope to perform this operation. 
https://stackoverflow.com/questions/46497002/gcs-write-access-from-inside-a-gke-pod?noredirect=1&lq=1
```
