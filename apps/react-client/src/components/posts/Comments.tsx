import { trpc } from '../../utils/trpc'

export default function Comments(props: { postId: number }) {
    const { data } = trpc.postComments.useQuery(props.postId)

    const CommentsList = data
        ? data.map((comment) => {
              return (
                  <div
                      className="flex justify-between border gap-5 p-5"
                      key={comment.id}
                  >
                      <div>{comment.text}</div>
                      <div>{comment.username}</div>
                  </div>
              )
          })
        : null

    if (data && !data.length)
        return <div className="py-6"> you have 0 comments </div>
    return (
        <div className="grid">
            <div className="py-5">Comments List</div>
            {CommentsList}
        </div>
    )
}
