import { useEffect, useRef } from "react";
import ChatInput from "./ChatInput";
import MessageBubble from "../components/MessageBubble";
import { askAI } from "../services/openrouter";

export default function ChatWindow({ chat, chats, setChats }) {
  const messagesEndRef = useRef(null);

  // ✅ AUTO SCROLL ONLY
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [chat?.messages]);

  // ✅ FIXED SUGGESTION FUNCTION (with API + typing)
  const sendSuggestion = async (text) => {

    if (!chat) return;

    // STEP 1: add user + empty AI message
    let updatedChats = chats.map((c) => {
      if (c.id === chat.id) {
        return {
          ...c,
          messages: [
            ...c.messages,
            { role: "user", content: text },
            { role: "assistant", content: "", typing: true }
          ],
        };
      }
      return c;
    });

    setChats(updatedChats);

    // STEP 2: call API
    const fullResponse = await askAI(text);

    // STEP 3: typing animation
    let i = 0;

    const interval = setInterval(() => {

      i++;

      updatedChats = updatedChats.map((c) => {

        if (c.id !== chat.id) return c;

        const msgs = [...c.messages];

        msgs[msgs.length - 1] = {
          ...msgs[msgs.length - 1],
          content: fullResponse.slice(0, i),
          typing: i !== fullResponse.length
        };

        return { ...c, messages: msgs };

      });

      setChats(updatedChats);

      if (i >= fullResponse.length) {
        clearInterval(interval);
      }

    }, 15);
  };

  return (
    <div className="chat-container">
      <div className="chat-inner">

        {/* MESSAGES */}
        <div className="messages">
          {chat?.messages?.length === 0 ? (
            <div className="landing">
              <h1>Hello there!</h1>
              <p>How can I help you today?</p>

              <div className="suggestions">

                <button onClick={() =>
                  sendSuggestion("What are the advantages of using Next.js?")
                }>
                  What are the advantages of using Next.js?
                </button>

                <button onClick={() =>
                  sendSuggestion("Write code to demonstrate Dijkstra's algorithm")
                }>
                  Write code to demonstrate Dijkstra's algorithm
                </button>

                <button onClick={() =>
                  sendSuggestion("Help me write an essay about Silicon Valley")
                }>
                  Help me write an essay about Silicon Valley
                </button>

                <button onClick={() =>
                  sendSuggestion("What is the weather in San Francisco?")
                }>
                  What is the weather in San Francisco?
                </button>

              </div>
            </div>
          ) : (
            <>
              {chat.messages.map((msg, index) => (
                <MessageBubble key={index} message={msg} />
              ))}

              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* INPUT */}
        <div className="chat-input-wrapper">
          <ChatInput chat={chat} chats={chats} setChats={setChats} />
        </div>

      </div>
    </div>
  );
}