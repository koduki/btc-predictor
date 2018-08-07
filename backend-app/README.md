 5846  gcloud functions deploy helloGET --stage-bucket btcp-cloud-functions-001 --trigger-http
 5847  gcloud functions call helloGET
gcloud functions list

curl https://us-central1-koduki-docker-test-001-1083.cloudfunctions.net/helloGET
gsutil mb gs://btcp-cloud-functions-001

