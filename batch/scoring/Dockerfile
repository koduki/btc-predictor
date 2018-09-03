FROM jupyter/scipy-notebook

RUN pip install --upgrade pip && pip install google-cloud

COPY scoring.py scoring.py
CMD python scoring.py