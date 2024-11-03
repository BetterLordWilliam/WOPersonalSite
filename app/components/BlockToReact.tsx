import React, { ReactNode } from "react";

// WANT TO IMPROVE THIS LATER!
// For now, only capable or processing basic stuff. Doesn't even process lists correctly!

interface Params {
    pageBlocks: any     // The Notion Content to be turned into TSX
};

const groupType = [
    'bulleted_list_item',
    'numbered_list_item',
];
const groupTypeParent: {[key: string]: string} = {
    bulleted_list_item: "ul",
    numbered_list_item: "ol",
};
const notionBlockToHTML: {[key: string]: string} = {
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

const getAnnotations = (annotationsRaw: any) => {
    let annotations: string[] = []; 
    if (!annotationsRaw)
        null;

    return annotations = Object.keys(annotationsRaw)
        .filter(key => annotationsRaw[key] && key !== 'color')
        .map(key1 => notionBlockToHTML[key1]);
};

const processRichText = (richText: any) => {
    return richText.map((text: any) => {
        const { plain_text, annotations } = text;
        const tags = getAnnotations(annotations);

        return tags.reduceRight((content, TagName) => (
            React.createElement(
                TagName,
                {key: `${TagName} ${Math.random()}`},
                content
            )
        ), plain_text);
    });
};

 const processBlock = (block: any) => {
    const { type, [type]: { rich_text } } = block;
    const TagName: string = notionBlockToHTML[type];
    return React.createElement(
        TagName,
        {key: `${TagName} ${Math.random()}`},
        processRichText(rich_text)
    );
};

export const MappedContent:React.FC<Params> = ({pageBlocks}) => {
    // console.log(pageBlocks);
    // let parsed = parseBlocksToHTML(pageBlocks);
    // let parsed = <div>Temp</div>;
    let parsed = pageBlocks.map(processBlock);
    console.log(pageBlocks);

    return (
        <div>
            {parsed}
        </div>
    );
};