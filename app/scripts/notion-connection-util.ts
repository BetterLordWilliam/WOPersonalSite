"use server"

require("dotenv").config();

import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_SECRET });
const dbs: {[key: string]: any} = {
    NOTION_PORTFOLIO_DB: process.env.NOTION_PORTFOLIO_DATABASE_ID as string
};
const dbFieldEncodedFieldRefs: {[key: string]: any} = {
    NOTION_PORTFOLIO: JSON.parse(process.env.NOTION_PORTFOLIO_DATABASE_FIELDS as string) as string[]
};

type FilterFunction = (rawJSON: JSON) => JSON;
type QueryObject = {
    database_id: any,
    filter?: any,
    filter_properties?: string[]
};

export type ResponseObject = {
    status: "Incomplete" | "Success" | "Error",
    error_message?: string,
    rest_message?: string,
    rest_body?: any,
};

/**
 * errorObj:                Return a valid response object conveying error information.
 *                          Use to control erroneuous REST calls.
 * 
 * @param {string} errorMessage 
 * @returns {ResponseObject}
 */
const errorObj = (errorMessage: string, errorRestMessage: string, errorRestBody: any): ResponseObject => {
    let error: ResponseObject = {
        status: "Error",
        error_message: errorMessage,
        rest_message: errorRestMessage,
        rest_body: errorRestBody
    };
    return error
};

/**
 * queryDatabase:           query a specified notion database.
 *                          Takes a filter function to process the REST call data.
 *                          Returns REST response otherwise.
 * 
 * @param {string} dbID                         ID of the notion database.
 * @param {any} queryFilterObject               Query filter, as per notion docs, specified by caller.
 * @param {string} queryFilterProperties        List of properties to filter.
 * @return {ResponseObject}                     Response of REST w/ other details.
 */
export const queryDatabase = async (
    dbID: string,
    queryFilterObject?: any,
    queryFilterProperties?: string
) => {
    // Construct query object, fire query
    const queryObject: QueryObject = {database_id: dbs[dbID]};
    if (queryFilterObject)
        queryObject.filter = queryFilterObject;
    if (queryFilterProperties)
        queryObject.filter_properties = dbFieldEncodedFieldRefs[queryFilterProperties];

    // Query specified database
    let res: ResponseObject = {status: "Incomplete"};
    try {
        let restCallResults = await notion.databases.query(queryObject);
        res.status = "Success";
        res.rest_body = restCallResults.results;
    } catch (error: any) {
        res = errorObj("Database query failed.", error.code, error.body);
    } finally {
        console.log(res);
        return res;
    }
};

/**
 * getPageContent:          retrieves the page content for a specified page.
 * 
 * @param {string} notionPageID     Page ID of notion page.
 * @returns {ResponseObject}        Response of REST w/ other details.
 */
export const getPageContent = async (
    notionPageID: string
) => {
    // Get page content, simpler type of request
    let res: ResponseObject = {status: "Incomplete"};
    try {
        let restCallResults = await notion.blocks.children.list({block_id: notionPageID});
        res.status = "Success";
        res.rest_body = restCallResults.results;
    } catch (error: any) {
        res = errorObj("Page content query failed.", error.code, error.body);
    } finally {
        console.log(res);
        return res;
    }
};