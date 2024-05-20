import { NextPage } from "next";
import { allPortfolios } from "contentlayer/generated";
import { PortfolioCard } from "@/components/PortfolioCard";

/**
 * PortfolioIndex:      Renders previews of portfolio pages in a gallery view.
 * 
 * @returns NextPage:   Rendered list of the portfolio pages, /portfolio
 */
const PortfolioIndex: NextPage = () => {
    return (
        <section className="mx-auto max-w-5xl">
            <div className="mx-4">
            <h1 className="pb-4">Project Portfolios</h1>
            <div className="my-4 p-2 rounded bg-closeishToBlack">
                <p>
                    Here is the list of major projects that I have worked on / am working on.
                    If any project interests you, click the thumbnail below to view the details of that project.
                </p>
                <p>
                    You will also find links to GitHub repositories, hosted links and compiled projects.
                </p>
            </div>
            <div className="rounded bg-closeiToBlack flex flex-direction-row flex-wrap justify-center gap-4">
                {allPortfolios.map((portfolio, index) => {
                    // Use the enabled property from the Notion document
                    if (portfolio.enabled) {
                        return <PortfolioCard key={index} item={portfolio}></PortfolioCard>
                    }
                })}
            </div>
            </div>
        </section>
    );
}

export default PortfolioIndex;