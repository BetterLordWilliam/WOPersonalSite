import Link from "next/link";

import { Portfolio } from "@portfolio/portfolio-types";
import { ImageThumbnail } from "@components/ImageThumbnail";

interface PortfolioCardProps {
    item: Portfolio
}

export const PortfolioCard: React.FC<PortfolioCardProps> = ({item}) => {
    return (
        <div className="max-w-80 m-2 p-1 rounded drop-shadow bg-closeishToBlack">
            <Link href={`/portfolio/${item.slug}`}>
            <div>
                <div className="p-2 hover:p-3 rounded drop-shadow">
                    <ImageThumbnail 
                        imageUrl={item.imageUrl}
                        altText={item.slug}
                        wSize={500}
                        hSize={500} />
                </div>
            </div>
            </Link>
        </div>
    );
}

export default PortfolioCard;