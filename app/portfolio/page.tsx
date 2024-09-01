"use client"

import { useEffect, useState } from "react";

import { Portfolio } from "../types";
import { PortfolioCard } from "../components/PortfolioCardTest";
import { getPortfolios } from "../../scripts/notion-connection-util.mjs";

/**
 * PortfolioIndex:      Renders previews of portfolio pages in a gallery view.
 * 
 * @returns NextPage:   Rendered list of the portfolio pages, /portfolio
 */
const PortfolioIndex = () => {
    const [portfolios, setPortfolios] = useState<Portfolio[]>([]);

    useEffect(() => {
        const fetchPortfolios = async () => {
            try {
                const results = await getPortfolios() as Portfolio[];
                results.forEach(portfolio => {
                    localStorage.setItem(portfolio.slug, JSON.stringify(portfolio));
                });
                setPortfolios(results);
            } catch (error) {
                console.log(`Error: ${error}`);
            }
        }
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
                {portfolios.map((portfolio: Portfolio, i) => {
                    return (
                        <PortfolioCard key={i} item={portfolio}></PortfolioCard>
                    );
                })}
            </div>
            </div>
        </section>
    );
}

export default PortfolioIndex;