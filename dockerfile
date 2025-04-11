FROM python:3.10.14

COPY OneButtonWebpage OneButtonWebpage

COPY ./requirements.txt OneButtonWebpage/app/requirements.txt

WORKDIR OnebuttonWebpage/app

RUN pip install -r requirements.txt

EXPOSE 8000

ENTRYPOINT [ "uvicorn" ]

CMD [ "--host", "0.0.0.0", "main:app" ]
