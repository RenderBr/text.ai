"use client";
import Image from "next/image";
import {useState} from "react";

interface MessagePageAvatarProperties {
    url: string | undefined;
    name: string;
}

export default function MessagePageAvatar(props: MessagePageAvatarProperties) {
    const [showImage, setShowImage] = useState(false);

    function toggleImage() {
        setShowImage(!showImage)
    }

    return (
        <>
            {
                showImage ? (
                    <div className={`fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-50 flex justify-center items-center`}>
                        <div className={`bg-gray-900 p-4 rounded-lg flex flex-col`}>
                            <Image className={`w-96 h-96 lg:w-128 lg:h-128 rounded-lg`}
                                   width={512} height={512}
                                   alt={props.name}
                                   src={props.url ?? "/images/avatars/default-avatar.png"}/>
                            <button className={`bg-red-500 rounded-lg p-2 text-white mt-1`} onClick={toggleImage}>Close</button>
                        </div>
                    </div>
                ) : null
            }
            
            
            <Image onClick={toggleImage} className={`w-12 h-12 lg:w-20 lg:h-20 border-2 rounded-lg mr-4 hover:opacity-75`}
                   width={128} height={128}
                   alt={props.name}
                   src={props.url ?? "/images/avatars/default-avatar.png"}/>
        </>
    );
}