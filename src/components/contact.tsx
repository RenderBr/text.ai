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
            <li className={`ml-4 bg-gray-700 mr-4 p-4 rounded-2xl`}>
                <div className={`flex items-center`}>
                    <Image className={`w-30 h-30 border-2 rounded-lg mr-4`} width={128} height={128} alt={props.name}
                           src={props.avatar ?? "/images/avatars/default-avatar.png"}/>
                    <div>
                        <p className={`text-4xl font-bold`}>{props.name}</p>
                        <p>{props.characteristics?.join(", ")}</p>
                    </div>
                </div>
            </li>
        </Link>
    );
}