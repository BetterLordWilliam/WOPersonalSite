"use client"

import Link from "next/link";

import { notFound } from "next/navigation";
import { useState, useEffect } from "react";

import { Portfolio, PortfolioCache, retrieveMissing, Block } from "../../types";
import { PortfolioTag } from "../../components/PortfolioTag";
import { ExternalLinkButton } from "../../components/ExternalLinkButton";
import { ImageThumbnail } from "../../components/ImageThumbnail";
import { MappedContent } from "../../components/BlockToReact";
import { getPageContent, getPortfolioFromSlug } from "@/scripts/notion-connection-util.mjs";

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
const Page:React.FC<Params> = ({params: {slug}}) => {
    const [item, setItem] = useState<Portfolio>();
    const [portfolioPageContent, setPortfolioPageContent] = useState<Block[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const retrievePageBlocks = async () => {
            try {
                const retrieved = PortfolioCache.get(slug);     // Retrieve portfolio data from cache
                const portfolio = retrieved 
                    ? JSON.parse(retrieved) as Portfolio 
                    : (await retrieveMissing(slug)) as Portfolio

                const pageBlocks = await getPageContent(portfolio.pageId) as Block[];   // Retrieve the related page details

                setItem(portfolio);                             // Save portfolio data
                setPortfolioPageContent(pageBlocks);            // Save page content

            } catch (error) {
                console.log(`Error: ${error}`);
            } finally {
                setIsLoading(false);
            }
        };
        retrievePageBlocks();
    });

    // Default content return
    return (
        <section className="p-4 mx-auto max-w-4xl">
            <div className="flex justify-center">
                <h1 className="font-bold text-3xl">{item?.title}</h1>
            </div>

            {isLoading && <div>Loading. . .</div>}
            {!isLoading && !item && notFound()}
            {!isLoading && item && <div>
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
                <div>
                    {portfolioPageContent.map((portfolioPageBlock: Block, i: number) => {
                        return (
                            <MappedContent
                                key={i}
                                elementIndex={`${slug}-${i}`}
                                unprocessedBlock={portfolioPageBlock} />
                        );
                    })}
                </div>

                <div className="rounded bg-zinc-800 flex my-2 p-2">
                    <div className="p-2"> Links </div>
                    <ExternalLinkButton url={item.repo.toString()} buttonText="Github"></ExternalLinkButton>
                    <ExternalLinkButton url={item.try.toString()} buttonText="Try"></ExternalLinkButton>
                </div>
                <div className="pt-2 pb-4 flex justify-center">
                    <Link className="block text-blue-500" href="/portfolio"> go pack to portfolio </Link>
                </div>
            </div>}
        </section>
    );
}

export default Page;