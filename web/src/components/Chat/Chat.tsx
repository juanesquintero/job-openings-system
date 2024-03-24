import React, { useState } from "react";
import { IMessage } from "../../shared/types";
import { Message } from "../Message/Message";
import { PDFInput } from "../PDFInput/PDFInput";
import { ArrowUpIcon } from "@heroicons/react/24/solid";
import { fecthData, postData } from "../../shared/utils";
import { Loading } from "../Loading/Loading";

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [input, setInput] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const [thread, setThread] = useState<string | null>(
    localStorage.getItem("thread") ?? null
  );
  const [attachedFile, setAttachedFile] = useState<File | null>(null);

  const setThreadID = (threadID?: string | null) => {
    if (threadID) {
      setThread(threadID);
      localStorage.setItem("thread", threadID);
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setInput("");
    const newMessages = [];

    const userMsg: IMessage = {
      id: Date.now(),
      text: input.trim(),
      sender: "user",
      time: new Date(),
    };
    newMessages.push(userMsg);

    if (messages?.length === 0) {
      const response = await fecthData({ endpoint: "/start" });
      setThreadID(response?.thread_id);
    }

    if (thread) {
      const response = await postData({
        endpoint: "/chat",
        body: {
          thread_id: thread,
          message: userMsg?.text,
        },
      });
      const botMsg: IMessage = {
        id: Date.now(),
        text: response?.response?.trim(),
        sender: "bot",
        time: new Date(),
      };
      newMessages.push(botMsg);
    } else {
      alert("Please start a conversation thread...˝");
    }

    setMessages([...messages, ...newMessages]);
    setLoading(false);
  };

  return (
    <div className="p-4">
      <ul>
        {messages.map((msg: IMessage) => (
          <Message key={msg?.id} {...msg}></Message>
        ))}
      </ul>

      <span className="flex justify-center">{loading && <Loading size="l"/>}</span>

      <form onSubmit={sendMessage} className="flex mt-5">
        <PDFInput {...{ attachedFile, setAttachedFile }} />

        <input
          type="text"
          disabled={loading}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 mx-2 border-2 rounded-lg border-gray-300"
        />

        <button
          type="submit"
          disabled={loading}
          className="px-2 py-1 rounded-md border-2 border-inherit hover:bg-gray-200"
        >
          {loading ? (
            <Loading size="s"/>
          ) : (
            <ArrowUpIcon className="h-6 w-6 text-black" />
          )}
        </button>
      </form>
    </div>
  );
};

export default Chat;
