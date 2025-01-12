"use client";

import {useCookies} from "next-client-cookies";

export default function Logout(){
    const cookies = useCookies();
    
    cookies.remove("userToken");
    
    // Redirect to the home page
    window.location.href = "/";
}