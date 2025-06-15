from fastapi import FastAPI, Query, HTTPException, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from supabase import create_client, Client
import os
from pydantic import BaseModel

app = FastAPI()

#@app.middleware("http")
#async def add_csp_header(request: Request, call_next):
#    response: Response = await call_next(request)
#    # Set your Content-Security-Policy header here
#    response.headers["Content-Security-Policy"] = "img-src 'self' https://.github.dev;"

origins = [
    "https://boozeorno-frontend.onrender.com", 
]
# CORS configuration (allows frontend to access backend in Codespaces)
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
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

class UserCredentials(BaseModel):
    email: str
    password: str
    

@app.post("/register")
def register_user(user: UserCredentials, request: Request):
    try:
        # Always use frontend URL for redirect
        redirect_url = "https://boozeorno-frontend.onrender.com/emailconfirmed"

        result = supabase.auth.sign_up(
            {
                "email": user.email,
                "password": user.password,
                "options": {
                    "email_redirect_to": redirect_url
                }
            }
        )
        if result.user is None:
            raise HTTPException(status_code=400, detail="Registration failed")
        return {"message": "User registered", "id": result.user.id}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))



@app.post("/login")
def login_user(user: UserCredentials):
    try:
        result = supabase.auth.sign_in_with_password({"email": user.email, "password": user.password})
        if result.session is None:
            raise HTTPException(status_code=401, detail="Login failed")
        return {"access_token": result.session.access_token}
    except Exception as e:
        raise HTTPException(status_code=401, detail=str(e))

@app.get("/autocomplete")
def autocomplete(q: str = Query(..., description="Partial search term")):
    try:
        response = supabase.table("alcmedi")\
            .select("symptoms_disorders, medication_brand, active_ingredient, alcohol_interaction")\
            .or_(
                f"symptoms_disorders.ilike.%{q}%,"
                f"medication_brand.ilike.%{q}%,"
                f"active_ingredient.ilike.%{q}%,"
                f"alcohol_interaction.ilike.%{q}%"
            )\
            .limit(10)\
            .execute()

        suggestions = set()
        for row in response.data:
            for key in ["symptoms_disorders", "medication_brand", "active_ingredient", "alcohol_interaction"]:
                if row.get(key):
                    suggestions.add(row[key])

        return list(suggestions)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/profile")
def get_profile(user=Depends(get_current_user)):
    uid = user.id
    response = supabase.table("userdata").select("*").eq("user_id", uid).maybe_single().execute()

    data = getattr(response, "data", None)

    # If no profile found, insert placeholder
    if not data:
        placeholder = {
            "user_id": uid,
            "email": user.email,
            "name": "Please fill in your name",
            "age": None,
            "sex": None,
            "location": "Please fill in your location",
            "weight": None,
            "meds": None,
        }
        insert_response = supabase.table("userdata").insert(placeholder).execute()
        time.sleep(1)
        response = supabase.table("userdata").select("*").eq("user_id", uid).maybe_single().execute()
        data = getattr(response, "data", None)

    # Return existing profile
    return data
    
@app.put("/profile")
def update_profile(profile: ProfileData, user=Depends(get_current_user)):
    uid = user.id
    try:
        update_data = {k: v for k, v in profile.dict().items() if v is not None}
        if not update_data:
            raise HTTPException(status_code=400, detail="No data provided for update")

        update_data["user_id"] = uid

        response = supabase.table("userdata").upsert(update_data, on_conflict="user_id").execute()

        if response.error:
            print("Supabase upsert error:", response.error)
            raise HTTPException(status_code=400, detail=response.error.message)

        refreshed = supabase.table("userdata").select("*").eq("user_id", uid).single().execute()

        if refreshed.error or refreshed.data is None:
            print("Supabase refresh error:", refreshed.error)
            raise HTTPException(status_code=500, detail="Failed to retrieve updated profile")

        return refreshed.data  # return the profile dict directly, not wrapped

    except Exception as e:
        print("Unexpected error in /profile PUT:", e)
        #raise HTTPException(status_code=500, detail="Internal server error")

@app.get("/search")
def search_medication(q: str = Query(..., description="Search term (medication, ingredient, interaction, etc.)")):
    try:
        response = supabase.table("alcmedi")\
            .select("*")\
            .or_(
                f"medication_brand.ilike.%{q}%,"
                f"active_ingredient.ilike.%{q}%,"
                f"alcohol_interaction.ilike.%{q}%,"
                f"symptoms_disorders.ilike.%{q}%"
            )\
            .limit(20)\
            .execute()

        return response.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))




    # Make sure uvicorn binds to 0.0.0.0, not localhost
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
