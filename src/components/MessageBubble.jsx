import { FiCopy, FiCheck, FiThumbsUp, FiThumbsDown } from "react-icons/fi";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

// syntax highlighter
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function MessageBubble({ message }) {

  const isUser = message.role === "user";
  const [copied, setCopied] = useState(false);

  const copyText = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className={`message-row ${isUser ? "user-row" : "assistant-row"}`}>

      <div className="message-content">

        {/* MESSAGE */}
        <div className={`message ${isUser ? "user" : "assistant"}`}>

          <ReactMarkdown
            components={{
              code({ inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");

                return !inline ? (
                  <SyntaxHighlighter
                    style={vscDarkPlus}
                    language={match ? match[1] : "javascript"}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              }
            }}
          >
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