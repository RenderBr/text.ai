import Image from "next/image";
import Link from "next/link";

interface ContactProperties {
    name: string,
    avatar?: string,
    characteristics?: string[],
    id: string
}

export default function ContactCard(props: ContactProperties) {
    return (
        <Link href={`/contacts/${props.id}`}>
            <li className={`ml-4 bg-gray-700 mr-4 p-4 rounded-2xl transition-all ease-in-out hover:scale-105 hover:opacity-75 delay-200 shadow-2xl`}>
                <div className={`flex items-center`}>
                    <Image className={`w-24 h-24 lg:w-30 lg:h-30 border-2 rounded-lg mr-4`} width={256} height={256} alt={props.name}
                           src={props.avatar ?? "/images/avatars/default-avatar.png"}/>
                    <div>
                        <p className={`text-4xl font-bold`}>{props.name}</p>
                        <p className={`text-gray-400`}>{props.characteristics?.join(", ")}</p>
                    </div>
                </div>
            </li>
        </Link>
    );
}