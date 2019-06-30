FROM jupyter/scipy-notebook

USER root
RUN wget -O /usr/bin/hwrap https://storage.googleapis.com/shared-artifact/hwrap && chmod a+x /usr/bin/hwrap

USER jovyan
RUN pip install --upgrade pip && pip install google-cloud google-cloud-storage
COPY scoring.py scoring.py

EXPOSE $PORT
CMD /usr/bin/hwrap -p $PORT "python scoring.py"