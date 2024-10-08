"use server"

require("dotenv").config();

const { Client } = require("@notionhq/client");
const notion = new Client({ auth: process.env.NOTION_SECRET });

const portfoliodbID = process.env.NOTION_PORTFOLIO_DATABASE_ID;
const portfoliodbFields = JSON.parse(process.env.NOTION_PORTFOLIO_DATABASE_FIELDS);

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
        console.log(block[block.type].rich_text);
        let processedBlock = {
            blockType: tempBlockType,
            blockContent: block[tempBlockType].rich_text[0].plain_text
        };
        processedBlocks.push(processedBlock);
    }

    return processedBlocks;
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