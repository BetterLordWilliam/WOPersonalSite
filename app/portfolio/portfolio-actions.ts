import { Portfolio } from "@portfolio/portfolio-types";
import { getPortfolioFromSlug } from "@scripts/get-portfolios.mjs";

const PortfolioCache = {
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
 * @returns {Portfolio[]}
 */
export const getPortfolioData = async (slugs: string | string[]) => {
    if (slugs.length === 0)
        return;

    // Retrieve portfolio data from slug list
    const slugArray = Array.isArray(slugs) ? slugs : [slugs];
    const retrievedCached: Portfolio[] = slugArray               
        .map((slug: string) => PortfolioCache.get(slug)) 
        .filter(Boolean)
        .map((unparsed) => (JSON.parse(unparsed as string)) as Portfolio);
    
    // retrieve slugs of missing portfolios
    // Retrieve missing portfolio data from Notion
    const missingPortfolioSlugs = slugArray.filter((slug: string) => 
        !retrievedCached.some((portfolio) => portfolio.slug === slug)
    );                                                      
    const retrievedFromNotionDB: Portfolio[] = missingPortfolioSlugs.length
        ? (await getPortfolioFromSlug(missingPortfolioSlugs)) as Portfolio[]
        : [];                                              

    // Updated the cache
    retrievedFromNotionDB.forEach(pd => PortfolioCache.set(pd.slug, pd));

    return [...retrievedCached, ...retrievedFromNotionDB];
};