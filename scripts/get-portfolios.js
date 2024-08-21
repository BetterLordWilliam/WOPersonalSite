"use server"

const NotionParse = require("@kodaps/notion-parse");
const dotenv = require("dotenv");

dotenv.config();

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