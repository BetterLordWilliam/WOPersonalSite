export interface Portfolio {
    endDate: Date,
    startDate: Date,
    pageId: string,
    slug: string,
    repo: string,
    try: string
    tags: string[],
    imageUrl: string,
    title: string
};

export interface Block {
    blockType: any
    blockContent: any
};