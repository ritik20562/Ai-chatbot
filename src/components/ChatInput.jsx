import { useState, useRef, useEffect } from "react";
import { askAI } from "../services/openrouter";

export default function ChatInput({ chat, chats, setChats }) {

  const [input, setInput] = useState("");
  const inputRef = useRef(null);

  // AUTO FOCUS INPUT
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // SEND MESSAGE
  const sendMessage = async () => {

    if (!input.trim()) return;

    const userMessage = input;
    setInput("");

    // Add user message first (fast UI)
    let updatedChats = chats.map((c) => {
      if (c.id === chat.id) {
        return {
          ...c,
          messages: [
            ...c.messages,
            { role: "user", content: userMessage },
            { role: "assistant", content: "Typing..." }
          ]
        };
      }
      return c;
    });

    setChats(updatedChats);

    try {
      // Get AI response
      const aiReply = await askAI(userMessage);

      // Replace "Typing..." with real response
      updatedChats = updatedChats.map((c) => {
        if (c.id === chat.id) {
          const msgs = [...c.messages];
          msgs[msgs.length - 1] = {
            role: "assistant",
            content: aiReply
          };
          return { ...c, messages: msgs };
        }
        return c;
      });

      setChats(updatedChats);

    } catch (error) {
      console.error(error);
    }

    // keep focus after send
    inputRef.current?.focus();
  };

  // ENTER KEY SEND
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="input-area">

      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Send a message..."
      />

      <button onClick={sendMessage}>
        ↑
      </button>

    </div>
  );
}