README
===========

This is a predictor batch container for btc-predictor.
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
docker build -t gcr.io/${PRJ_NAME}/predictor .
gcloud docker -- push gcr.io/${PRJ_NAME}/predictor
```

Add Job
--------------

```bash
kubectl delete cronjob btcollector
kubectl run "btcollector" --schedule="50 23 * * * " --restart=OnFailure --image="gcr.io/${PRJ_NAME}/predictor"
```

Monitoring
---------------

```bash
kubectl get jobs
kubectl describe jobs/btcollector
kubectl log jobs/btcollector
```