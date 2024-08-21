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
 * @param {*} notionPageId
 * @returns
 */
export const getNotionPageBlocks = async (notionPageId) => {
    return (await notion.blocks.children.list({
        block_id: notionPageId
    })).results;
};

const extractPortfolioData = (portfolioObject) => {
    if (!portfolioObject)
        return {};

    const processedPortfolio = {
        endDate: portfolioObject.properties.endDate.date.start,
        startDate: portfolioObject.properties.startDate.date.start,
        repo: portfolioObject.properties.repo.url,
        try: portfolioObject.properties.try.url,
        title: portfolioObject.properties.title.title[0].plain_text,
        pageId: portfolioObject.properties.pageId.rich_text[0].plain_text,
        tags: portfolioObject.properties.tags.multi_select.map(tag => { 
            return tag.name 
        }),
        images: portfolioObject.properties.image.files.map(file => { 
            return {
                name: file.name,
                url: file.file.url
            }
        })
    };
    console.log(processedPortfolio);
    return processedPortfolio;
}

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
            "title"
        ]
    })).results.map((result) => {
        return extractPortfolioData(result);
    });
};