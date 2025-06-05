from fastapi import FastAPI, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from supabase import create_client, Client
import os

app = FastAPI()

# CORS (adjust for production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Supabase client setup
SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise ValueError("SUPABASE_URL and SUPABASE_KEY must be set as environment variables")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# /register endpoint
@app.post("/register")
def register_user(email: str, password: str):
    try:
        result = supabase.auth.sign_up({"email": email, "password": password})
        if result.user is None:
            raise HTTPException(status_code=400, detail="Registration failed")
        return {"message": "User registered", "id": result.user.id}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# /login endpoint
@app.post("/login")
def login_user(email: str, password: str):
    try:
        result = supabase.auth.sign_in_with_password({"email": email, "password": password})
        if result.session is None:
            raise HTTPException(status_code=401, detail="Login failed")
        return {"access_token": result.session.access_token}
    except Exception as e:
        raise HTTPException(status_code=401, detail=str(e))

# /search endpoint
@app.get("/search")
def search_medication(q: str = Query(..., description="Medication name or active ingredient")):
    try:
        response = supabase.table("alcmedi")\
            .select("alcohol_interaction")\
            .or_(f"medication_brand.ilike.%{q}%,active_ingredient.ilike.%{q}%")\
            .limit(10)\
            .execute()

        return response.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


    # Make sure uvicorn binds to 0.0.0.0, not localhost
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
