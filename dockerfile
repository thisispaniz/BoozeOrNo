FROM python:3.10.14

RUN pip install -r requirements.txt

COPY OneButtonWebpage OneButtonWebpage

WORKDIR OnebuttonWebpage/app

EXPOSE 8000

ENTRYPOINT [ "uvicorn" ]

CMD [ "--host", "0.0.0.0", "main:app" ]
