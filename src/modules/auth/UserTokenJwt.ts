import {sign, verify} from "jsonwebtoken";
import {cookies} from "next/headers";

class UserTokenJwt {
    public email: string;
    public username: string;
    public token: string | undefined;
    
    constructor(data: { email: string; username: string } | string) {
        if (typeof data === "string") {
            try {
                const decodedToken = verify(data, "supersecrettoken") as { email: string; username: string };

                this.email = decodedToken.email;
                this.username = decodedToken.username;
                this.token = data;
            }catch {
                throw new Error("Invalid token");
            }
        } else {
            // Handle object-based initialization
            this.email = data.email;
            this.username = data.username;
        }
    }

    public generateToken(): string {
        const token = sign({email: this.email, username: this.username}, 'supersecrettoken', {expiresIn: "1h"});
        this.token = token;
        
        return token;
    }
    
    public static verifyToken(token: string): boolean {
        try {
            verify(token, "supersecrettoken");
            return true;
        } catch {
            return false;
        }
    }
    
    public static async getUserFromToken(): Promise<(UserTokenJwt | null)> {
        // get the token from the cookie
        const cookieStore = await cookies();
        
        const userCookieToken = cookieStore.get("userToken");
        
        if(userCookieToken) {
            let token;
            try {
                token = new UserTokenJwt(userCookieToken.value);
            }catch{
                return null;
            }
            
            token.token = userCookieToken.value;
            
            return token;
        }
        
        return null;
    }
    
    public static removeToken(): void {
        
    }
}

export default UserTokenJwt;