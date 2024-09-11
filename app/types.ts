import { getPortfolioFromSlug } from "@/scripts/notion-connection-util.mjs";

export interface Portfolio {
    endDate: Date,
    startDate: Date,
    pageId: string,
    slug: string,
    repo: string,
    try: string
    tags: string[],
    imageUrl: string,
    title: string
};

export interface Block {
    blockType: string,
    blockContent: string
};

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
 * @param slug 
 * @returns 
 */
export const retrieveMissing = async (slug: string) => {
    const portfolioData = (await getPortfolioFromSlug(slug))[0] as Portfolio;
    PortfolioCache.set(slug, portfolioData);
    return portfolioData;
};