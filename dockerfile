FROM python:3.10.14

COPY ./requirements.txt OneButtonWebpage/app/requirements.txt

WORKDIR OnebuttonWebpage/app

RUN pip3 install -r requirements.txt

EXPOSE 8000

ENTRYPOINT [ "uvicorn" ]

CMD [ "--host", "0.0.0.0", "main:app" ]
