"use server"

require("dotenv").config();

const { Client } = require("@notionhq/client");
const notion = new Client({ auth: process.env.NOTION_SECRET });

/**
 * getDatanase:     testing methods, returns database object.
 * 
 * @returns {}      database object
 */
export const getDatabase = async () => {
    return await notion.databases.retrieve({
        database_id: process.env.NOTION_PORTFOLIO_DATABASE_ID
    });
};