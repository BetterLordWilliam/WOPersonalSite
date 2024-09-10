"use server"

require("dotenv").config();

const { Client } = require("@notionhq/client");
const notion = new Client({ auth: process.env.NOTION_SECRET });

export const getDatabase = async () => {
    return await notion.databases.retrieve({
        database_id: process.env.NOTION_PORTFOLIO_DATABASE_ID
    });
};

/**
 * getPage:     returns page of specified id.
 *    
 * @param {*} notionPageId      Notion pageID
 * @returns                     response from Notion API 
 *                              (object with blocks & metadata)
 */
const getNotionPageBlocks = async (notionPageId) => {
    return (await notion.blocks.children.list({
        block_id: notionPageId
    })).results;
};

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

const extractPortfolioSlug = (portfolioObject) => {
    if (!portfolioObject)
        return null;

    let po = portfolioObject.properties;

    const processedPortfolio = {
        slug: po.slug.rich_text[0].plain_text
    };

    console.log(processedPortfolio);
    return processedPortfolio;
};

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

export const getPortfoliosPreview = async () => {
    return (await notion.databases.query({
        database_id: process.env.NOTION_PORTFOLIO_DATABASE_ID,
        filter: {
            property: "enabled",
            checkbox: {
                equals: true
            }
        }
    })).results.map((result) => {
        return extractPortfolioSlug(result);
    });
};

export const getPageContent = async (notionPageId) => {
    let notionPageBlocks = await getNotionPageBlocks(notionPageId);
    return (await extractNotionPageBlockData(notionPageBlocks));
};