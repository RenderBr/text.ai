import UserTokenJwt from "@/modules/auth/UserTokenJwt";
import Link from "next/link";

interface NavbarClientProperties {
    user: UserTokenJwt | null
}

export default function NavbarClient(props: NavbarClientProperties) {
    return (
        <div className={`bg-gray-800 min-w-screen h-12 sticky top-0 flex items-center navbar select-none`}>
            <Link href={`/`} className={`ml-4 mr-10 font-bold`}>
                text.ai
            </Link>
            <div className={`flex gap-10`}>

                {
                    props.user && (
                        <>
                            <Link href={`/contacts`}>
                                Contacts
                            </Link>
                            <Link href={`/logout`}>
                                Logout
                            </Link>
                        </>
                    )
                }
            </div>
            {
                props.user ? (
                    <div className={`ml-auto mr-4`}>
                        {props.user.username}
                    </div>
                ) : (
                    <Link href={`/login`} className={`ml-auto mr-4`}>
                        Login
                    </Link>
                )
            }

        </div>


    )
}