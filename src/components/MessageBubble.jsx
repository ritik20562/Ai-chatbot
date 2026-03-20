import { FiCopy, FiCheck, FiThumbsUp, FiThumbsDown } from "react-icons/fi";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function MessageBubble({ message }) {

  const isUser = message.role === "user";
  const [copied, setCopied] = useState(false);

  const copyText = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (

    <div className={`message-row ${isUser ? "user-row" : "assistant-row"}`}>

      <div className="message-content">

        {/* MESSAGE */}
        <div className={`message ${isUser ? "user" : "assistant"}`}>
          <ReactMarkdown>
            {message.content}
          </ReactMarkdown>
        </div>

        {/* ACTIONS */}
        {!isUser && (

          <div className="message-actions">

            <button onClick={copyText}>
              {copied ? <FiCheck size={14}/> : <FiCopy size={14}/>}
            </button>

            <button>
              <FiThumbsUp size={14}/>
            </button>

            <button>
              <FiThumbsDown size={14}/>
            </button>

          </div>

        )}

      </div>

    </div>

  );
}