// contentlayer.config.ts
import { defineDocumentType, defineNestedType, makeSource } from "contentlayer/source-files";
var Image = defineNestedType(() => ({
  name: "Image",
  fields: {
    "src": { type: "string", required: true },
    "width": { type: "number", required: true },
    "height": { type: "number", required: true }
  }
}));
var Portfolio = defineDocumentType(() => ({
  name: "Portfolio",
  filePathPattern: "portfolio/*.md",
  fields: {
    title: { type: "string", required: true },
    startDate: { type: "date", required: true },
    endDate: { type: "date", required: true },
    slug: { type: "string", required: true },
    notionId: { type: "string", required: false },
    tags: { type: "list", of: { type: "string" }, required: true },
    enabled: { type: "boolean", required: false },
    repo: { type: "string", required: false },
    hostedLink: { type: "string", required: false },
    image: { type: "nested", of: Image, required: true }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "./content",
  documentTypes: [Portfolio]
});
export {
  Image,
  Portfolio,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-ILBUXXUM.mjs.map
