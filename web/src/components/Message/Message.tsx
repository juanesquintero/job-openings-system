import React from "react";
import { MsgBoxStyles, MsgStyles, UserStyles } from "../../shared/constants";
import { IMessage, Sender } from "../../shared/types";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import BotIcon from "../../assets/bot.svg";

export const Message: React.FC<IMessage> = ({
  id,
  sender,
  time,
  text,
}: IMessage) => (
  <div className="py-3">
    <span key={id} className={UserStyles[sender as Sender]}>
      <i className="h-5 w-5 m-2">
        {sender === "user" ? (
          <UserCircleIcon className="text-green-500" />
        ) : (
          <div className="text-blue-500">
            <img src={BotIcon} alt="Bot Icon" />
          </div>
        )}
      </i>

      <span
        className={`${UserStyles[sender as Sender]} items-center space-x-2`}
      >
        <p className="text-md font-semibold text-gray-900 dark:text-white">
          {sender}
        </p>
        <time className="text-xs font-normal text-gray-500 dark:text-gray-400">
          {time?.toLocaleTimeString()}
        </time>
      </span>
    </span>

    <div className={MsgBoxStyles[sender as Sender]}>
      <p className={`${MsgStyles[sender as Sender]} text-white py-1 px-2 w-fit`}>
        {text}
      </p>
    </div>
  </div>
);
