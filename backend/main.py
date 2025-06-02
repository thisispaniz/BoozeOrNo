from fastapi import FastAPI, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import os
from supabase import create_client, Client
import logging

app = FastAPI()

# CORS configuration for production
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://boozeorno-frontend.onrender.com/"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Supabase client setup
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise RuntimeError("SUPABASE_URL or SUPABASE_KEY is not set in environment variables.")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

@app.get("/search")
def search_medication(q: str = Query(..., description="Medication name or active ingredient")):
    try:
        response = (
            supabase
            .table("alcmedi")
            .select("*")  # fetch all columns
            .or_(f"medication_brand.ilike.%{q}%,active_ingredient.ilike.%{q}%")
            .limit(10)
            .execute()
        )


        logging.info(f"Supabase response: {response.model_dump_json(indent=2)}")

        if not response.data:
            raise HTTPException(status_code=404, detail="No matching entries found")

        return response.data

    except Exception as e:
        logging.exception("Supabase query failed")
        raise HTTPException(status_code=500, detail=str(e))

# For local dev only:
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
