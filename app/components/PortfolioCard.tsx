import { Portfolio } from "contentlayer/generated";
import Image from "next/image";
import Link from "next/link";

interface PortfolioCardProps {
    item: Portfolio
}

export const PortfolioCard: React.FC<PortfolioCardProps> = ({item}) => {
    return <div className="max-w-80"><Link href={"/portfolio/"+item.slug}>
    <div>
        <div className="m-1 p-3 hover:p-4 rounded">
            <Image className="drop-shadow-lg hover:drop-shadow-2xl aspect-square object-cover" 
                src={item.image.src} 
                alt={item.title} 
                width={item.image.width} 
                height={item.image.height}>
            </Image>
        </div>
    </div></Link></div>
}