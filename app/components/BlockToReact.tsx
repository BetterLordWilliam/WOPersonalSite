import React, { ReactNode } from "react";
import JSX from "react";

import { ReactElement, DetailedReactHTMLElement } from "react";
import { Block } from "../portfolio/portfolio-types";

interface Params {
    pageBlocks: Block[]     // The Notion Content to be turned into TSX
};

const createElementNested = (block: Block, cur: number): ReactElement | string => {
    let element: ReactElement | string;
    let temp = block["blockType"][cur];
    // console.log(temp);

    if (cur == block["blockType"].length - 1) {
        element = JSX.createElement(
            temp,
            {key: temp + Math.random()},
            createElement(block["blockContent"]));
        // console.log("Final");
        // console.log(block);
        // console.log(element);
        return element;
    } else {
        element = JSX.createElement(
            temp,
            {key: temp + Math.random()},
            createElementNested(block, ++cur));
        // console.log("Nested");
        // console.log(temp);
        // console.log(block);
        // console.log(element);
        return element;
    }
};

const createElement = (block: Block | string): ReactElement | string => {
    let element;
    
    if (typeof block == "string")
        return block;
    if (typeof block["blockType"] == typeof []) {
        element = createElementNested(block, 0);
        // console.log(element);
        return element;

    } else {
        if (typeof block["blockContent"] == "string") {
            element =  JSX.createElement(
                block["blockType"],
                {key: block["blockType"] + Math.random()},
                block["blockContent"]);
            // console.log(element);
            return element
        } else {
            element = JSX.createElement(
                block["blockType"],
                {key: block["blockType"] + Math.random()},
                block["blockContent"].map((subBlock: Block) => createElement(subBlock)));
            // console.log(element);
            return element;
        }
    }
};

const parseBlocksToHTML = (blocks: Block[]) => {
    let parsed: ReactElement[] = [];
    blocks.forEach((block: any) => {
        // console.log(block);
        // console.log("START");
        // console.log(block["blockContent"]);
        let element = createElement(block) as ReactElement;
        // console.log(element);
        // console.log("END");
        parsed.push(element);
    });
    return parsed;
};

export const MappedContent:React.FC<Params> = ({pageBlocks}) => {
    // console.log(pageBlocks);
    let parsed = parseBlocksToHTML(pageBlocks);

    return (
        <div className="px-5">
            {parsed}
        </div>
    );
};
