import React, { useEffect, useState } from "react";
import "./Chat.css";
import sendbtnLogo from "./sendBtnLogo.png";
import closeBtnLogo from "./closeBtnLogo.png";
import { user } from "../Welcome/Welcome";
import Message from "../Message/Message";
import socketIO from "socket.io-client";
import ReactScrollToBottom from "react-scroll-to-bottom";

let socket;
const ENDPOINT = "http://localhost:4500/";

const Chat = () => {
  const [id, setId] = useState("");
  const [messages, setMessages] = useState([]);

  const send = () => {
    const message = document.getElementById("chatInput").value;
    socket.emit("message", { id, message });
    document.getElementById("chatInput").value = "";
  };

  useEffect(() => {
    socket = socketIO(ENDPOINT, { transports: ["websocket"] });

    socket.on("connect", () => {
      setId(socket.id);
    });

    socket.emit("joined", { user });

    socket.on("welcome", (data) => {
      setMessages([...messages, data]);
    });

    socket.on("userJoined", (data) => {
      setMessages([...messages, data]);
    });

    socket.on("leave", (data) => {
      setMessages([...messages, data]);
    });

    return () => {
      socket.emit("disconnected");
      socket.off();
    };
  }, []);

  useEffect(() => {
    socket.on("sendMessage", (data) => {
      setMessages([...messages, data]);
    });

    return () => {
      socket.off();
    };
  }, [messages]);

  return (
    <div className="chatPage">
      <div className="chatContainer">
        <div className="chatHeader">
          <h2>Chats</h2>
          <a href="/">
            <img src={closeBtnLogo} alt="Close" />
          </a>
        </div>
        <ReactScrollToBottom className="chatBox">
          {messages.map((item, index) => (
            <Message
              user={item.id === id ? "" : item.user}
              message={item.message}
              conditionalClass={item.id === id ? "right" : "left"}
            />
          ))}
        </ReactScrollToBottom>
        <div className="inputBox">
          <input
            onKeyDown={(event) => (event.key === "Enter" ? send() : null)}
            type="text"
            id="chatInput"
            placeholder="Message..."
          />
          <button onClick={send} className="sendBtn">
            <img src={sendbtnLogo} alt="Send" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
