"use server"

import UserTokenJwt from "@/modules/auth/UserTokenJwt";
import NavbarClient from "@/components/navbar/NavbarClient";

export default async function NavbarServer(){
    const token = await UserTokenJwt.getUserFromToken();
    
    return (
        <NavbarClient user={token} />
    )
}