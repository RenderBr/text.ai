"use client"

export default function ClientSideLogin(){


    function onSubmit(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        
        const form = event.currentTarget;
        
        const formData = new FormData(form);
        
        const username = formData.get("username") as string;
        const password = formData.get("password") as string;
        
        // Send the login request to the server
        fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username, password})
        }).then(async response => {
            if(response.ok){
                const data = await response.json();
                
                // Store the user token in a cookie
                document.cookie = `userToken=${data.token}; path=/`;
                
                // Redirect to the home page
                window.location.href = "/";
            }else{
                console.error("Login failed");
            }
        });
    }

    return (
      <div className={`flex flex-col h-full gap-4`}>
        <h1 className={`text-6xl subpixel-antialiased self-center select-none font-bold`}>Login</h1>
        <form className={`self-center justify-center flex flex-grow flex-col gap-2`} onSubmit={onSubmit}>
            <input className={`bg-gray-800 border-none rounded-xl`} name={`username`} type="text" placeholder="Username" />
            <input className={`bg-gray-800 border-none rounded-xl`} name={`password`} type="password" placeholder="Password" />
            
            <button className={`bg-green-600 p-2 rounded-2xl`} type="submit">Login</button>
        </form>
      </div>  
    );
}