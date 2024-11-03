import { ResponseObject, getPageContent } from "@scripts/notion-connection-util";
import { Cache } from "@scripts/cache";

/**
 * getPortfolioPageContent:     get
 * 
 * @param notionPageID 
 * @returns 
 */
const getPortfolioPageContent = async (notionPageID: string) => {
    const response: ResponseObject = await getPageContent(notionPageID);
    if (response.status !== "Error") {
        let resultsTemp = response.rest_body;
        // console.log("Results");
        // console.log(resultsTemp);
        return resultsTemp;
    } else {
        throw new Error(JSON.stringify(response.rest_body));
    }
};

/**
 * getPortfolioPageData:        get
 * 
 * @param {string} notionPageID 
 * @returns {any}
 */
export const getPortfolioPageData = async (notionPageID: string) => {
    const retrievedCached = Cache.get(notionPageID);
    if (retrievedCached) {
        return JSON.parse(retrievedCached as string);
    } else {
        const retrievedFromNotionDB = await getPortfolioPageContent(notionPageID);
        Cache.set(notionPageID, retrievedFromNotionDB);
        return retrievedFromNotionDB;
    }
};