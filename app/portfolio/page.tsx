"use client"

import { useEffect, useState } from "react";

import { Portfolio } from "@portfolio/portfolio-types";
import { getPortfolioData } from "@portfolio/portfolio-actions";
import { PortfolioCard } from "@components/PortfolioCardTest";
import { ErrorMessage } from "@components/ErrorMsg";

import Loading from "@components/Loading";

/**
 * PortfolioIndex:      Renders previews of portfolio pages in a gallery view.
 * 
 * @returns NextPage:   Rendered list of the portfolio pages, /portfolio
 */
const PortfolioIndex = () => {
    const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
    const [ghostPortfolios, setGhostPortfolios] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<Boolean>(true);
    const [isError, setIsError] = useState<Boolean>(false);

    useEffect(() => {
        /**
         * fetchPortfolios:         retrieves portfolios, either from storage
         *                          or requests the portfolios from the database.
         */
        const fetchPortfolios = async () => {
            try {
                const portfolioData = (await getPortfolioData()) as Portfolio[];
                setPortfolios(portfolioData);

            } catch (error) {
                console.log(`Error: ${error}`);
                setIsError(true);
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
                {isError && <ErrorMessage />}
                {isLoading && !isError && <Loading />}
                {!isLoading && !isError && portfolios.map((portfolio: Portfolio, i) => {
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