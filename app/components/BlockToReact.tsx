import React from "react";
import JSX from "react";

import { ReactElement, DetailedReactHTMLElement } from "react";
import { Block } from "../portfolio/portfolio-types";

interface Params {
    pageBlocks: Block[]     // The Notion Content to be turned into TSX
};

const createElementNested = (block: Block) => {
    console.log(block);
    if (block["blockType"].length == 1) {
        block["blockType"] = block["blockType"][0];
        return JSX.createElement(
            block["blockType"],
            {key: block["blockType"] + Math.random()},
            createElement(block));
    } else {
        let temp = block["blockType"].shift();
        return JSX.createElement(
            temp,
            {key: temp + Math.random()},
            createElementNested(block));
    }
};

const createElement = (block: Block) => {
    if (typeof block == "string")
        return block;
    if (typeof block["blockType"] == typeof [])
        return createElementNested(block);

    if (typeof block["blockType"] == "string") {
        if (typeof block["blockContent"] == "string") {
            return JSX.createElement(
                block["blockType"],
                {key: block["blockType"] + Math.random()},
                block["blockContent"]);
        } else {
            return JSX.createElement(
                block["blockType"],
                {key: block["blockType"] + Math.random()},
                block["blockContent"].map((subBlock: Block) => createElement(subBlock)));
        }
    }
};

const parseBlocksToHTML = (blocks: Block[]) => {
    let parsed: ReactElement[] = [];
    blocks.forEach((block: Block) => {
        parsed.push(createElement(block));
    });
    return parsed;
};

export const MappedContent:React.FC<Params> = ({pageBlocks} ) => {
    return (
        <div>
            {parseBlocksToHTML(pageBlocks)}
        </div>
    );
};
