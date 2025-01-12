"use server"
import ClientSideLogin from "@/app/login/ClientSideLogin";
import UserTokenJwt from "@/modules/auth/UserTokenJwt";

export default async function ServerSideLogin(){
    const user = await UserTokenJwt.getUserFromToken();
    
    if(user){
        return (
            <div>
                <h1>Already logged in.</h1>
            </div>
        );
    }else{
        return (
            <ClientSideLogin />  
        );
    }
}