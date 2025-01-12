"use client";
import Image from "next/image";
import Link from "next/link";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useRef } from "react";
import RegenerateImageOption from "@/components/contacts/ options/regenerateImage";

interface ContactProperties {
    name: string;
    avatar?: string;
    characteristics?: string[];
    id: string;
    token: string | undefined;
}

export default function ContactCard(props: ContactProperties) {
    const [displayOptions, setDisplayOptions] = React.useState<boolean>(false);
    const optionsRef = useRef<HTMLDivElement>(null);

    function showOptions(event: React.MouseEvent) {
        event.stopPropagation(); // Prevents the event from propagating to the parent
        setDisplayOptions(!displayOptions);
    }

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (optionsRef.current && !optionsRef.current.contains(event.target as Node)) {
                setDisplayOptions(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    function viewContact() {
        window.location.href = `/contacts/${props.id}`;
    }

    return (
        <li
            className="ml-4 select-none bg-gray-700 mr-4 p-4 rounded-2xl transition-all ease-in-out hover:scale-[101%] hover:bg-gray-800 delay-200 shadow-2xl"
            onClick={viewContact}
            role="button"
        >
            <div className="w-full flex items-center">
                <Image
                    className="w-24 h-24 lg:w-30 lg:h-30 border-2 rounded-lg mr-4"
                    width={256}
                    height={256}
                    alt={props.name}
                    src={props.avatar ?? "/images/avatars/default-avatar.png"}
                />
                <div className="flex-grow">
                    <p className="text-4xl font-bold">{props.name}</p>
                    <p className="text-gray-400">{props.characteristics?.join(", ")}</p>
                </div>

                <button
                    onClick={showOptions}
                    className="hover:bg-gray-900 p-2 rounded-3xl transition delay-200 ease-in-out"
                >
                    <EllipsisVerticalIcon className="w-6 h-6 ml-auto" />
                </button>

                {displayOptions && (
                    <div
                        ref={optionsRef}
                        className="absolute right-4 top-[75%] border-gray-700 border bg-gray-800 text-white rounded-lg shadow-lg w-48 z-10"
                    >
                        <ul>
                            <li className="hover:bg-gray-600 p-2 cursor-pointer rounded-t-lg">
                                <Link href={`/contacts/${props.id}/edit`}>Edit Contact</Link>
                            </li>
                            <RegenerateImageOption callback={showOptions} contactId={props.id} token={props.token} />
{/*                            <li className="hover:bg-gray-600 p-2 cursor-pointer">Delete Contact</li>
                            <li className="hover:bg-gray-600 p-2 cursor-pointer rounded-b-lg">
                                <button onClick={() => alert("Viewing details...")}>View Details</button>
                            </li>
                            */}
                        </ul>
                    </div>
                )}
            </div>
        </li>
    );
}
