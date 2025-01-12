import Link from "next/link";

export default function Home() {
    return (
        <div className={`flex flex-col w-full h-full`}>
            <h1 className={`justify-center self-center mb-2 text-8xl font-bold`}>text.ai</h1>
            <hr className={`border-gray-500 mb-2`}/>
            <p className={`text-gray-300 text-2xl`}>Welcome to text.ai, the AI-powered text messaging platform. Using this
                platform, you can create custom AI chat personas to respond to text messages. Using the platform is
                easy, simply sign up, head to the <Link className={`font-bold`} href={`/contacts`}>Contacts
                    page</Link> and start by adding your first AI contact.

                <br/><br/>

                Give it a name, add some characteristics, and you&#39;re ready to go. You can then message your AI
                contact, and it will respond with a human-like response.
                The more specific you are with your AI contact, the better the responses will be. text.ai is powered
                by <Link className={`font-bold`}
                         href={`https://huggingface.co/Orenguteng/Llama-3.1-8B-Lexi-Uncensored-V2-GGUF`}>LLama 3.1
                    Lexi</Link>,
                a powerful, uncensored AI model that can generate human-like responses.

                <br/><br/>

                text.ai uses the Stable Diffusion model <Link className={`font-bold`}
                                                              href={`https://civitai.com/models/111274/perfectdeliberate-anime`}>PerfectDeliberate </Link>
                for generating contact images. The model is trained on anime images and can generate a wide variety of
                images, and uses the contact&#39;s characteristics to generate a unique image. Images are generated in
                512x512, and are only visible to you, please do not provide inappropriate characteristics, as they will
                be removed, and your account may be banned.

                <br/><br/>

                text.ai is a project developed by <Link className={`font-bold`}
                                                        href={`https://github.com/RenderBr/`}>Average</Link> or <code
                    className={`bg-slate-950 px-1 py-2`}>@rageave</code> on
                Discord. If you come across any issues, please report them to me on Discord or GitHub. I hope you have
                fun using this platform!
            </p>
        </div>
    );
}
