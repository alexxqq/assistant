FROM python:3.13-slim

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends libpq-dev build-essential

COPY Pipfile Pipfile.lock ./

RUN pip install --no-cache-dir pipenv

RUN pipenv sync --dev --system

COPY . .

EXPOSE 8000

CMD ["uvicorn", "app.main:app"]
