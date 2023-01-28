import './App.css'
import { useState } from 'react'
import { httpBatchLink } from '@trpc/client/links/httpBatchLink'
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
} from '@tanstack/react-query'
import PostList from './containers/PostList'
import CreatePost from './containers/CreatePost'
import ShowPost from './containers/ShowPost'
import { trpc } from './utils/trpc'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/common/Layout'

const url = import.meta.env.VITE_TRPC_URL

function App() {
    const queryClient = new QueryClient()
    const [trpcClient] = useState(() =>
        trpc.createClient({
            links: [
                httpBatchLink({
                    url,
                }),
            ],
        })
    )
    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                <Layout>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<PostList />} />
                            <Route path="/create" element={<CreatePost />} />
                            <Route path="/post/:id" element={<ShowPost />} />
                            {/* <Route path="*" element={<NoPage />} /> */}
                        </Routes>
                    </BrowserRouter>
                </Layout>
            </QueryClientProvider>
        </trpc.Provider>
    )
}

export default App
