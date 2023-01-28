export interface Post {
    title: string
    id: number
    text: string
    createdAt: Date
    updatedAt: Date
}

export interface Page {
    items: Post[]
    nextCursor: number | null | undefined
}

export interface InfinitePosts {
    pages: Page[]
}
