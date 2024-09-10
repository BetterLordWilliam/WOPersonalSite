"use client"

import { useEffect, useState } from "react";

import { Portfolio, PortfolioCache } from "../types";
import { PortfolioCard } from "../components/PortfolioCardTest";
import { getPortfolios, getPortfoliosPreview, getPortfolioFromSlug } from "../../scripts/notion-connection-util.mjs";

interface Slug {
    slug: string
};

/**
 * PortfolioIndex:      Renders previews of portfolio pages in a gallery view.
 * 
 * @returns NextPage:   Rendered list of the portfolio pages, /portfolio
 */
const PortfolioIndex = () => {
    const [ portfolios, setPortfolios ] = useState<Portfolio[]>([]);
    const [ isLoading, setIsLoading ] = useState<Boolean>(true);

    useEffect(() => {
        /**
         * fetchPortfolios:         retrieves portfolios, either from storage
         *                          or requests the portfolios from the database.
         */
        const fetchPortfolios = async () => {
            try {
                let portfolioSlugs = await getPortfoliosPreview() as Slug[];
                let retrievedCached: Portfolio[] = portfolioSlugs
                    .map((slug: Slug) => PortfolioCache.get(slug.slug)) 
                    .filter(Boolean)
                    .map((unparsed: string) => JSON.parse(unparsed) as Portfolio);

                let missingPortfolios = portfolioSlugs.filter((slug: Slug) => 
                    !retrievedCached.some((portfolio) => portfolio.slug === slug.slug));

                // implement method to retrieve individual portfolios, combine with the retrived
                // portfolios in `setPortfolios` call below

                let retrievedFromNotionDB = await Promise.all(
                    missingPortfolios.map(async (missingPortfolio) => {
                        let retrievedFromNotion = (await getPortfolioFromSlug(missingPortfolio.slug))[0] as Portfolio;
                        PortfolioCache.set(missingPortfolio.slug, retrievedFromNotion);
                        return retrievedFromNotion;
                    })
                );
                
                setPortfolios([...retrievedCached, ...retrievedFromNotionDB]);

            } catch (error) {
                console.log(`Error: ${error}`);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPortfolios();
    }, []);
    
    return (
        <section className="mx-auto max-w-5xl">
            <div className="mx-4">
            <h1 className="pb-4">Project Portfolios</h1>
            <div className="my-4 p-2 rounded bg-closeishToBlack">
                <p>
                    Here is the list of the projects that I have worked on / am working on.
                    If any project interests you, click the thumbnail below to view the details of that project.
                </p>
                <p>
                    You will also find links to GitHub repositories, hosted links and compiled projects.
                </p>
            </div>
            <div className="rounded bg-closeiToBlack flex flex-direction-row flex-wrap justify-center gap-4">
                {isLoading && <div>Loading. . .</div>}
                {portfolios.map((portfolio: Portfolio, i) => {
                    return (
                        <PortfolioCard key={i} item={portfolio}></PortfolioCard>
                    );
                })}
            </div>
            </div>
        </section>
    );
};

export default PortfolioIndex;