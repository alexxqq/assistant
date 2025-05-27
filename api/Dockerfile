FROM python:3.12-slim AS builder
WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends libpq-dev build-essential

COPY Pipfile Pipfile.lock ./

RUN pip install --no-cache-dir pipenv

RUN pipenv sync --dev --system

COPY . .

FROM python:3.12-slim

WORKDIR /app

COPY --from=builder /app .

EXPOSE 8000
    
CMD ["uvicorn", "main:app"]