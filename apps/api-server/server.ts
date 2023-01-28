import { initTRPC } from '@trpc/server'
import * as z from 'zod'
import * as trpcExpress from '@trpc/server/adapters/express'

import express from 'express'
import { Prisma, PrismaClient } from '@prisma/client'
import cors from 'cors'

import {
    createComment,
    createPost,
    getPostComments,
    getPostDetail,
    getPosts,
} from './posts'
const prisma = new PrismaClient()
const t = initTRPC.create()
const appRouter = t.router({
    hello: t.procedure.input(z.string().nullish()).query((req) => {
        return `hello ${req.input ?? 'world'}`
    }),
    postDetail: t.procedure
        .input(z.number())
        .query(({ input }) => getPostDetail(input)),
    postComments: t.procedure.input(z.number()).query(async ({ input }) => {
        return await getPostComments(input)
    }),

    infinitePosts: t.procedure
        .input(
            z.object({
                limit: z.number().min(1).max(100).nullish(),
                cursor: z.number().nullish(), // <-- "cursor" needs to exist, but can be any type
            })
        )
        .query(async ({ input }) => {
            const limit = input.limit ?? 50
            const { cursor } = input
            const items = await prisma.post.findMany({
                take: limit + 1,
                orderBy: [{ id: 'asc' }],
                cursor: cursor ? { id: cursor } : undefined,
            })

            let nextCursor: typeof cursor | undefined = undefined
            if (items.length > limit) {
                const nextItem = items.pop()
                nextCursor = nextItem!.id
            }
            return {
                items,
                nextCursor,
            }
        }),

    createPost: t.procedure
        .input(
            z.object({
                title: z.string(),
                username: z.string(),
                text: z.string(),
            })
        )
        .mutation(({ input }) => {
            const newPost = {
                title: input.title,
                text: input.text,
                createdAt: new Date(),
                updatedAt: new Date(),
                username: input.username,
            }
            return createPost(newPost)
        }),

    createComment: t.procedure
        .input(
            z.object({
                text: z.string(),
                postId: z.number(),
            })
        )
        .mutation(async ({ input }) => {
            return await createComment({
                username: 'anonymous',
                text: input.text,
                postId: input.postId,
            })
        }),
})

export type AppRouter = typeof appRouter

async function server() {
    // express implementation
    const app = express()
    app.use(cors())
    app.use((req, _res, next) => {
        // request logger
        console.log('⬅️ ', req.method, req.path, req.body ?? req.query)

        next()
    })

    app.use(
        '/trpc',
        trpcExpress.createExpressMiddleware({
            router: appRouter,
        })
    )
    app.get('/', (_req, res) => res.send('hello'))
    app.listen(2021, () => {
        console.log('listening on port 2021')
    })
}

server()
