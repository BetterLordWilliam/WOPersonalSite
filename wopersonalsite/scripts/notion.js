// @ts-check

require("dotenv").config();
const NotionParse = require("@kodaps/notion-parse");

/**
 * go:                              code which retrieves notion portfolio content
 * NOTION_SECRET:                   the access to the Notion Page
 * NOTION_PORTFOLIO_DATABASE_ID:    the Notion Page that stores the actual project document content
 */
const go = async () => {

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

go().then(() => {
  console.log('Done');
});