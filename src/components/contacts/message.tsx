import {ContactMessages, GetRelativeTimeString, GetTimestamp} from "@/modules/ai/ContactMessages";
import React, { useState } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

interface MessageProperties {
    message: ContactMessages;
    contactId: string;
    changeMessage: (index: number, newMessage: string) => void;
    index: number;
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

export default function Message(props: MessageProperties) {
    const [showEditor, setShowEditor] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedMessage, setEditedMessage] = useState(props.message.content);

    function onHover() {
        setShowEditor(true);
    }

    function onMouseLeave() {
        setShowEditor(false);
    }

    function startEditing() {
        setIsEditing(true);
    }

    function stopEditing() {
        setIsEditing(false);
    }

    function handleInputChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setEditedMessage(event.target.value);
    }

    function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            stopEditing();

            if (editedMessage !== props.message.content) {
                props.changeMessage(props.index, editedMessage);
            }
        }
    }

    return (
        <div
            onMouseEnter={onHover}
            onMouseLeave={onMouseLeave}
            className={`flex w-full mb-2 ease-in-out transition delay-100 hover:scale-[101%] ${
                props.message.from === props.contactId ? "justify-start" : "justify-end"
            }`}
        >
            <div
                className={`max-w-[70%] p-3 rounded-xl ease-in-out transition delay-100 ${
                    props.message.from === props.contactId
                        ? "bg-gray-700 text-white rounded-bl-none hover:bg-gray-800"
                        : "bg-[#1e5d9c] text-white rounded-br-none hover:bg-[#1b548d]"
                }`}
            >
                {isEditing ? (
                    <textarea
                        value={editedMessage}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        className="w-fit bg-gray-800 text-white p-2 rounded-md"
                        autoFocus
                        onBlur={stopEditing}
                    />
                ) : (
                    <p className="text-sm">{renderStyledMessage(editedMessage)}</p>
                )}
                <div
                    className={`text-xs flex justify-end ${
                        props.message.from === props.contactId ? "text-gray-400" : "text-slate-800"
                    } mt-1 text-right select-none`}
                >
                    {showEditor && !isEditing && (
                        <div title={`Edit message`} onClick={startEditing} className="cursor-pointer">
                            <PencilSquareIcon className="h-4 w-4 inline-block mr-2" />
                        </div>
                    )}
                    <p title={`Sent: ${GetTimestamp(props.message.time)}`}>{GetRelativeTimeString(props.message.time)}</p>
                </div>
            </div>
        </div>
    );
}
