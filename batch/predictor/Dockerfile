FROM jupyter/scipy-notebook

RUN pip install --upgrade pip && pip install google-cloud

COPY predictor.py predictor.py
CMD python predictor.py