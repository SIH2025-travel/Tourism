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
    allow_origins=["*"],  # You can restrict this to your React app URL later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

chatmodel = ChatGoogleGenerativeAI(model="gemini-2.5-flash", temperature=0.2, max_output_tokens=300)

chat_history = [
    SystemMessage(content="You are a helpful travel assistant for North Bengal tourism."),
]

class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
async def chat_endpoint(request: ChatRequest):
    chat_history.append(HumanMessage(content=request.message))
    result = chatmodel.invoke(chat_history)
    chat_history.append(AIMessage(content=result.content))
    return {"response": result.content}
