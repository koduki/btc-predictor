README
===========

This is a back-end functions for btc-predictor.
This batch is base on Cloud Functions

Deploy
------------

```bash
gcloud functions deploy helloGET --stage-bucket btcp-cloud-functions-001 --trigger-http
```

Other Operations
-----------------

```bash
gcloud functions call helloGET
gcloud functions list
```