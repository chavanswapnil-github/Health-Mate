import React, { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import ReactMarkdown from "react-markdown";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hi! I'm your health assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");

  const chatbotRef = useRef(null);
  const pos = useRef({ x: 0, y: 0, offsetX: 0, offsetY: 0, dragging: false });

  useEffect(() => {
    const chatbot = chatbotRef.current;
    const header = chatbot?.querySelector(".chatbot-header");

    const mouseDown = (e) => {
      pos.current.dragging = true;
      pos.current.offsetX = e.clientX - chatbot.offsetLeft;
      pos.current.offsetY = e.clientY - chatbot.offsetTop;
      document.addEventListener("mousemove", mouseMove);
      document.addEventListener("mouseup", mouseUp);
    };

    const mouseMove = (e) => {
      if (!pos.current.dragging) return;
      chatbot.style.left = `${e.clientX - pos.current.offsetX}px`;
      chatbot.style.top = `${e.clientY - pos.current.offsetY}px`;
    };

    const mouseUp = () => {
      pos.current.dragging = false;
      document.removeEventListener("mousemove", mouseMove);
      document.removeEventListener("mouseup", mouseUp);
    };

    header?.addEventListener("mousedown", mouseDown);
    return () => header?.removeEventListener("mousedown", mouseDown);
  }, [isOpen]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setMessages([...messages, { from: "user", text: userMessage }]);
    setInput("");

    try {
      const res = await fetch("http://localhost:5000/api/gemini/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      console.log("Status:", res.status);

console.log("HTTP Status:", res.status);

const data = await res.json();

console.log("Backend Response:", data);

console.log("Response:", data);

      if (data.reply) {
        setMessages((prev) => [...prev, { from: "bot", text: data.reply }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { from: "bot", text: "Sorry, I couldn't understand that." },
        ]);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Something went wrong. Please try again later." },
      ]);
    }
  };

  return (
    <>
      {!isOpen && (
        <button
          className="position-fixed bottom-0 end-0 m-4 btn btn-success shadow"
          onClick={() => setIsOpen(true)}
          style={{
            zIndex: 1050,
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            padding: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/4712/4712027.png"
            alt="Bot Icon"
            style={{ width: "40px", height: "40px" }}
          />
        </button>
      )}

      {isOpen && (
        <div
          ref={chatbotRef}
          className="chatbot-container border shadow rounded bg-white d-flex flex-column"
          style={{
            position: "fixed",
            bottom: "90px",
            right: "20px",
            width: "350px",
            height: "450px",
            zIndex: 1051,
            resize: "both",
            overflow: "hidden",
          }}
        >
          <div
            className="chatbot-header bg-success text-white p-2 d-flex justify-content-between align-items-center"
            style={{ cursor: "move" }}
          >
            <strong>AI Chatbot</strong>
            <button
              className="btn btn-sm btn-outline-light"
              onClick={() => setIsOpen(false)}
            >
              <X size={16} />
            </button>
          </div>

          <div
            className="p-2 flex-grow-1"
            style={{ overflowY: "auto", background: "#f9f9f9" }}
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`mb-2 ${
                  msg.from === "user" ? "text-end" : "text-start"
                }`}
              >
                <span
                  className={`d-inline-block p-2 rounded ${
                    msg.from === "user"
                      ? "bg-success text-white"
                      : "bg-light border"
                  }`}
                  style={{ maxWidth: "80%", wordWrap: "break-word" }}
                >
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </span>
              </div>
            ))}
          </div>

          <div className="input-group p-2 border-top">
            <input
              type="text"
              className="form-control"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type a message..."
            />
            <button className="btn btn-success" onClick={sendMessage}>
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
