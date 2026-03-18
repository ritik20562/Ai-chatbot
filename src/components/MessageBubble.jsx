import { FiCopy, FiThumbsUp, FiThumbsDown } from "react-icons/fi";

export default function MessageBubble({ message }) {

const isUser = message.role === "user";

const copyMessage = () => {
  navigator.clipboard.writeText(message.content);
};

return (

<div className={`message-row ${isUser ? "user-row" : "assistant-row"}`}>


{/* Message */}
<div className="message-content">

<div className={`message ${isUser ? "user" : "assistant"}`}>
{message.content}
</div>

{/* AI Actions */}
{!isUser && (

<div className="message-actions">

  <button onClick={copyMessage}>
    <FiCopy size={14}/>
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