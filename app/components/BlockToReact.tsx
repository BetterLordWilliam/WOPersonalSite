import React from "react";

import { ReactElement } from "react";
import { Block } from "../portfolio/portfolio-types";

interface Params {
    elementIndex: string        // For unique identification
    unprocessedBlock: Block     // The Notion Content to be turned into TSX
};

// Mapping object notionBlokc -> html
const notionBlockToHTML: {[key: string]: string} = {
    heading_2: "h2",
    paragraph: "p"
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
const parseBlockToHTML = (block: Block, index: string): ReactElement => {
    let element: ReactElement = React.createElement(
        notionBlockToHTML[block.blockType] || "div",
        { key: index },
        block.blockContent
    );
    return element;
};

export const MappedContent:React.FC<Params> = ({ elementIndex, unprocessedBlock } ) => {
    return (
        <div>
            { parseBlockToHTML(unprocessedBlock, elementIndex) }
        </div>
    );
};
