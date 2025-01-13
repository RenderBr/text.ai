"use server"
import UserTokenJwt from "@/modules/auth/UserTokenJwt";
import ClientSideRegister from "@/app/register/ClientSideRegister";

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
            <ClientSideRegister />
        );
    }
}