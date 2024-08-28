import Image from "next/image";
import Link from "next/link";

import { Portfolio } from "../portfolio/page";

interface PortfolioCardProps {
    item: Portfolio
}

export const PortfolioCard: React.FC<PortfolioCardProps> = ({ item }) => {
    return (
        <div className="max-w-80">
            <Link href={{
                pathname: "/portfolio/" + item.slug,
            }}>
            <div>
                <div className="m-1 p-3 hover:p-4 rounded">
                    <Image className="drop-shadow-lg hover:drop-shadow-2xl aspect-square object-cover" 
                        src={item.imageUrl} 
                        alt={item.slug} 
                        width={250}
                        height={250} />
                </div>
            </div>
            </Link>
        </div>
    );
}