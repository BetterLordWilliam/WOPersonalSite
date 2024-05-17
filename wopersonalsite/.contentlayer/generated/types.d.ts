// NOTE This file is auto-generated by Contentlayer

import type { Markdown, MDX, ImageFieldData, IsoDateTimeString } from 'contentlayer/core'
import * as Local from 'contentlayer/source-files'

export { isType } from 'contentlayer/client'

export type { Markdown, MDX, ImageFieldData, IsoDateTimeString }

/** Document types */
export type Portfolio = {
  /** File path relative to `contentDirPath` */
  _id: string
  _raw: Local.RawDocumentData
  type: 'Portfolio'
  title: string
  startDate: IsoDateTimeString
  endDate: IsoDateTimeString
  slug: string
  notionId?: string | undefined
  tags: string[]
  enabled?: boolean | undefined
  repo?: string | undefined
  try?: string | undefined
  image: Image
  /** Markdown file body */
  body: Markdown

}  

/** Nested types */
export type Image = {
  /** File path relative to `contentDirPath` */
  _id: string
  _raw: Local.RawDocumentData
  type: 'Image'
  src: string
  width: number
  height: number

}  

/** Helper types */

export type AllTypes = DocumentTypes | NestedTypes
export type AllTypeNames = DocumentTypeNames | NestedTypeNames

export type DocumentTypes = Portfolio
export type DocumentTypeNames = 'Portfolio'

export type NestedTypes = Image
export type NestedTypeNames = 'Image'

export type DataExports = {
  allDocuments: DocumentTypes[]
  allPortfolios: Portfolio[]
}


export interface ContentlayerGenTypes {
  documentTypes: DocumentTypes
  documentTypeMap: DocumentTypeMap
  documentTypeNames: DocumentTypeNames
  nestedTypes: NestedTypes
  nestedTypeMap: NestedTypeMap
  nestedTypeNames: NestedTypeNames
  allTypeNames: AllTypeNames
  dataExports: DataExports
}

declare global {
  interface ContentlayerGen extends ContentlayerGenTypes {}
}

export type DocumentTypeMap = {
  Portfolio: Portfolio
}

export type NestedTypeMap = {
  Image: Image
}

 