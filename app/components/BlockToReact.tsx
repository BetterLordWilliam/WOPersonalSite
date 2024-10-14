import React, { ReactNode } from "react";
import JSX from "react";

import { ReactElement, DetailedReactHTMLElement } from "react";
import { Block } from "../portfolio/portfolio-types";

interface Params {
    pageBlocks: Block[]     // The Notion Content to be turned into TSX
};

const createElementNested = (block: Block): ReactElement | string => {
    let element: ReactElement | string;
    
    // console.log(block);
    if (block["blockType"].length == 1) {
        block["blockType"] = block["blockType"][0];
        element = createElement(block);
        console.log("Final");
        console.log(block);
        console.log(element);
        return element;
    } else {
        let temp = block["blockType"].shift();
        element = JSX.createElement(
            temp,
            {key: temp + Math.random()},
            createElementNested(block));
        console.log("Nested");
        console.log(temp);
        console.log(block);
        console.log(element);
        return element;
    }
};

const createElement = (block: Block): ReactElement | string => {
    let element: ReactElement | string;
    
    if (typeof block == "string")
        return block;
    if (typeof block["blockType"] == typeof []) {
        element = createElementNested(block);
        console.log(element);
        return element;
    }

    if (typeof block["blockType"] == "string") {
        if (typeof block["blockContent"] == "string") {
            element =  JSX.createElement(
                block["blockType"],
                {key: block["blockType"] + Math.random()},
                block["blockContent"]);
            console.log(element);
            return element
        } else {
            element = JSX.createElement(
                block["blockType"],
                {key: block["blockType"] + Math.random()},
                block["blockContent"].map((subBlock: Block) => createElement(subBlock)));
            console.log(element);
            return element;
        }
    }
};

const parseBlocksToHTML = (blocks: Block[]) => {
    let parsed: ReactElement[] = [];
    blocks.forEach((block: Block) => {
        console.log("START");
        console.log(block["blockContent"]);
        let element = createElement(block) as ReactElement;
        console.log(element);
        console.log("END");
        parsed.push(element);
    });
    return parsed;
};

export const MappedContent:React.FC<Params> = ({pageBlocks} ) => {
    
    return (
        <div className="px-5">
            {parseBlocksToHTML(pageBlocks)}
        </div>
    );
};
