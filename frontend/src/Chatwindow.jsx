import "./Chatwindow.css";
import Chat from "./Chat.jsx";
import { MyContext } from "./MyContext.jsx";
import { useContext, useState } from "react";
import { ScaleLoader } from "react-spinners";

export default function Chatwindow() {
  const {
    prompt,
    setPrompt,
    currThreadId,
    setReply,
    setPrevChats,
    setNewChat,
  } = useContext(MyContext);

  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  const getReply = async () => {
    if (!prompt.trim()) return;

    setNewChat(false);

    const userPrompt = prompt;

    // Add user message immediately
    setPrevChats((prev) => [
      ...prev,
      {
        role: "user",
        content: userPrompt,
      },
    ]);

    setPrompt("");
    setLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/api/chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: userPrompt,
            threadId: currThreadId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const res = await response.json();

      setReply(res.reply);

      setPrevChats((prev) => [
        ...prev,
        {
          role: "assistant",
          content: res.reply,
        },
      ]);
    } catch (error) {
      console.log(error);

      setPrevChats((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "⚠️ Astra is temporarily unavailable. Please try again later.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="chatWindow">
      <div className="navbar">
        <span>
          Astra &nbsp;
          <i className="fa-solid fa-angle-down"></i>
        </span>

        <div className="userIcon" onClick={handleProfileClick}>
          <span className="user">
            <i className="fa-solid fa-user"></i>
          </span>
        </div>
      </div>

      {isOpen && (
        <div className="dropDown">
          <div className="divItem">
            <i className="fa-solid fa-cloud-arrow-up"></i>
            &nbsp; Upgrade Plan
          </div>

          <div className="divItem">
            <i className="fa-solid fa-gear"></i>
            &nbsp; Settings
          </div>

          <div className="divItem">
            <i className="fa-solid fa-right-from-bracket"></i>
            &nbsp; Logout
          </div>
        </div>
      )}

      <Chat />

      <ScaleLoader color="#fff" loading={loading} />

      <div className="chatInput">
        <div className="userInput">
          <input
            placeholder="Ask Anything"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                getReply();
              }
            }}
          />

          <div id="submit" onClick={getReply}>
            <i className="fa-solid fa-paper-plane"></i>
          </div>
        </div>

        <p className="info">
          Astra can make mistakes. Check important info.
        </p>
      </div>
    </div>
  );
}