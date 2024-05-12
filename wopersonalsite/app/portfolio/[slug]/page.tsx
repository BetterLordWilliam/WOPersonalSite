import { Portfolio, allPortfolios } from "contentlayer/generated";
import { notFound } from "next/navigation";

import Image from "next/image";
import Link from "next/link";

interface Params {
    params: {
        slug: string
    }
}

const Page:React.FC<Params> = ({params: {slug}}) => {
    //console.log(allPortfolios);
    const item = allPortfolios.find((item) => item.slug === slug);
    
    // 404 for not found item
    if (!item) {
        console.log("Here");
        notFound();
    };

    return <div className="mx-auto max-w-4xl">
        <h1 className="py-4 font-bold text-3xl">{item?.title}</h1>
        <Image className="w-full"
            src={item?.image.src} 
            alt={item?.title} 
            width={item?.image.width} 
            height={item?.image.height}/>
        <div 
            className="py-4"
            dangerouslySetInnerHTML={ {__html: item.body.html} }
        />
        <Link className="text-blue-500" href="/portfolio"> go pack to portfolio </Link>
    </div>
}

export default Page;