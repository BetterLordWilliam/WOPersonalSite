import { Portfolio } from "contentlayer/generated";
import Image from "next/image";
import Link from "next/link";

interface PortfolioCardProps {
    item: Portfolio
}

export const PortfolioCard: React.FC<PortfolioCardProps> = ({item}) => {
    return <Link href={"/portfolio/"+item.slug}>
    <div className="w-full">
        <div className="m-1 p-2 hover:p-1 rounded">
        <div className="p-2 rounded bg-closeishToBlack">
            <Image className="rounded aspect-square object-cover" 
                src={item.image.src} 
                alt={item.title} 
                width={item.image.width} 
                height={item.image.height}>
            </Image>
        </div>
        </div>
    </div></Link>
}