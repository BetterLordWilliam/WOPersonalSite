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