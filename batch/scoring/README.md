README
===========

This is a scoring batch container for btc-predictor.
This batch is base on k8s(GKE).

Init Project
-----------

```bash
gcloud config set project koduki-docker-test-001-1083
export PRJ_NAME=koduki-docker-test-001-1083
```

Build
-----------

Container tag name is required `gcr.io/{project name}/{container name}` format due to using Google Container Registry.

```bash
docker build -t gcr.io/${PRJ_NAME}/scoring .
gcloud docker -- push gcr.io/${PRJ_NAME}/scoring
```

Add Job
--------------

```bash
kubectl delete cronjob btcscoring
kubectl create -f my-job.yaml
```

Monitoring
---------------

```bash
kubectl get jobs
kubectl describe jobs/btcscoring
kubectl log jobs/btcscoring
```
