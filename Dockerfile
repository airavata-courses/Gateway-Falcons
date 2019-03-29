FROM python:3

WORKDIR /app

COPY ./diet/dietapp.py /app
COPY ./diet/dietconfig.ini /app
COPY ./diet/requirements.txt /app
COPY ./scripts/dietexpect.sh  /app
COPY ./scripts/dietscript.sh /app
COPY ./scripts/entrypoint.sh /app

RUN apt-get update && apt-get install -y expect
RUN pip install --trusted-host pypi.python.org -r requirements.txt
RUN chmod +x dietexpect.sh
RUN chmod +x dietscript.sh
RUN chmod +x entrypoint.sh
EXPOSE 5000

ENTRYPOINT ["./entrypoint.sh"]
CMD ["python", "/app/dietapp.py"]
