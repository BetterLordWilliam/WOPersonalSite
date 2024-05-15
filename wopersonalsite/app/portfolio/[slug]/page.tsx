import { Portfolio, allPortfolios } from "contentlayer/generated";
import { notFound } from "next/navigation";

import Image from "next/image";
import Link from "next/link";
import { PortfolioTag } from "../../../components/PortfolioTag";
import { RegularButton } from "../../../components/RegularButton"; // to be used in the furture, trust me...

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
        //console.log("Here");
        notFound();
    };

    // Default content return
    return <div className="mb-8 p-4 mx-auto max-w-4xl">
        <h1 className="py-4 font-bold text-3xl">{item?.title}</h1>

        <div className="rounded bg-slate-900 flex flex-direction-row flex-wrap my-4 p-4">
            <div className="p-1"> Techstack </div>
            {item.tags.map((thisTag) => {
                return (
                    <div className="inline p-1">
                    <PortfolioTag tag={thisTag}></PortfolioTag>
                    </div>
                );
            })}
        </div>

        <Image className="w-full"
            src={item?.image.src} 
            alt={item?.title} 
            width={item?.image.width} 
            height={item?.image.height}/>

        <div 
            className="pt-8 pb-2"
            dangerouslySetInnerHTML={ {__html: item.body.html} }/>

        <div className="rounded bg-slate-900 flex my-4 p-4">
            {item.repo ? (
                <Link className="rounded mx-2 p-1 bg-slate-950" href={item.repo}>GitHub Repository</Link>
            ) : <span className="rounded mx-2 p-1 bg-slate-950 text-gray-500">GitHub Repository (Not Available)</span>}
            {item.hostedLink ? (
                <Link className="rounded mx-2 p-1 bg-slate-950" href={item.hostedLink}>Hosted Link</Link> 
            ): <span className="rounded mx-2 p-1 bg-slate-950 text-gray-500">Hosted Link (Not Available)</span>}
        </div>

        <Link className="block text-blue-500" href="/portfolio"> go pack to portfolio </Link>

    </div>
}

export default Page;