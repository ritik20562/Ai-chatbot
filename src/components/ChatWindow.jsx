import { useEffect, useRef } from "react";
import ChatInput from "./ChatInput";
import MessageBubble from "../components/MessageBubble";

export default function ChatWindow({ chat, chats, setChats }) {
  const messagesEndRef = useRef(null);

  // AUTO SCROLL
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [chat?.messages]);

  useEffect(() => {
    if (!chat || chat.messages.length === 0) return;

    const lastMessage = chat.messages[chat.messages.length - 1];

    if (!lastMessage.typing) return;

    const text = "AI response coming soon...";
    let i = 0;

    const interval = setInterval(() => {
      i++;

      setChats((prevChats) =>
        prevChats.map((c) => {
          if (c.id !== chat.id) return c;

          const updatedMessages = [...c.messages];

          updatedMessages[updatedMessages.length - 1] = {
            ...updatedMessages[updatedMessages.length - 1],
            content: text.slice(0, i),
            typing: i !== text.length,
          };

          return {
            ...c,
            messages: updatedMessages,
          };
        }),
      );

      if (i >= text.length) {
        clearInterval(interval);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [chat?.messages?.length]);

  useEffect(() => {
    const lastMessage = chat?.messages?.[chat.messages.length - 1];

    if (!lastMessage || !lastMessage.typing) return;

    const fullText = "AI response coming soon..."; // will replace later with real API
    let i = 0;

    const interval = setInterval(() => {
      i++;

      setChats((prevChats) =>
        prevChats.map((c) => {
          if (c.id !== chat.id) return c;

          const msgs = [...c.messages];
          msgs[msgs.length - 1] = {
            ...msgs[msgs.length - 1],
            content: fullText.slice(0, i),
          };

          return { ...c, messages: msgs };
        }),
      );

      if (i >= fullText.length) {
        clearInterval(interval);

        // remove typing flag
        setChats((prevChats) =>
          prevChats.map((c) => {
            if (c.id !== chat.id) return c;

            const msgs = [...c.messages];
            msgs[msgs.length - 1] = {
              ...msgs[msgs.length - 1],
              typing: false,
            };

            return { ...c, messages: msgs };
          }),
        );
      }
    }, 25);

    return () => clearInterval(interval);
  }, [chat?.messages]);

  // SUGGESTION FUNCTION
  const sendSuggestion = (text) => {
    const updatedChats = chats.map((c) => {
      if (c.id === chat.id) {
        return {
          ...c,
          messages: [
            ...c.messages,
            { role: "user", content: text },
            { role: "assistant", content: "AI response coming soon..." },
          ],
        };
      }

      return c;
    });

    setChats(updatedChats);
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
                <button
                  onClick={() =>
                    sendSuggestion("What are the advantages of using Next.js?")
                  }
                >
                  What are the advantages of using Next.js?
                </button>

                <button
                  onClick={() =>
                    sendSuggestion(
                      "Write code to demonstrate Dijkstra's algorithm",
                    )
                  }
                >
                  Write code to demonstrate Dijkstra's algorithm
                </button>

                <button
                  onClick={() =>
                    sendSuggestion(
                      "Help me write an essay about Silicon Valley",
                    )
                  }
                >
                  Help me write an essay about Silicon Valley
                </button>

                <button
                  onClick={() =>
                    sendSuggestion("What is the weather in San Francisco?")
                  }
                >
                  What is the weather in San Francisco?
                </button>
              </div>
            </div>
          ) : (
            <>
              {chat.messages.map((msg, index) => (
                <MessageBubble key={index} message={msg} />
              ))}
              {/* SCROLL TARGET */}
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
