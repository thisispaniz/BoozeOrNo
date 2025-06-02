from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
import os
import psycopg2
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

app = FastAPI()

origins = [
    "https://boozeorno-frontend.onrender.com",  # Render frontend URL
]
# CORS configuration for prod!

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # don't use ["*"] in production with credentials
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# CORS configuration for dev!

#app.add_middleware(
#    CORSMiddleware,
#    allow_origins=["*"],  # Later, restrict this to frontend domain
#    allow_credentials=True,
#    allow_methods=["*"],
#    allow_headers=["*"],
#)

DATABASE_URL = os.getenv("SUPABASE_DB_URL")

@app.get("/search")
def search_medication(q: str = Query(..., description="Medication name or active ingredient")):
    # Connect to PostgreSQL from Supabase
    conn = psycopg2.connect(DATABASE_URL)
    cursor = conn.cursor()

    query = """
    SELECT symptoms_disorders, medication_brand, active_ingredient, alcohol_interaction
    FROM alcmedi
    WHERE medication_brand ILIKE %s OR active_ingredient ILIKE %s
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

# Run with: uvicorn main:app --host 0.0.0.0 --port 8000 --reload
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
