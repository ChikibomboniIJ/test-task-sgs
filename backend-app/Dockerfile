FROM python:3.12

RUN mkdir /backend-app

WORKDIR /backend-app

COPY req.txt .

RUN pip install -r req.txt

COPY . .