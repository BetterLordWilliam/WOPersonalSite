"use server"

require("dotenv").config();
// const createElementNested = (block: Block, cur: number): ReactElement | string => {
//     let element: ReactElement | string;
//     let temp = block["blockType"][cur];
//     // console.log(temp);

//     if (cur == block["blockType"].length - 1) {
//         element = JSX.createElement(
//             temp,
//             {key: temp + Math.random()},
//             createElement(block["blockContent"]));
//         // console.log("Final");
//         // console.log(block);
//         // console.log(element);
//         return element;
//     } else {
//         element = JSX.createElement(
//             temp,
//             {key: temp + Math.random()},
//             createElementNested(block, ++cur));
//         // console.log("Nested");
//         // console.log(temp);
//         // console.log(block);
//         // console.log(element);
//         return element;
//     }
// };

// const createElement = (block: Block | string): ReactElement | string => {
//     let element;
    
//     if (typeof block == "string")
//         return block;
//     if (typeof block["blockType"] == typeof []) {
//         element = createElementNested(block, 0);
//         // console.log(element);
//         return element;

//     } else {
//         if (typeof block["blockContent"] == "string") {
//             element =  JSX.createElement(
//                 block["blockType"],
//                 {key: block["blockType"] + Math.random()},
//                 block["blockContent"]);
//             // console.log(element);
//             return element
//         } else {
//             element = JSX.createElement(
//                 block["blockType"],
//                 {key: block["blockType"] + Math.random()},
//                 block["blockContent"].map((subBlock: Block) => createElement(subBlock)));
//             // console.log(element);
//             return element;
//         }
//     }
// };

// const parseBlocksToHTML = (blocks: Block[]) => {
//     let parsed: ReactElement[] = [];
//     blocks.forEach((block: any) => {
//         // console.log(block);
//         // console.log("START");
//         // console.log(block["blockContent"]);
//         let element = createElement(block) as ReactElement;
//         // console.log(element);
//         // console.log("END");
//         parsed.push(element);
//     });
//     return parsed;
// };
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
    table: "table",
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
            console.log(processedBlock["blockContent"]);
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
 * @returns {Block[]}                JSON string Array of Block objects
 */
export const getPageContent = async (notionPageId) => {
    const unprocBlocks = await notion.blocks.children.list({block_id: notionPageId});
    const procBlocks = extractNotionPageBlockData(unprocBlocks.results);
    
    return procBlocks;
};