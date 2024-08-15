import type { Metadata } from "next";

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Inter } from "next/font/google";

import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });
const icon = "../favicon.ico";

export const metadata: Metadata = {
    title: "Will's Personal Website",
    description: "Will Otterbeins personal portfolio website",
};

/**
 * Root website page.
 * 
 * @returns NextPage
 */
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <head>
            <link rel="icon" href={icon} sizes="any"/>
        </head>
        <body className={`${inter.className} bg-closeToBlack`}>
            <div id="main" className="flex flex-col justify-between min-h-screen">
            <Header/>
            <div className="mb-auto">
            {children}
            </div>
            <Footer/>
            </div>
        </body>
        </html>
    );
}
