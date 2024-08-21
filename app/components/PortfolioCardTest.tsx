import Image from "next/image";
import Link from "next/link";

import { Portfolio } from "../portfolio/page";

interface PortfolioCardProps {
    item: Portfolio
}

export const PortfolioCard: React.FC<PortfolioCardProps> = ({item}) => {
    return <div className="max-w-80"><Link href={"/portfolio/"+item.title}>
    <div>
        <div className="m-1 p-3 hover:p-4 rounded">
            <img className="drop-shadow-lg hover:drop-shadow-2xl aspect-square object-cover" 
                src={item.images[0].url.toString()} 
                alt={item.images[0].name}>
            </img>
        </div>
    </div></Link></div>
}