import React from "react";

import { ReactElement, ReactNode } from "react";

interface Params {
    unprocessedBlocks: {}[]
};

interface Block {
    blockType: string,
    blockContent: string
};

// Mapping object notionBlokc -> html
const notionBlockToHTML: {[key: string]: string} = {
    heading_2: "h2",
    paragraph: "p"
};

const parseBlockToHTML = (block: Block): ReactElement => {
    let element: ReactElement = React.createElement(
        notionBlockToHTML[block.blockType] || "div",
        null,
        block.blockContent
    );
 
    return element;
};

export const MappedContent:React.FC<Params> = ({ unprocessedBlocks } ) => {
    let elements: ReactElement[]= [];
    let count = 0;
    unprocessedBlocks.forEach(block => {
        elements.push(parseBlockToHTML(block as Block));
    });

    return (
        <div>
            { elements }
        </div>
    );
};
