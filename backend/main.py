from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# ✅ Allow frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "AI First CRM Backend Running"}

@app.post("/log_chat_interaction")
async def log_chat(data: dict):
    message = data.get("message")

    # ✅ FINAL MOCK AI RESPONSE (stable)
    return {
        "hcp_name": "Dr Sharma",
        "hospital": "Apollo Hospital",
        "notes": f"Interaction recorded: {message}"
    }



