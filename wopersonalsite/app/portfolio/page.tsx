import { NextPage } from "next";
import { allPortfolios } from "contentlayer/generated";
import { PortfolioCard } from "@/components/PortfolioCard";

const PortfolioIndex: NextPage = () => {
    return (
        <section className="mx-auto max-w-3xl">
            <h1 className="text-center text-4xl font-bold">Portfolio page</h1>
            <div className="p-4 grid grid-cols-3 gap-3">
                {allPortfolios.map((portfolio, index) => 
                    <PortfolioCard key={index} item={portfolio}></PortfolioCard>)}
            </div>
        </section>
    );
}

export default PortfolioIndex;