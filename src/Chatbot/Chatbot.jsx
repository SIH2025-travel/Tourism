import React, { useState } from "react";
import "./Chatbot.css";
import { FaCommentDots, FaTimes } from "react-icons/fa";
import ReactMarkdown from "react-markdown";


function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    try {
      const response = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      setMessages([...newMessages, { sender: "ai", text: data.response }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages([
        ...newMessages,
        { sender: "ai", text: "⚠️ Something went wrong. Try again!" },
      ]);
    }
  };

  return (
    <div className="chatbot-container">
      {/* Floating button */}
      {!open && (
        <button className="chatbot-toggle" onClick={() => setOpen(true)}>
          <FaCommentDots size={24} />
        </button>
      )}

      {/* Chatbox */}
      {open && (
        <div className="chatbox">
          <div className="chatbox-header">
            <h3>Chatbot</h3>
            <button className="close-btn" onClick={() => setOpen(false)}>
              <FaTimes />
            </button>
          </div>

          
            <div className="chatbox-messages">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={msg.sender === "user" ? "user-message" : "bot-message"}
                >
                  {msg.sender === "ai" ? (
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  ) : (
                    msg.text
                  )}
                </div>
              ))}
            </div>

         

          <div className="chatbox-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button className="send-btn" onClick={sendMessage}>
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chatbot;