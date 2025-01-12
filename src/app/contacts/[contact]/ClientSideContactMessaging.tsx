"use client";

import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import React, {useEffect, useRef, useState} from "react";
import {ContactMessages, GetMessageDateString} from "@/modules/ai/ContactMessages";

interface ClientSideContactMessagingProps {
    token: string | undefined;
    contactId: string;
    messages: ContactMessages[];
}

function renderStyledMessage(content: string) {
    const regex = /\*([^*]+)\*/g;
    const parts = content.split(regex);

    return parts.map((part, index) =>
        index % 2 === 1 ? (
            <span key={index} className="text-gray-400">
                {part}
            </span>
        ) : (
            part
        )
    );
}

export default function ClientSideContactMessaging(props: ClientSideContactMessagingProps) {
    const [currentMsg, setCurrentMsg] = useState<string>("");
    const [messages, setMessages] = useState<ContactMessages[]>(props.messages);
    const scrollbar = useRef<HTMLDivElement>(null);

    useEffect(() => {
        scrollDown();
    }, [messages]);
    
    function scrollDown(){
        if (scrollbar.current) {
            scrollbar.current.scrollTop = scrollbar.current.scrollHeight;
        }
    }
    
    function sendMessage() {
        fetch("/api/contacts/message", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                token: props.token,
                message: currentMsg,
                messageHistory: messages,
                contactId: props.contactId
            })
        }).then(async (response) => {
            if (response.ok) {
                const data = await response.json();
                setMessages(data.messageHistory);
            } else {
                console.error("Message failed");
            }
        });

        setCurrentMsg("");
    }

    function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter") {
            event.preventDefault();
            sendMessage();
        }
    }

    return (
        <div className="bg-gray-800 flex flex-col h-[86%] w-full rounded-lg p-6 mt-2">
            {/* Message List */}
            <div ref={scrollbar} className="flex-grow overflow-y-auto overflow-x-hidden p-2 bg-gray-900 rounded-lg scroll-smooth message-scroll">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`flex w-full mb-2 ease-in-out transition delay-100 hover:scale-[101%] ${
                            message.from === props.contactId ? "justify-start" : "justify-end"
                        }`}
                    >
                        <div
                            className={`max-w-[70%] p-3 rounded-xl ease-in-out transition delay-100 ${
                                message.from === props.contactId
                                    ? "bg-gray-700 text-white rounded-bl-none hover:bg-gray-800"
                                    : "bg-[#1e5d9c] text-white rounded-br-none hover:bg-[#1b548d]"
                            }`}
                        >
                            <p className="text-sm">{renderStyledMessage(message.content)}</p>
                            <p className={`text-xs ${message.from === props.contactId ? "text-gray-400" : "text-slate-800"} mt-1 text-right select-none`}>
                                {GetMessageDateString(message.time)}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Input and Send Button */}
            <div className="flex items-center w-full gap-2 mt-2">
                <input
                    value={currentMsg}
                    onChange={(event) => setCurrentMsg(event.target.value)}
                    placeholder="Send a message..."
                    onKeyDown={onKeyDown}
                    className="flex-grow bg-gray-900 p-2 px-3 rounded-2xl outline-none text-white"
                />
                <button
                    onClick={sendMessage}
                    className="bg-blue-500 p-2 rounded-3xl hover:bg-blue-700"
                >
                    <PaperAirplaneIcon className="w-6 h-6 stroke-gray-50" />
                </button>
            </div>
        </div>
    );
}
