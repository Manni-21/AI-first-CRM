from langchain_groq import ChatGroq
from langgraph.graph import StateGraph
from typing import TypedDict
import json
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Get API key
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

if not GROQ_API_KEY:
    raise ValueError("GROQ_API_KEY is missing in .env file")


# Define State Schema
class State(TypedDict):
    message: str
    structured_output: dict


# Initialize LLM
llm = ChatGroq(
    model="gemma2-9b-it",
    api_key=GROQ_API_KEY
)


# Core function
def extract_interaction(state: State):
    try:
        user_message = state.get("message", "")

        if not user_message:
            return {
                "structured_output": {
                    "hcp_name": "Unknown",
                    "hospital": "Unknown",
                    "notes": "Empty message"
                }
            }

        prompt = f"""
Extract structured CRM interaction details.

Text:
{user_message}

Return ONLY JSON:

{{
  "hcp_name": "",
  "hospital": "",
  "notes": ""
}}
"""

        response = llm.invoke(prompt)

        text = response.content.strip()

        # Remove markdown formatting if exists
        if "```" in text:
            text = text.replace("```json", "").replace("```", "").strip()

        try:
            structured = json.loads(text)
        except Exception:
            structured = {
                "hcp_name": "Unknown",
                "hospital": "Unknown",
                "notes": text
            }

        return {"structured_output": structured}

    except Exception as e:
        return {
            "structured_output": {
                "hcp_name": "Error",
                "hospital": "Error",
                "notes": str(e)
            }
        }


# Build LangGraph
builder = StateGraph(State)

builder.add_node("extract", extract_interaction)
builder.set_entry_po




