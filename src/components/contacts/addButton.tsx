"use client"

import React, { useState } from "react";

interface AddContactButtonProperties {
    token: string | undefined;
}

export default function AddContactButton(props: AddContactButtonProperties) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tags, setTags] = useState<string[]>([]);
    const [currentTag, setCurrentTag] = useState("");

    function onClick(event: React.MouseEvent) {
        if (isModalOpen && event.target !== event.currentTarget) {
            return;
        }

        setIsModalOpen(!isModalOpen);
        
        // reload page
        window.location.reload()
    }

    if (props.token === undefined) {
        return null;
    }

    function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const form = event.currentTarget;
        const formData = new FormData(form);

        const contactName = formData.get("contactName") as string;

        // Send the add-contact request to the server
        fetch("/api/add-contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token: props.token,
                contactName,
                characteristics: tags,
            }),
        }).then(async (response) => {
            if (response.ok) {
                const data = await response.json();

                if (data.success) {
                    setIsModalOpen(false);
                    setTags([]);
                    setCurrentTag("");
                } else {
                    console.error("Failed to add contact");
                }
            } else {
                console.error("Failed to add contact");
            }
        });
    }

    function handleTagInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        setCurrentTag(event.target.value);
    }

    function handleTagInputKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        if ((event.key === "," || event.key === "Enter") && currentTag.trim() !== "") {
            event.preventDefault();
            setTags([...tags, currentTag.trim()]);
            setCurrentTag("");
        } else if (event.key === "Backspace" && currentTag === "" && tags.length > 0) {
            event.preventDefault();
            setTags(tags.slice(0, -1));
        }
    }

    function removeTag(index: number) {
        setTags(tags.filter((_, i) => i !== index));
    }

    return (
        <>
            {isModalOpen && (
                <div
                    onClick={onClick}
                    className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50"
                >
                    <div className="bg-gray-900 h-96 w-96 rounded-2xl p-4">
                        <h1 className="text-4xl ml-2 mt-2 mb-4">Add Contact</h1>
                        <form onSubmit={onSubmit}>
                            <label className="block mb-4">
                                <span className="text-white">Name</span>
                                <input
                                    name="contactName"
                                    type="text"
                                    className="mt-1 block w-full rounded-md bg-gray-700 text-white"
                                />
                            </label>
                            <label className="block">
                                <span className="text-white">Characteristics</span>
                                <div className="mt-1 flex items-center flex-wrap gap-2 rounded-md bg-gray-700 p-2">
                                    {tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="inline-flex items-center px-3 py-1 bg-blue-600 text-white rounded-full text-sm"
                                        >
                                            {tag}
                                            <button
                                                type="button"
                                                onClick={() => removeTag(index)}
                                                className="ml-2 text-white hover:text-gray-300"
                                            >
                                                &times;
                                            </button>
                                        </span>
                                    ))}
                                    <input
                                        type="text"
                                        value={currentTag}
                                        onChange={handleTagInputChange}
                                        onKeyDown={handleTagInputKeyDown}
                                        className="flex-grow bg-transparent border-none text-white active:outline-none focus:ring-0 focus:outline-none"
                                        placeholder="Enter a characteristic"
                                    />
                                </div>
                            </label>
                            <button
                                type="submit"
                                className="mr-2 mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Add
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <button
                onClick={onClick}
                className="mr-2 mt-2 mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Add
            </button>
        </>
    );
}
