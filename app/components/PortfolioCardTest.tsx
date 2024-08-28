import Link from "next/link";

import { ImageThumbnail } from "../components/ImageThumbnail";
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
                    <ImageThumbnail 
                        imageUrl={item.imageUrl}
                        altText={item.slug} />
                </div>
            </div>
            </Link>
        </div>
    );
}