import { useState } from "react";
import Sidebar from "../layout/Sidebar";
import Topbar from "../layout/Topbar";
import ChatWindow from "../components/ChatWindow";

export default function Chat() {

  const [chats, setChats] = useState([
    {
      id: 1,
      title: "New Chat",
      messages: []
    }
  ]);

  const [activeChatId, setActiveChatId] = useState(1);

  const activeChat = chats.find(chat => chat.id === activeChatId);

  const createNewChat = () => {
    const newChat = {
      id: Date.now(),
      title: "New Chat",
      messages: []
    };

    setChats([newChat, ...chats]);
    setActiveChatId(newChat.id);
  };

  const deleteChat = (id) => {

  const filtered = chats.filter(chat => chat.id !== id);

  setChats(filtered);

  if (filtered.length > 0) {
    setActiveChatId(filtered[0].id);
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