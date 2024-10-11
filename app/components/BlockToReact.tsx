import React from "react";
import JSX from "react";

import { ReactElement, DetailedReactHTMLElement } from "react";
import { Block } from "../portfolio/portfolio-types";

interface Params {
    pageBlocks: Block[]     // The Notion Content to be turned into TSX
};

/**
 *  parseBlockToHTML:   Parses a Notion block to React element.
 *                      Uses notionBlockToHTML object as a reference.
 *                      If an unknown type Notion block type is passed
 *                      into the method a div React element is returned. 
 *  
 * @param block         Block, a notion block
 * @param index         number, integer used for unique element identification 
 * @returns             ReactElement
 */
const parseBlockToHTML = (index: number | string, block: any): string | ReactElement => {
    console.log(block);
    
    if (typeof block == "string") {
        return block;
    }
    if (typeof block["blockType"] == "string" && typeof block["blockContent"] == "string") {
        return JSX.createElement(
            block["blockType"],
            {key: index + block["blockType"]},
            block["blockContent"]);
    } else if (typeof block["blockType"] == "string") {
        let childElements = block["blockContent"].map((blockContent: Block, i: number) => parseBlockToHTML(i, blockContent));
        let element = JSX.createElement(
            block["blockType"],
            {key: index + block["blockType"]},
            childElements);
        return element;
    }
};

const parseBlocksToHTML = (blocks: Block[]): ReactElement => {
    let parsed: ReactElement[] = [];

    blocks.map((block: Block, i) => {
        parsed.push(parseBlockToHTML(i, block));
    });

    return JSX.createElement(
        "div",
        {key: "parentOfParsedContent"},
        parsed);
};

export const MappedContent:React.FC<Params> = ({pageBlocks} ) => {
    return (
        <div>
            {parseBlocksToHTML(pageBlocks)}
        </div>
    );
};
