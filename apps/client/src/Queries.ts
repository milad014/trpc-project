import { createTRPCProxyClient } from '@trpc/client'
import { httpBatchLink } from '@trpc/client/links/httpBatchLink'
import type { AppRouter } from 'api-server/server'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
const url = import.meta.env.VITE_TRPC_URL

const client = createTRPCProxyClient<AppRouter>({
    links: [httpBatchLink({ url })],
})

export const useHello = (input: string) => {
    const { data, refetch } = useQuery(['hello'], async () =>
        client.hello.query(input)
    )
    return { data, refetch }
}

export const usePosts = () => {
    const { data, refetch } = useQuery(['posts'], async () =>
        client.posts.query()
    )
    return { data, refetch }
}
export const useCreatePost = () => {
    const { mutate } = useMutation(() =>
        client.createPost.mutate({ title: 'test', text: 'text' })
    )

    const createPost = (post: any) => {
        mutate(post)
    }
    // const { data, refetch } = useQuery(['createPost'], async () =>
    // client.createPost.query({ title: 'test', text: 'text' })
    // )
    return createPost
}
