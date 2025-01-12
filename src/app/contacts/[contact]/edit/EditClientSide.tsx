"use client";

import {useEffect, useRef, useState} from "react";

interface EditClientSideProperties {
    characteristics: string[] | undefined,
    name: string,
    id: string,
    token: string | undefined
}

export default function EditClientSide(props: EditClientSideProperties){
    const [tags, setTags] = useState<string[]>(props.characteristics || []);
    const [name, setName] = useState<string>(props.name);
    const [currentTag, setCurrentTag] = useState("");
    const characteristicsInput = useRef<HTMLInputElement>(null);

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

    function handleSave() {
        // Logic to save the edited contact
        console.log("Saving contact", { name: props.name, characteristics: tags });
        
        fetch("/api/contacts/edit", {
            method: "POST",
            body: JSON.stringify({
                contactId: props.id,
                contactName: name,
                characteristics: tags,
                token: props.token
            })
        }).then(response => {
            if (response.ok) {
                document.location.href = `/contacts`;
            }
        });
    }
    
    useEffect(() => {
        
    });

    return (
        <div className={`flex flex-col gap-2 mt-4`}>
            <label htmlFor={`name`}>Name</label>
            <input
                className={`bg-gray-800 border-none active:outline-none focus:ring-0 focus:outline-none`}
                id={`name`}
                type={`text`}
                defaultValue={name}
                onChange={(event) => setName(event.target.value)}
            />

            <label htmlFor={`characteristics`}>Characteristics</label>
            <div className="mt-1 flex items-center flex-wrap gap-2 rounded-md bg-gray-800 p-2">
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
                    ref={characteristicsInput}
                />
            </div>

            <button
                onClick={handleSave}
                className={`bg-blue-500 text-white rounded-lg p-2 mt-4`}
            >
                Save
            </button>
        </div>
    )

}