// src/Chat.tsx
import React, { useState } from "react";
import { Message, Sender } from "../shared/types";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import BotIcon from "../assets/bot.svg";
import { MsgStyles, UserStyles } from "../shared/constants";

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage: Message = {
      id: Date.now(), // Simple ID generation
      text: input,
      sender: "user",
      time: new Date(),
    };

    setMessages([...messages, newMessage]);
    setInput(""); // Clear input after sending
  };

  return (
    <div className="p-4">
      <ul>
        {messages.map((message: Message) => (
          <div className="py-3">
            <span
              key={message.id}
              className={UserStyles[message.sender as Sender]}
            >
              <i className="h-5 w-5 m-2">
                {message.sender === "user" ? (
                  <UserCircleIcon className="text-green-500" />
                ) : (
                  <div className="text-blue-500">
                    <img src={BotIcon} alt="Bot Icon" />
                  </div>
                  // <BotIcon className="text-blue-500"/>
                )}
              </i>

              <span
                className={`${
                  UserStyles[message.sender as Sender]
                } items-center space-x-2`}
              >
                <p className="text-md font-semibold text-gray-900 dark:text-white">
                  {message.sender}
                </p>
                <time className="text-xs font-normal text-gray-500 dark:text-gray-400">
                  {message.time?.toLocaleTimeString()}
                </time>
              </span>
            </span>

            <p
              className={`${
                MsgStyles[message.sender as Sender]
              } py-1 text-white w-4/6`}
            >
              {message.text}
            </p>
          </div>
        ))}
      </ul>
      <form onSubmit={sendMessage} className="flex mt-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 rounded p-2 border border-gray-300 mr-2"
        />
        <button
          type="submit"
          className="px-4 py-2 rounded-md border-2 border-inherit hover:bg-gray-200"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
