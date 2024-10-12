"use server"

require("dotenv").config();

const { Client } = require("@notionhq/client");
const notion = new Client({ auth: process.env.NOTION_SECRET });

const groupType = [
    'bulleted_list_item',
    'numbered_list_item',
];
const groupTypeParent = {
    bulleted_list_item: "ul",
    numbered_list_item: "ol",
};
const notionBlockToHTML = {
    heading_1: "h1",
    heading_2: "h2",
    heading_3: "h3",
    heading_4: "h4",
    paragraph: "p",
    bulleted_list_item: "li",
    numbered_list_item: "li",
    code: "code",
    bold: "b",
    italic: "i",
};

const makeBlockObj = (block) => {
    let blockObj = {};
    let blockType = block["type"];
    let blockContent = block[blockType]["rich_text"];

    blockObj["blockType"] = notionBlockToHTML[blockType];
    if (blockContent.length > 1 || getAnnotations(blockContent[0].annotations).length > 0)
        blockObj["blockContent"] = processRichText(blockContent);
    else
        blockObj["blockContent"] = blockContent[0].plain_text;

    return blockObj; 
};

const getAnnotations = (annotationsRaw) => {
    let annotations = []; 
    try {
        annotations = Object.keys(annotationsRaw)
            .filter(key => annotationsRaw[key] && key !== 'color')
            .map(key1 => notionBlockToHTML[key1]);
    } catch (error) {
        console.log(`Error: ${error}`);
    } finally {
        return annotations;
    }
};

const processRichText = (rich_text) => {
    let richTextBlockCount = rich_text["length"];
    let richTextBlocks = [];
    for (let i = 0; i < richTextBlockCount; i++) {
        let curobj = {};
        let rtextcur = rich_text[i];
        let rtextcurtype = getAnnotations(rtextcur["annotations"]);

        if (rtextcurtype.length > 0) {
            curobj["blockType"] = rtextcurtype;
            curobj["blockContent"] = rtextcur["plain_text"];
            richTextBlocks.push(curobj);
        } else {
            richTextBlocks.push(rtextcur["plain_text"]);
        }
    }
    return richTextBlocks;
};

const processListBlock = (block, prevBlock) => {
    let blockObj = {};
    let blockType = block["type"];
    let tmppar = groupTypeParent[blockType];

    if (tmppar == prevBlock["blockType"]) {
        prevBlock["blockContent"].push(makeBlockObj(block));

    } else {
        blockObj["blockType"] = tmppar;
        blockObj["blockContent"] = [makeBlockObj(block)];
        return blockObj;
    }
};

/**
 * extractNotionPageBlockData:      extracts relevant block data.
 *                                  retrieves block type and content.
 * 
 * @param {Block[]} unprocessedNotionPageBlocks     an array of notion `Block` object
 * @returns 
 */
const extractNotionPageBlockData = (unprocessedNotionPageBlocks) => {
    if (!unprocessedNotionPageBlocks)
        return null;

    let processedBlocks = [];
    let prevBlock = {};

    unprocessedNotionPageBlocks.forEach(block => {
        let processedBlock = (groupType.includes(block["type"]))
            ? processListBlock(block, prevBlock)
            : makeBlockObj(block);
        if (processedBlock) {
            prevBlock = processedBlock;
            processedBlocks.push(processedBlock);
        }
    });

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
    const procBlocks = extractNotionPageBlockData(unprocBlocks.results);
    console.log(procBlocks);
    return procBlocks;
};