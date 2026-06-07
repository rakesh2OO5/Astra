import "./Chatwindow.css";
import Chat from "./Chat.jsx";
export default function Chatwindow() {
  return (
    <div className="chatWindow">
      <div className="navbar">
        <span>
          Astra &nbsp;
          <i class="fa-solid fa-angle-down"></i>
        </span>
        <div className="userIcon">
          <i class="fa-solid fa-user"></i>
        </div>
      </div>
      <Chat></Chat>
      <div className="chatInput">
        <div className="userInput">
          <input type="text"placeholder="Ask Anuthing" />
          <div id="submit"><i class="fa-solid fa-paper-plane"></i></div>
        </div>
        <p className="info">Astra can make mistakes. Check important info.</p>
      </div>
    </div>
  );
}
