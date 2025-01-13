"use client";

import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useRef, useState } from "react";
import { ContactMessages } from "@/modules/ai/ContactMessages";
import Message from "@/components/contacts/message";

interface ClientSideContactMessagingProps {
    token: string | undefined;
    contactId: string;
    messages: ContactMessages[];
    contactName: string;
}

export default function ClientSideContactMessaging(props: ClientSideContactMessagingProps) {
    const [currentMsg, setCurrentMsg] = useState<string>("");
    const [messages, setMessages] = useState<ContactMessages[]>(() => props.messages);
    const [isTyping, setIsTyping] = useState<boolean>(false);
    const scrollbar = useRef<HTMLDivElement>(null);

    useEffect(() => {
        scrollDown();
    }, [messages]);

    function scrollDown() {
        if (scrollbar.current) {
            scrollbar.current.scrollTop = scrollbar.current.scrollHeight;
        }
    }

    function changeMessage(index: number, newMessage: string) {
        const newMessages = [...messages];
        
        const message = newMessages[index];

        fetch("/api/contacts/message/edit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                token: props.token,
                message: message.content,
                newMessage: newMessage,
                contactId: props.contactId
            })
        }).then(async (response) => {
            if (response.ok) {
                message.content = newMessage;
                setMessages(newMessages);
            } else {
                console.error("Message edit failed");
            }
        });
    }

    function sendMessage() {
        const userMessage = {
            content: currentMsg,
            read: true,
            from: "user",
            time: new Date(),
            to: props.contactId
        };

        // Add user message to state
        setMessages((prev) => [...prev, userMessage]);

        // Show typing indicator
        setIsTyping(true);

        fetch("/api/contacts/message", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                token: props.token,
                message: currentMsg,
                messageHistory: messages.slice(-100),
                contactId: props.contactId
            })
        }).then(async (response) => {
            if (response.ok) {
                const data = await response.json();
                setMessages(data.messageHistory);
            } else {
                console.error("Message failed");
            }
        }).finally(() => {
            // Remove typing indicator
            setIsTyping(false);
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
            <div ref={scrollbar} className="lg:flex-grow container lg:max-h-[34rem] max-h-[20rem] overflow-y-auto overflow-x-hidden p-2 bg-gray-900 rounded-lg scroll-smooth message-scroll">
                {messages.map((message, index) => (
                    <Message key={index} index={index} changeMessage={changeMessage} message={message} contactId={props.contactId} />
                ))}
                {isTyping && (
                    <div className="text-gray-400 italic mt-2">{props.contactName} is typing...</div>
                )}
            </div>

            {/* Input and Send Button */}
            <div className="flex items-center w-full gap-2 mt-2">
                <input
                    value={currentMsg}
                    onChange={(event) => setCurrentMsg(event.target.value)}
                    placeholder="Send a message..."
                    onKeyDown={onKeyDown}
                    className="flex-grow bg-gray-900 min-w-0 p-2 px-3 rounded-2xl outline-none text-white"
                />
                <button
                    onClick={sendMessage}
                    className="flex-shrink-0 bg-blue-500 w-10 h-10 p-2 rounded-3xl hover:bg-blue-700"
                >
                    <PaperAirplaneIcon className="size-6 stroke-gray-50" />
                </button>
            </div>
        </div>
    );
}