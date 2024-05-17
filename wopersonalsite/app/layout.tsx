import type { Metadata } from "next";

import { Header } from "../components/Header";
import { Inter } from "next/font/google";

import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

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
        <body className={"min-h-screen bg-closeToBlack " + inter.className}>
            <Header/>
            {children}
        </body>
        </html>
    );
}
