FROM python:3

WORKDIR /app

COPY ./fitbit/fitbitapp.py /app
COPY ./fitbit/fitbitCron.py /app
COPY ./fitbit/requirements.txt /app

RUN pip install --trusted-host pypi.python.org -r requirements.txt

EXPOSE 5004

ENTRYPOINT ["python", "/app/fitbitapp.py"] 
