import Link from "next/link";

interface params {
    url: string,
}

export const RegularButton: React.FC<params> = ({url}) => {
    if (url) {
        console.log("Valid URL");
        return <Link href={url}></Link>;
    }
}