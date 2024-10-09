"use server"

require("dotenv").config();

const { Client } = require("@notionhq/client");
const notion = new Client({ auth: process.env.NOTION_SECRET });
const groupType = [
    'bulleted_list_item',
    'numbered_list_item'
];

const getAnnotations = (annotationsRaw) => {
    let annotations = []; 
    try {
        annotations = Object.keys(annotationsRaw)
            .filter(key => annotationsRaw[key] && key !== 'color');
    } catch (error) {
        console.log(`Error: ${error}`);
    } finally {
        return annotations;
    }
};

const makeBlockObj = (blockType, blockContent) => {
    let blockObj = {};
    blockObj.blockType = blockType;
    if (blockContent.length > 1 || getAnnotations(blockContent[0].annotations).length > 0) {
        blockObj.blockContent = processRichText(blockContent);
    } else
        blockObj.blockContent = blockContent[0].plain_text;
    console.log(blockObj);
    return blockObj; 
};

const processRichText = (rich_text) => {
    let richTextBlockCount = rich_text.length;
    let richTextBlocks = [];
    for (let i = 0; i < richTextBlockCount; i++) {
        let curobj = {};
        let rtextcur = rich_text[i];
        let curannotations = getAnnotations(rtextcur.annotations);
        let rtextcurtype = (curannotations.length > 0) ? curannotations : 'text';

        curobj.blockType = rtextcurtype;
        curobj.blockContent = rtextcur.plain_text;
        richTextBlocks.push(curobj);
    }
    return richTextBlocks;
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

    let blockNumber = unprocessedNotionPageBlocks.length;
    let processedBlocks = [];

    for (let i = 0; i < blockNumber; i++) {
        let block = unprocessedNotionPageBlocks[i];
        let tempBlockType = block.type;
        let processedBlock = makeBlockObj(tempBlockType, block[tempBlockType].rich_text);

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