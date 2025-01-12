import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import NavbarServer from "@/components/navbar/NavbarServer";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "text.ai",
    description: "Highly-intelligent AI chatbots",
};

export default async function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen`}
        >
        <NavbarServer/>

        <div className={`flex justify-center mt-8 h-[calc(100vh-100px)]`}>
            <div className={`bg-gray-900 p-4 rounded-2xl w-[calc(100vw-80px)] h-[calc(85vh)] mb-4`}>
                {children}
            </div>
        </div>
        </body>
        </html>
    );
}
