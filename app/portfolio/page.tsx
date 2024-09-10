"use client"

import { useEffect, useState } from "react";

import { Portfolio } from "../types";
import { PortfolioCard } from "../components/PortfolioCardTest";
import { getPortfolios, getPortfoliosPreview } from "../../scripts/notion-connection-util.mjs";

interface Slug {
    slug: string
};

const PorftfolioCache = {
    get: (slug: Slug) => {} ,
    set: (slug: Slug) => {} ,
    clear: () => {localStorage.clear()}
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
         * getCachedPortfolios:     helper method to retrieve portfolios that have
         *                          been stored in browser memory.
         * 
         * @param slugList 
         * @returns 
         */
        const getCachedPortfolios = (slugList: Slug[]) => {
            if (!slugList)
                return null;

            let retrievedPortfolios: Portfolio[] = [];
            slugList.forEach((slug: Slug) => {
                let retrievedPortfolioData = localStorage.getItem(slug.slug);
                if (retrievedPortfolioData)
                    retrievedPortfolios.push(JSON.parse(retrievedPortfolioData));
            });

            return retrievedPortfolios;
        };

        /**
         * fetchPortfolios:         retrieves portfolios, either from storage
         *                          or requests the portfolios from the database.
         */
        const fetchPortfolios = async () => {
            try {
                let portfolioSlugs = await getPortfoliosPreview();
                let retrievedPortfolios = getCachedPortfolios(portfolioSlugs as Slug[]) as Portfolio[];

                if (!retrievedPortfolios) {
                    // alert(`Retrieving Portfolio Data.`);
                    const results = await getPortfolios() as Portfolio[];
                    results.forEach(portfolio => {
                        localStorage.setItem(portfolio.slug, JSON.stringify(portfolio));
                    });
                    setPortfolios(results);
                } else {
                    // alert(`Using cached portfolios.`);
                    setPortfolios(retrievedPortfolios);
                }

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