FROM python:3.11

WORKDIR /workspaces/BoozeOrNo/backend
COPY BoozeOrNo/backend/ ./backend/

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
