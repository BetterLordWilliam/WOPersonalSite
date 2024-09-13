"use client"

import { useEffect, useState } from "react";

import { Portfolio,  } from "./portfolio-types";
import { PortfolioCache, retrieveMissing } from "./portfolio-actions";
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
    const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
    const [isLoading, setIsLoading] = useState<Boolean>(true);

    useEffect(() => {
        /**
         * fetchPortfolios:         retrieves portfolios, either from storage
         *                          or requests the portfolios from the database.
         */
        const fetchPortfolios = async () => {
            try {
                const portfolioSlugs = await getPortfoliosPreview() as Slug[];  // Retrieve list of portfolio slugs
                const retrievedCached: Portfolio[] = portfolioSlugs             // Retrieve portfolio data from slug list
                    .map((slug: Slug) => PortfolioCache.get(slug.slug)) 
                    .filter(Boolean)
                    .map((unparsed) => JSON.parse(unparsed as string) as Portfolio);        // Parse and cast as Portfolio type
                
                const missingPortfolios = portfolioSlugs.filter((slug: Slug) => 
                    !retrievedCached.some((portfolio) => portfolio.slug === slug.slug));    // retrieve slugs of missing portfolios

                // Request portfolio data for missing slugs
                // TODO: Create a list of missing slugs and query from DB at once
                const retrievedFromNotionDB = await Promise.all(
                    missingPortfolios.map(
                        async (missingPortfolio) => (await retrieveMissing(missingPortfolio.slug)) as Portfolio
                ));
                
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