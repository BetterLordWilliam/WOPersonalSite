import { Portfolio } from "@portfolio/portfolio-types";
import { ResponseObject, queryDatabase } from "@scripts/notion-connection-util";
import { Cache } from "@scripts/cache";

/**
 * extractPortfolioData:            retrieves valuable Notion data.
 * 
 * @param {any} portfolioObject     the raw response from Notion API
 * @returns                         Object with the valueable pieces of data
 */
const extractPortfolioData = (portfolioObject: any): Portfolio | null => {
    if (!portfolioObject)
        return null;
    const po = portfolioObject.properties;
    console.log(po);
    const processedPortfolio = {
        endDate: po.endDate.date.start,
        startDate: po.startDate.date.start,
        repo: po.repo.url,
        try: po.try.url,
        title: po.title.title[0].plain_text,
        slug: po.slug.rich_text[0].plain_text,
        pageId: po.pageId.rich_text[0].plain_text,
        imageUrl: po.imageURL.url,
        tags: po.tags.multi_select.map((tag: any) => tag.name)
    };
    return processedPortfolio;
};

/**
 * getPortfolioFromSlug:        retrieve Portfolio data using the Notion API
 *                              depending on slugs. Retrieve from one or several slugs.
 * 
 * @param {string | string[]} slugs     one or many Slugs (pbject with string values)
 * @returns {Portfolio}                 Portfolio, {} object with certain properties
 */
const getPortfolioFromSlug = async (slugs: string[]) => {
    // Construct an object containing the conditions to match any slugs
    let slugQuery: any[] = [];     
    slugs.forEach(slug => slugQuery.push({property: "slug", rich_text: {equals: slug}}));
    const response: ResponseObject = await queryDatabase("NOTION_PORTFOLIO_DB", {
        and: [
            {property: "enabled", checkbox: {equals: true}},
            {or: slugQuery}
        ]
    });

    // Process API response
    if (response.status !== "Error") {
        // console.log("Success, response from notion:");
        // console.log(response);
        return response.rest_body.map((rawPortfolioObject: any) => extractPortfolioData(rawPortfolioObject));
    } else {
        throw new Error(JSON.stringify(response));
    }
};

/**
 * getPortoliosSlugs:       retrieves complete list of slugs using the.
 *                          Notion API for database portfolios.
 * 
 * @returns {string[]}      Arrays of Slug Objects
 */
const getPortfolioSlugs = async () => {
    const response: ResponseObject = await queryDatabase("NOTION_PORTFOLIO_DB", {
        property: "enabled",
        checkbox: {equals: true}
    });

    // Process API response
    if (response.status !== "Error") {
        // console.log("Success, response from notion");
        // console.log(response);
        return response.rest_body.map((portfolioDBEntries: any) => portfolioDBEntries.properties.slug.rich_text[0].plain_text);
    } else {
        throw new Error(JSON.stringify(response));
    }
};

/**
 * getPortfolioData:     updates the portfolio cache with missing
 *                       portfolio data. This is a helper function,
 *                       not sure if it will stay here.
 * 
 *                       Basically a wrapper function for the getPortfolioFromSlug
 *                       server-method. Caches results.
 * 
 * @param {string | string[]} givenSlugs    takes
 * @returns {Portfolio[]}                   returns
 */
export const getPortfolioData = async (givenSlugs?: string | string[]) => {
    // Retrieve portfolio data from slug list
    const slugs = (givenSlugs) ? givenSlugs : await getPortfolioSlugs();
    const slugArray = Array.isArray(slugs) ? slugs : [slugs];
    const retrievedCached: Portfolio[] = slugArray               
        .map((slug: string) => Cache.get(slug))
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
    retrievedFromNotionDB.forEach(pd => Cache.set(pd.slug, pd));

    return [...retrievedCached, ...retrievedFromNotionDB];
};