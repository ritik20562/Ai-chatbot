import { useState, useEffect } from "react";
import Sidebar from "../layout/Sidebar";
import Topbar from "../layout/Topbar";
import ChatWindow from "../components/ChatWindow";

export default function Chat() {

  // ✅ LOAD chats from localStorage (safe)
  const [chats, setChats] = useState(() => {
    const saved = localStorage.getItem("chats");
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            title: "New Chat",
            messages: []
          }
        ];
  });

  // ✅ LOAD active chat id
  const [activeChatId, setActiveChatId] = useState(() => {
    const savedId = localStorage.getItem("activeChatId");
    return savedId ? JSON.parse(savedId) : 1;
  });

  // ✅ SAVE chats whenever updated
  useEffect(() => {
    localStorage.setItem("chats", JSON.stringify(chats));
  }, [chats]);

  // ✅ SAVE active chat id
  useEffect(() => {
    localStorage.setItem("activeChatId", JSON.stringify(activeChatId));
  }, [activeChatId]);

  // ✅ find active chat safely
  const activeChat = chats.find(chat => chat.id === activeChatId) || chats[0];

  // ✅ CREATE NEW CHAT
  const createNewChat = () => {
    const newChat = {
      id: Date.now(),
      title: "New Chat",
      messages: []
    };

    setChats(prev => [newChat, ...prev]);
    setActiveChatId(newChat.id);
  };

  // ✅ DELETE CHAT (safe fallback)
  const deleteChat = (id) => {

    const filtered = chats.filter(chat => chat.id !== id);

    setChats(filtered);

    if (filtered.length > 0) {
      setActiveChatId(filtered[0].id);
    } else {
      // if all chats deleted → create new one
      const newChat = {
        id: Date.now(),
        title: "New Chat",
        messages: []
      };

      setChats([newChat]);
      setActiveChatId(newChat.id);
    }
  };

  return (
    <div className="app-container">

      <Sidebar
        chats={chats}
        createNewChat={createNewChat}
        deleteChat={deleteChat}
        setActiveChatId={setActiveChatId}
      />

      <div className="main">

        <Topbar />

        <ChatWindow
          chat={activeChat}
          chats={chats}
          setChats={setChats}
        />

      </div>

    </div>
  );
}