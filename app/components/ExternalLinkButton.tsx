import Link from "next/link";
import "../globals.css";

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
export const ExternalLinkButton: React.FC<params> = ({ url, buttonText }) => {
    return (
        <div className="m-1">
            {url ? (
                <div className="flex justify-center rounded p-1 bg-zinc-900 hover:bg-button_green_dark">
                <Link href={url}> {buttonText} </Link>
                </div>
            ) : 
                <div className="flex justify-center rounded p-1 bg-zinc-900 hover:bg-red-900">
                <span> {buttonText} </span>
                </div>
            }
        </div>
    );
}