"use client"

import NextImage from "next/image";
import Link from "next/link";

import { PortfolioTag } from "../../components/PortfolioTag";
import { ExternalLinkButton } from "../../components/ExternalLinkButton";
import { getPageContent } from "../../../scripts/notion-connection-util.mjs";
import { ImageThumbnail } from "../../components/ImageThumbnail";
import { MappedContent } from "../../components/MappedContent";

import { Portfolio } from "../page";
import { notFound, useSearchParams } from "next/navigation";
import { useState } from "react";

interface Params {
    params: {
        slug: string
    }
};

/**
 * Page:            Takes parameter which is the slug of the card who's info we will display, displays
 * 
 * @param slug:     String, the slug value of the portfolio information we will display
 * @returns         NextPage
 */
const Page:React.FC<Params> = ({ params: { slug } }) => {
    const item = (JSON.parse(localStorage.getItem(slug) as string)) as Portfolio;
    const [ portfolioPageContent, setPortfolioPageContent ] = useState<{}[]>([]);
        // PageContent should be generated JSX

    function retrievePageContentFromNotion() {
        // Retrieve notion page data
        getPageContent(item.pageId)
            .then(results => {
                setPortfolioPageContent(results as {}[]);
            })
            .catch(error => {
                console.log(`Error: ${error}`);
            });
    };
    retrievePageContentFromNotion();

    // 404 for not found item
    if (!item) {
        notFound();
    };

    // Default content return
    return (
        <div className="p-4 mx-auto max-w-4xl">
            <div className="flex justify-center">
                <h1 className="font-bold text-3xl">{item?.title}</h1>
            </div>

            <div className="rounded bg-zinc-800 flex flex-direction-row flex-wrap my-4 p-2">
                <div className="p-2"> Techstack </div>
                {item.tags.map((thisTag: string) => {
                    return (
                        <div key={thisTag} className="inline p-1">
                        <PortfolioTag tag={thisTag}></PortfolioTag>
                        </div>
                    );
                })}
            </div>

            <ImageThumbnail
                imageUrl={item.imageUrl} 
                altText={item.slug} />
            <MappedContent unprocessedBlocks={portfolioPageContent} />

            <div className="rounded bg-zinc-800 flex my-2 p-2">
                <div className="p-2"> Links </div>
                <ExternalLinkButton url={item.repo.toString()} buttonText="Github"></ExternalLinkButton>
                <ExternalLinkButton url={item.try.toString()} buttonText="Try"></ExternalLinkButton>
            </div>
            <div className="pt-2 pb-4 flex justify-center">
                <Link className="block text-blue-500" href="/portfolio"> go pack to portfolio </Link>
            </div>

        </div>
    );
}

export default Page;