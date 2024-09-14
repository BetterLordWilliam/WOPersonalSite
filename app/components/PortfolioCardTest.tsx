import Link from "next/link";

import { Portfolio } from "@portfolio/portfolio-types";
import { ImageThumbnail } from "@components/ImageThumbnail";

interface PortfolioCardProps {
    item: Portfolio
}

export const PortfolioCard: React.FC<PortfolioCardProps> = ({item}) => {

    return (
        <div className="max-w-80">
            <Link href={`/portfolio/${item.slug}`}>
            <div>
                <div className="m-1 p-3 hover:p-4 rounded">
                    <ImageThumbnail 
                        imageUrl={item.imageUrl}
                        altText={item.slug} />
                </div>
            </div>
            </Link>
        </div>
    );
}