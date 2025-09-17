from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import SystemMessage, HumanMessage, AIMessage
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# Allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Restrict to frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure model
chatmodel = ChatGoogleGenerativeAI(
    model="gemini-1.5-flash",
    temperature=0.2,
    max_output_tokens=300
)

# System role prompt (improved for accuracy + structure)
chat_history = [
    SystemMessage(content="""
You are a helpful travel assistant for North Bengal tourism. 
Format your answers to fit in a small chatbot box:
- Use **short sentences** (max 2–3 lines per section).  
- Always give structured answers in this format:

**Overview:** A short 1–2 line intro.  
**Highlights:**  
- Place 1 – short description  
- Place 2 – short description  
- Place 3 – short description  
**Tip:** One practical travel tip (keep it short).

Do not write long paragraphs.  
Do not add extra headings, hashtags, or markdown that looks heavy.  
Keep the answer clear, simple, and easy to read inside a small chat bubble.  
If you don't know the answer, just say "Sorry, I don't have that information."
"""),
]

class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
async def chat_endpoint(request: ChatRequest):
    chat_history.append(HumanMessage(content=request.message))
    result = chatmodel.invoke(chat_history)

    # Save AI reply in history
    chat_history.append(AIMessage(content=result.content))

    # Return clean response
    return {
        "response": result.content.strip()
    }

