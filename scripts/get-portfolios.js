"use server"

const NotionParse = require("@kodaps/notion-parse");
const dotenv = require("dotenv");

dotenv.config();

// const { Client } = require("@notionhq/client");
// const notion = new Client({ auth: process.env.NOTION_SECRET });

/*export const getPortfolios = async () => {
  if (process.env.NOTION_SECRET) {
    try {
      return await notion.databases.query({
        database_id: process.env.NOTION_PORTFOLIO_DATABASE_ID,
        filter: {
            property: "enabled",
            checkbox: {
              equals: true
            }
        },
        filter_properties: [
          "%3A%5DHn",   // endDate
          "PMop",       // startDate
          "S%3DWZ",     // repo
          "XJdJ",       // tags
          "lA%5C%5E",   // image
          "xRKm",       // enabled
          "%7DLJv",     // try
          "title"
        ]
      });

    } catch (error) {
      console.log(`Error: ${error}`);
      return null;
    }
  }
};*/

/**
 * go:                              code which retrieves notion portfolio content
 * NOTION_SECRET:                   the access to the Notion Page
 * NOTION_PORTFOLIO_DATABASE_ID:    the Notion Page that stores the actual project document content
 */

const getPortfolios = async () => {
  if (process.env.NOTION_SECRET) {
    await NotionParse.parseNotion(process.env.NOTION_SECRET, './content', [
      {
        databaseId: process.env.NOTION_PORTFOLIO_DATABASE_ID || '',
        contentType: 'Portfolio'
      },
      /*{
        databaseId: process.env.NOTION_POST_DATABASE_ID || '',
        contentType: 'Post',
        languageField: 'lang',
        filterFields: [ 'translation', 'createdAt', 'status', 'Type']
      },*/
    ])
  }
};

getPortfolios().then(() => {
  console.log("Portfolios got.");
})