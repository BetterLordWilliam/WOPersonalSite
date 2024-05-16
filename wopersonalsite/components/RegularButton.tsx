import Link from "next/link";
import "../styles/globals.css";

interface params {
    url: string | undefined,
    buttonText: string,
}

/**
 * RegularButton:       Regular button which displays specified text and directs to directable link.
 * 
 * @param url:          Destination link
 * @param buttonText:   Text displayed in the button
 * @returns             JSX Component
 */
export const RegularButton: React.FC<params> = ({url, buttonText}) => {
    return (
        <div className="m-1">
            {url ? (
                <div className="rounded p-1 bg-zinc-900 hover:bg-cyan-800">
                <Link href={url}> {buttonText} </Link>
                </div>
            ) : 
                <div className="rounded p-1 bg-zinc-900 italic">
                <span> {buttonText} </span>
                </div>
            }
        </div>
    );
}