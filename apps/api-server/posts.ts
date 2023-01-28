import { Prisma, PrismaClient } from '@prisma/client'
import cors from 'cors'
const prisma = new PrismaClient()

type PostPayload = Omit<Prisma.PostGetPayload<{}>, 'id'>
type CommentPayload = Omit<Prisma.CommentGetPayload<{}>, 'id'>

export const createPost = async (post: PostPayload) => {
    await prisma.post.create({ data: post })
}
export const createComment = async (comment: CommentPayload) => {
    await prisma.comment.create({ data: comment })
}

export const getPosts = async ({
    limit,
    cursor,
}: {
    limit: number
    cursor: any
}) => {
    return await prisma.post.findMany({
        take: limit + 1,
        orderBy: [{ id: 'asc' }],
        cursor: cursor ? { id: cursor } : undefined,
    })
}

export const getPostDetail = async (postId: number) => {
    return await prisma.post.findUnique({
        where: {
            id: +postId,
        },
    })
}

export const getPostComments = async (postId: number) => {
    return await prisma.comment.findMany({
        where: {
            postId: postId,
        },
    })
}
