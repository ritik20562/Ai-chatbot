import {
  FiSearch,
  FiStar,
  FiMessageSquare,
  FiSettings,
  FiTrash2
} from "react-icons/fi";

export default function Sidebar({ chats, createNewChat, deleteChat, setActiveChatId }) {

  return (
    <div className="sidebar">

      {/* Header */}
      <h2 className="sidebar-title">Chatbot</h2>

      {/* New Chat */}
      <button className="new-chat-btn" onClick={createNewChat}>
        + New Chat
      </button>

      {/* Search */}
      <div className="search-box">
        <FiSearch />
        <input placeholder="Search chats..." />
      </div>

      {/* Pinned */}
      <div className="chat-section">
        <p className="section-title">Pinned</p>

        <div className="chat-item">
          <FiStar />
          React project
        </div>

        <div className="chat-item">
          <FiStar />
          Portfolio ideas
        </div>
      </div>

      {/* Chat List */}
      <div className="chat-section">
        <p className="section-title">Today</p>
        <div className="chat-item">
  <FiMessageSquare />
  How to build react app
</div>

        {chats.map((chat) => (

          <div
            key={chat.id}
            className="chat-item"
            onClick={() => setActiveChatId(chat.id)}
          >

            <FiMessageSquare />

            <span className="chat-title">

              {chat.messages.length > 0
                ? chat.messages[0].content.slice(0, 25)
                : "New Chat"}

            </span>

            <FiTrash2
              className="delete-icon"
              onClick={(e) => {
                e.stopPropagation();
                deleteChat(chat.id);
              }}
            />

          </div>

        ))}

      </div>

      {/* Bottom */}
      <div className="sidebar-bottom">

        <div className="user-profile">
          <span className="avatar"></span>
          Ritik Chauhan
        </div>

        <div className="settings">
          <FiSettings />
          Settings
        </div>

      </div>

    </div>
  );
}