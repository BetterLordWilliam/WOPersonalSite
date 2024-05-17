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
            <h1 className="pb-8 text-center text-4xl font-bold">Project Portfolios</h1>
            <div className="pb-8 flex flex-direction-row flex-wrap justify-center gap-4">
                {allPortfolios.map((portfolio, index) => {
                    // Use the enabled property from the Notion document
                    if (portfolio.enabled) {
                        return <PortfolioCard key={index} item={portfolio}></PortfolioCard>
                    }
                })}
            </div>
        </section>
    );
}

export default PortfolioIndex;