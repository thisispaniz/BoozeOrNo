from fastapi import FastAPI, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import os
import psycopg2
# from fastapi.staticfiles import StaticFiles
# from fastapi.responses import FileResponse

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

# Supabase client setup
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# CORS configuration for dev!

#app.add_middleware(
#    CORSMiddleware,
#    allow_origins=["*"], # <-- for prod, must be restricted to the dedicated port
#    allow_credentials=True,
#    allow_methods=["*"],
#    allow_headers=["*"],
#)

@app.get("/search")
def search_medication(q: str = Query(..., description="Medication name or active ingredient")):
    try:
        response = (
            supabase
            .from_("alcmedi")
            .select("symptoms_disorders,medication_brand,active_ingredient,alcohol_interaction")
            .or_(f"medication_brand.ilike.%{q}%,active_ingredient.ilike.%{q}%")
            .limit(10)
            .execute()
        )
        if response.status_code != 200:
            raise HTTPException(status_code=500, detail="Failed to query Supabase")

        data = response.data
        return [
            {
                "symptoms_disorders": row["symptoms_disorders"],
                "medication_brand": row["medication_brand"],
                "active_ingredient": row["active_ingredient"],
                "alcohol_interaction": row["alcohol_interaction"],
            }
            for row in data
        ]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# app.mount("/", StaticFiles(directory="frontend", html=True), name="frontend")

# Run with: uvicorn main:app --host 0.0.0.0 --port 8000 --reload
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
