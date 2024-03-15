import React, { useState } from "react";
import { IMessage } from "../../shared/types";
import { Message } from "../Message/Message";
import { PDFInput } from "../PDFInput/PDFInput";
import { ArrowUpIcon } from "@heroicons/react/24/solid";

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [input, setInput] = useState("");
  const [attachedFile, setAttachedFile] = useState<File | null>(null);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage: IMessage = {
      id: Date.now(),
      text: input,
      sender: "bot",
      time: new Date(),
    };

    setMessages([...messages, newMessage]);
    setInput("");
  };

  return (
    <div className="p-4">
      <ul>
        {messages.map((msg: IMessage) => (
          <Message key={msg?.id} {...msg}></Message>
        ))}
      </ul>

      <form
        onSubmit={sendMessage}
        className="flex mt-5"
      >
        <PDFInput {...{ attachedFile, setAttachedFile }} />

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 mx-2 border-2 rounded-lg border-gray-300"
        />

        <button
          type="submit"
          className="px-2 py-1 rounded-md border-2 border-inherit hover:bg-gray-200"
        >
          <ArrowUpIcon className="h-6 w-6 text-black"/>
        </button>
      </form>
    </div>
  );
};

export default Chat;
