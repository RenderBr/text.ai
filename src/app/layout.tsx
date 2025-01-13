import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import NavbarServer from "@/components/navbar/NavbarServer";
import Head from "next/head";
import {Meta} from "next/dist/lib/metadata/generate/meta";
import {CookiesProvider} from "next-client-cookies/server";

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
        <CookiesProvider>
            <html lang="en">
            <Head>
                <Meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            </Head>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased max-h-screen`}
            >
            <NavbarServer/>

            <div className={`justify-center mt-8`}>
                <div className={`bg-gray-900 container mx-auto p-4 sm:p-6 rounded-2xl lg:mb-8 shadow-2xl`}>
                    {children}
                </div>
            </div>
            </body>
            </html>
        </CookiesProvider>
    );
}
