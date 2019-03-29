FROM python:3

WORKDIR /app

COPY ./fitness/fitnessapp.py /app
COPY ./fitness/fitnessCron.py /app
COPY ./fitness/requirements.txt /app
COPY ./fitness/fitnessconfig.ini /app

RUN pip install --trusted-host pypi.python.org -r requirements.txt

EXPOSE 5001

ENTRYPOINT ["python", "/app/fitnessapp.py"]
