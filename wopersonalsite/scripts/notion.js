// @ts-check

require("dotenv").config();
const NotionParse = require("@kodaps/notion-parse");

console.log(process.env.NOTION_SECRET);
console.log(process.env.NOTION_PORTFOLIO_DATABASE_ID);

/**
 * go:                              code which retrieves notion portfolio content
 * NOTION_SECRET:                   the access to the Notion Page
 * NOTION_PORTFOLIO_DATABASE_ID:    the Notion Page that stores the actual project document content
 */
const go = async() => {
    if (process.env.NOTION_SECRET) {
        // @ts-ignore
        await NotionParse.parseNotion(process.env.NOTION_SECRET, "../content", [
            {
                databaseId:     process.env.NOTION_PORTFOLIO_DATABASE_ID || "",
                contentType:    "portfolio",  
            },
        ])
    }
}

// Test
go().then(()=>{
    console.log("done");
})