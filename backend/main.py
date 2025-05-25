from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
import sqlite3
import os
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

app = FastAPI()

# CORS configuration (allows frontend to access backend in Codespaces)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # this will be our actual URL later in progress
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Path to your SQLite database inside the container
DB_PATH = "/workspaces/BoozeOrNo/db/alcohol_interaction_data.db"

@app.get("/search")
def search_medication(q: str = Query(..., description="Medication name or active ingredient")):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    query = """
    SELECT symptoms_disorders, medication_brand, active_ingredient, alcohol_interaction
    FROM alcmedi
    WHERE medication_brand LIKE ? OR active_ingredient LIKE ?
    LIMIT 10;
    """
    wildcard_query = f"%{q}%"
    cursor.execute(query, (wildcard_query, wildcard_query))
    results = cursor.fetchall()

    conn.close()

    return [
        {
            "symptoms_disorders": row[0],
            "medication_brand": row[1],
            "active_ingredient": row[2],
            "alcohol_interaction": row[3]
        }
        for row in results
    ]

# app.mount("/", StaticFiles(directory="frontend", html=True), name="frontend")

    # Make sure uvicorn binds to 0.0.0.0, not localhost
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)