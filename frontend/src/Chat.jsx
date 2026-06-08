import { useContext, useEffect, useState } from "react";
import { MyContext } from "./MyContext.jsx";
import "./Chat.css";

import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";

import "highlight.js/styles/github-dark.css";

export default function Chat() {
  const { newChat, prevChats, reply } =
    useContext(MyContext);

  const [latestReply, setLatestReply] =
    useState("");

  useEffect(() => {
    if (!reply) {
      setLatestReply("");
      return;
    }

    const hasTable =
      reply.includes("|---") ||
      reply.includes("| ---");

    if (hasTable) {
      setLatestReply(reply);
      return;
    }

    let idx = 0;

    setLatestReply("");

    const interval = setInterval(() => {
      setLatestReply(reply.slice(0, idx + 1));

      idx++;

      if (idx >= reply.length) {
        clearInterval(interval);
      }
    }, 5);

    return () => clearInterval(interval);
  }, [reply]);

  return (
    <>
      {newChat && <h1>Start A New Chat</h1>}

      <div className="chats">
        {prevChats.map((chat, idx) => {
          const isLatestAssistant =
            reply &&
            idx === prevChats.length - 1 &&
            chat.role === "assistant";

          return (
            <div
              key={idx}
              className={
                chat.role === "user"
                  ? "userDiv"
                  : "gptDiv"
              }
            >
              {chat.role === "user" ? (
                <p className="userMessage">
                  {chat.content}
                </p>
              ) : (
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight]}
                >
                  {isLatestAssistant
                    ? latestReply
                    : chat.content}
                </ReactMarkdown>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}