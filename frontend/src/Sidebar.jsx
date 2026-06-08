import "./Sidebar.css";
import { useContext, useEffect } from "react";
import { MyContext } from "./MyContext.jsx";
import { v1 as uuidv1 } from "uuid";

export default function Sidebar() {
  const {
    allThreads,
    setAllThreads,
    setCurrThreadId,
    setPrevChats,
    setNewChat,
    setPrompt,
    setReply,
    currThreadId,
  } = useContext(MyContext);

  const API_URL = import.meta.env.VITE_API_URL;

  const getAllThreads = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/thread`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch threads");
      }

      const res = await response.json();

      const filteredData = res.map((thread) => ({
        threadId: thread.threadId,
        title: thread.title,
      }));

      setAllThreads(filteredData);
    } catch (error) {
      console.log(error);
    }
  };

  const loadThread = async (threadId) => {
    try {
      const response = await fetch(
        `${API_URL}/api/thread/${threadId}`
      );

      if (!response.ok) {
        throw new Error("Failed to load thread");
      }

      const messages = await response.json();

      setCurrThreadId(threadId);

      // Reset typing animation state
      setReply(null);

      setPrevChats(messages);

      setNewChat(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllThreads();
  }, []);

  const createNewChat = () => {
    setNewChat(true);

    setPrompt("");

    setReply(null);

    setPrevChats([]);

    setCurrThreadId(uuidv1());
  };

  const deleteThread = async (threadId) => {
    try {
      const response = await fetch(
        `${API_URL}/api/thread/${threadId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete thread");
      }

      await response.json();

      setAllThreads((prev) =>
        prev.filter(
          (thread) => thread.threadId !== threadId
        )
      );

      if (currThreadId === threadId) {
        createNewChat();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="sidebar">
      <button onClick={createNewChat}>
        <img src="/logo.png" alt="logo" className="logo" />

        <span>
          <i className="fa-solid fa-pen-to-square"></i>
        </span>
      </button>

      <ul className="history">
        {allThreads?.map((thread) => (
          <li
            key={thread.threadId}
            onClick={() =>
              loadThread(thread.threadId)
            }
            className={
              thread.threadId === currThreadId
                ? "highlighted"
                : ""
            }
          >
            <span>{thread.title}</span>

            <i
              className="fa-solid fa-trash"
              onClick={(e) => {
                e.stopPropagation();
                deleteThread(thread.threadId);
              }}
            ></i>
          </li>
        ))}
      </ul>

      <div className="sign">
        <p>
          Astra — Guiding curiosity beyond answers
        </p>
      </div>
    </section>
  );
}