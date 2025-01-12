import React from "react";

interface RegenerateImageOptionProperties {
    token: string | undefined;
    contactId: string;
    callback: (event: React.MouseEvent) => void;
}

export default function RegenerateImageOption(props: RegenerateImageOptionProperties) {
    
    function regenerateImage(event: React.MouseEvent) {
        event.preventDefault();
        event.stopPropagation();
        props.callback(event);
        
        fetch("/api/img",{
            method: "POST",
            body: JSON.stringify({
                contactId: props.contactId,
                token: props.token,
                type: "avatar"
            })
        }).then(response => {
            if(response.ok){
                document.location.reload();
            }
        });
    }
    
    return (
        <li onClick={regenerateImage} className="hover:bg-gray-600 p-2 cursor-pointer rounded-b-lg">
            Regenerate Image
        </li>
    )
}