"use server"

require("dotenv").config();

const { Client } = require("@notionhq/client");
const notion = new Client({ auth: process.env.NOTION_SECRET });

/**
 * getDatanase:     testing methods, returns database object.
 * 
 * @returns {}      database object
 */
export const getDatabase = async () => {
    return await notion.databases.retrieve({
        database_id: process.env.NOTION_PORTFOLIO_DATABASE_ID
    });
};

/**
 * extractNotionPageBlockData:      extracts relevant block data.
 *                                  retrieves block type and content.
 * 
 * @param {Block[]} unprocessedNotionPageBlocks     an array of notion `Block` object
 * @returns 
 */
const extractNotionPageBlockData = async (unprocessedNotionPageBlocks) => {
    if (!unprocessedNotionPageBlocks)
        return null;

    let processedBlocks = [];
    let blockNumber = unprocessedNotionPageBlocks.length;

    for (let i = 0; i < blockNumber; i++) {
        let block = unprocessedNotionPageBlocks[i];
        let tempBlockType = block.type;
        let processedBlock = {
            blockType: tempBlockType,
            blockContent: block[tempBlockType].rich_text[0].plain_text
        };
        processedBlocks.push(processedBlock);
    }

    return processedBlocks;
};

/**
 * extractPortfolioData:        retrieves valuable Notion data.
 * 
 * @param {*} portfolioObject   the raw response from Notion API
 * @returns                     Object with the valueable pieces of data
 */
const extractPortfolioData = (portfolioObject) => {
    if (!portfolioObject)
        return null;
    let po = portfolioObject.properties;

    const processedPortfolio = {
        endDate: po.endDate.date.start,
        startDate: po.startDate.date.start,
        repo: po.repo.url,
        try: po.try.url,
        title: po.title.title[0].plain_text,
        slug: po.slug.rich_text[0].plain_text,
        pageId: po.pageId.rich_text[0].plain_text,
        imageUrl: po.image.url,
        tags: po.tags.multi_select.map(tag => { 
            return tag.name 
        }),
    };

    // console.log(processedPortfolio);
    return processedPortfolio;
};

/**
 * extractPortfolioSlug:        retrieves slug value of a portfolio.
 * 
 * @param {} portfolioObject    portfolio query response
 * @returns {string}              Object that has contains portfolio slug   
 */
const extractPortfolioSlugs = (portfolioObjects) => {
    if (!portfolioObjects)
        return null;
    let slugs = [];

    portfolioObjects.forEach(portfolioObject => {
        let po = portfolioObject.properties;
        slugs.push(po.slug.rich_text[0].plain_text);
    });

    return slugs;
};

/**
 * getPortfolios:               retrieves all portfolio data using
 *                              the Notion API.
 * 
 * @returns {Portfolio[]}       Portfolio Objects
 */
export const getPortfolios = async () => {
   return (await notion.databases.query({
        database_id: process.env.NOTION_PORTFOLIO_DATABASE_ID,
        filter: {
            property: "enabled",
            checkbox: {
                equals: true
            }
        },
        filter_properties: [ 
            "%3A%5DHn", 
            "PMop", 
            "S%3DWZ", 
            "XJdJ",
            "lA%5C%5E",
            "xRKm",
            "%7DLJv",
            "y%5BLK",
            "u%7DV%5E",
            "title"
        ]
    })).results.map((result) => {
        return extractPortfolioData(result);
    });
};

/**
 * getPortfolioFromSlug:        retrieve Portfolio data using the Notion API
 *                              depending on slugs. Retrieve from one or several slugs.
 * 
 * @param {string | string[]} slugs     one or many Slugs (pbject with string values)
 * @returns {Portfolio}                 Portfolio, {} object with certain properties
 */
export const getPortfolioFromSlug = async (slugs) => {
    let slugQuery = [];     // Object to send as a request payload

    slugs.forEach(slug =>   // Construct an object containing the conditions to match any slugs
        slugQuery.push({ 
            property: "slug",
            rich_text: { 
                equals: slug
            } 
        })
    );

    return (await notion.databases.query({
        database_id: process.env.NOTION_PORTFOLIO_DATABASE_ID,
        filter: {
            and: [
                {
                    property: "enabled",
                    checkbox: {
                        equals: true
                    }
                },
                {or: slugQuery}
            ]
        }
    })).results.map((result) => {
        return extractPortfolioData(result);
    });
};

/**
 * getPortoliosSlugs:       retrieves complete list of slugs using the
 *                          Notion API for database portfolios.
 * 
 * @returns {string[]}        Arrays of Slug Objects
 */
export const getPortfolioSlugs = async () => {
    return extractPortfolioSlugs(
        (await notion.databases.query({
            database_id: process.env.NOTION_PORTFOLIO_DATABASE_ID,
            filter: {
                property: "enabled",
                checkbox: {
                    equals: true
                }
            }
        })).results
    );
};

/**
 * getPageContent:          retrieves the Blocks of a notion page 
 *                          using the Notion API given the notion page id.
 * 
 * @param {string} notionPageId     page id of a notion db page
 * @returns {Block[]}               Array of Block objects
 */
export const getPageContent = async (notionPageId) => {
    const unprocBlocks = await notion.blocks.children.list({block_id: notionPageId});
    const procBlocks = await extractNotionPageBlockData(unprocBlocks.results);
    return procBlocks;
};