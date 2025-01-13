"use client";
import React, {useState} from "react";

export default function TextAITitle() {
    const [clicks, setClicks] = useState(0)
    const titleRef = React.useRef<HTMLHeadingElement>(null)
    const [title, setTitle] = useState<string>('text.ai')
    
    function onClickTitle(){
        setClicks(clicks+1)
        titleRef.current?.classList.add('animate-ping')
        setTimeout(() => {
            titleRef.current?.classList.remove('animate-ping')
        }, 250)
        
        if (clicks == 10){
            titleRef.current?.classList.add('lg:text-2xl')
            titleRef.current?.classList.add('text-xl')
            
            titleRef.current?.classList.remove('lg:text-8xl')
            titleRef.current?.classList.remove('text-6xl')
        }
        
        if(clicks >= 10){
            setTitle('why are you clicking me?')
        }
        
        if(clicks >= 20){
            setTitle('stop clicking me')
        }

        if (clicks == 20){
            titleRef.current?.classList.remove('lg:text-2xl')
            titleRef.current?.classList.remove('text-xl')

            titleRef.current?.classList.add('lg:text-lg')
            titleRef.current?.classList.add('text-sm')

        }
        
        if(clicks >= 30){
            setTitle('seriously, stop clicking me')
        }
        
        
        if (clicks == 30){
            titleRef.current?.classList.remove('lg:text-lg')
            titleRef.current?.classList.remove('text-sm')

            titleRef.current?.classList.add('lg:text-sm')
            titleRef.current?.classList.add('text-xs')
        }

        
        if(clicks >= 40){
            setTitle('do you ever feel')
        }
        
        if (clicks == 40){
            titleRef.current?.classList.remove('lg:text-sm')
            titleRef.current?.classList.remove('text-xs')

            titleRef.current?.classList.add('lg:text-xs')
            titleRef.current?.classList.add('text-xs')
        }
        
        if(clicks >= 50){
            setTitle('like a plastic bag')
        }
        
        if(clicks >= 60){
            setTitle('drifting through the wind')
        }
        
        if(clicks >= 70){
            setTitle('wanting to start again')
        }
        
        if(clicks >= 80){
            setTitle('do you ever feel')
        }
        
        if(clicks >= 90){
            setTitle('feel so paper thin')
        }
        
        if(clicks >= 100){
            setTitle('like a house of cards')
        }
        
        if(clicks >= 110){
            setTitle('one blow from caving in')
        }
        
        if(clicks >= 120){
            setTitle('do you ever feel')
        }
        
        if(clicks >= 130){
            setTitle('already buried deep')
        }
        
        if(clicks >= 140){
            setTitle('six feet under scream')
        }
        
        if(clicks >= 150){
            setTitle('but no one seems to hear a thing')
        }
        
        if(clicks >= 160){
            setTitle(`don't you have anything better to do?`)
        }
        
        if(clicks >= 170){
            setTitle(`you've clicked me ${clicks} times`)
        }
        
        if(clicks >= 325){
            setTitle(`i'm done entertaining you`)
        }
        
        if (clicks >= 350){
            setTitle(`ugh, fine`)
            setTimeout(() => {
                window.location.href = 'https://www.youtube.com/watch?v=2k0SmqbBIpQ'
            }, 2500)
        }
        
    }
    
    return (
        <h1 ref={titleRef} onClick={onClickTitle} className={`justify-center self-center mb-2 text-6xl lg:text-8xl font-bold subpixel-antialiased shadow-sm select-none
            ease-in-out transition duration-500 transform hover:scale-[1.1] 
            text-transparent bg-clip-text 
            bg-gradient-to-r from-blue-500 via-blue-700 to-blue-900 hover:from-pink-600 hover:via-pink-700 hover:to-green-400
            `}>{title}</h1>
    )
}