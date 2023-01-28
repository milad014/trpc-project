import { Link } from 'react-router-dom'
import { Post } from '~/types/Posts'

const PostCard = ({ post }: Post) => {
    return (
        <div className="card p-5  bg-base-100 shadow-xl">
            <figure>
                <img
                    src="https://cloudfour.com/wp-content/uploads/2020/01/default.svg"
                    alt={post.title}
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{post.title}</h2>
                <p>{post.text}</p>
                <div className="card-actions justify-end">
                    <Link to={`/post/${post.id}`}>
                        <button className="btn btn-primary">Show More</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default PostCard
