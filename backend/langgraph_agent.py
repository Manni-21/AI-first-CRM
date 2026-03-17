from langchain_groq import ChatGroq
from langgraph.graph import StateGraph
from typing import TypedDict
import json

class State(TypedDict):
    message: str
    structured_output: dict

llm = ChatGroq(
    model="gemma2-9b-it",
    api_key="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"   # 🔑 paste your key
)

def extract_interaction(state):
    prompt = f"""
Extract structured data from this text:

{state['message']}

Return JSON:
{{
 "hcp_name": "",
 "hospital": "",
 "notes": ""
}}
"""

    response = llm.invoke(prompt)

    try:
        data = json.loads(response.content)
    except:
        data = {
            "hcp_name": "Unknown",
            "hospital": "Unknown",
            "notes": response.content
        }

    return {"structured_output": data}

builder = StateGraph(State)
builder.add_node("extract", extract_interaction)
builder.set_entry_point("extract")

graph = builder.compile()


