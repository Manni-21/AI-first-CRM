from pydantic import BaseModel

class InteractionCreate(BaseModel):
    message: str
