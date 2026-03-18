import { useState, useRef, useEffect } from "react";

export default function ChatInput({ chat, chats, setChats }) {

  const [input, setInput] = useState("");
  const inputRef = useRef(null);

  // AUTO FOCUS INPUT
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // SEND MESSAGE
  const sendMessage = () => {

    if (!input.trim() || !chat) return;

    const updatedChats = chats.map((c) => {

      if (c.id === chat.id) {

        const newMessages = [
          ...c.messages,
          { role: "user", content: input },
         { role: "assistant", content: "", typing: true }
        ];

        return {
          ...c,
          title: c.messages.length === 0 ? input : c.title,
          messages: newMessages
        };
      }

      return c;
    });

    setChats(updatedChats);
    setInput("");

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