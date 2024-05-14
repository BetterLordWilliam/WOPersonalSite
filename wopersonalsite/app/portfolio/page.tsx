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
        <section className="mx-auto max-w-3xl">
            <h1 className="text-center text-4xl font-bold">Portfolio page</h1>
            <div className="p-4 grid grid-cols-3 gap-3">
                {allPortfolios.map((portfolio, index) => {
                    // Use the enabled property from the Notion document
                    if (portfolio.enabled) {
                        console.log("Here!");
                        return <PortfolioCard key={index} item={portfolio}></PortfolioCard>
                    }
                })}
            </div>
        </section>
    );
}

export default PortfolioIndex;