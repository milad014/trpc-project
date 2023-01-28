import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'

import { trpc } from '../utils/trpc'

import type { Post } from '../types/Posts'

import PostCard from '../components/posts/PostCard'

export default function PostList() {
    const [lastElement, setLastElement] = useState(null)
    const { data, fetchNextPage } = trpc.infinitePosts.useInfiniteQuery(
        {
            limit: 25,
        },
        {
            getNextPageParam: (lastPage) => lastPage.nextCursor,
        }
    )

    const observer = useRef(
        new IntersectionObserver((entries) => {
            const first = entries[0]
            if (first.isIntersecting) {
                fetchNextPage()
            }
        })
    )
    useEffect(() => {
        const currentElement = lastElement
        const currentObserver = observer.current

        if (currentElement) {
            currentObserver.observe(currentElement)
        }

        return () => {
            if (currentElement) {
                currentObserver.unobserve(currentElement)
            }
        }
    }, [lastElement])

    const Pages = () => {
        if (data?.pages) {
            return data.pages.map((page) =>
                page.items.map((item: Post, i: number) => {
                    return <PostCard post={item} key={i} />
                })
            )
        } else {
            return <div> پستی یافت نشد</div>
        }
    }

    return (
        <div className="flex flex-col gap-2">
            <Link
                className="p-2 bg-red-500 w-40 !text-white rounded-lg  text-xl"
                to="/create"
            >
                Add New Post
            </Link>
            <div className="grid  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5    ">
                <Pages />
            </div>
            <div ref={setLastElement} />
        </div>
    )
}
