import { useQuery } from '@tanstack/react-query'
import { trpc } from '../utils/trpc'
import type { Post } from '../types/Posts'
import { useParams } from 'react-router'
import Comments from '../components/posts/Comments'
import CreateComment from '../components/posts/CreateComment'

export default function PostList() {
    let { id } = useParams()
    const { data } = trpc.postDetail.useQuery(Number(id))

    return (
        <>
            {data ? (
                <>
                    <div className="hero min-h-60 bg-base-200">
                        <div className="hero-content flex-col lg:flex-row-reverse">
                            <div>
                                <h1 className="text-5xl font-bold">
                                    {data?.title}
                                </h1>
                                <p className="py-6">{data?.text}</p>

                                <div>Created Time {data?.createdAt}</div>
                            </div>
                        </div>
                    </div>
                    <CreateComment postId={data?.id} />
                    <Comments postId={data?.id} />
                </>
            ) : null}
        </>
    )
}
