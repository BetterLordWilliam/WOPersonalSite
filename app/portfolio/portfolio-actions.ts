import { Portfolio } from "@portfolio/portfolio-types";
import { getPortfolioFromSlug } from "@scripts/notion-connection-util.mjs";

export const PortfolioCache = {
    get: (slug: string) => {
        return localStorage.getItem(slug)
    },
    set: (slug: string, portfolio: Portfolio) => {
        localStorage.setItem(slug, JSON.stringify(portfolio))
    },
    clear: () => { localStorage.clear() }
};

/**
 * updateCache:     updates the portfolio cache with missing
 *                  portfolio data. This is a helper function,
 *                  not sure if it will stay here.
 * 
 *                  Basically a wrapper function for the getPortfolioFromSlug
 *                  server-method. Caches results.
 * 
 * @param slug 
 * @returns
 */
export const retrieveMissing = async (slug: string | string[]) => {
    if (slug.length === 0)
        return;
    const portfolioData = (await getPortfolioFromSlug(slug)) as Portfolio[];
    portfolioData.forEach(pd => PortfolioCache.set(pd.slug, pd));
    return portfolioData;
};