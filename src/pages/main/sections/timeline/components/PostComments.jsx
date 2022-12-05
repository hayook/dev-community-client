import { useState } from 'react'
import { useQuery } from 'react-query';
import { getPostComments } from '../../../../../app/api';
import { BiSend } from 'react-icons/bi';
import Spinner from '../../../../../components/spinner/Spinner'
import Comment from './Comment'

function CommentsSet({ postId }) {

    const response = useQuery([`get-post-${postId}-comments`], getPostComments(postId));

    if (response.isLoading) return <Spinner dim='20px' />
    if (response.error) return <h3>Error</h3>
    return (
        Object.keys(response.data).length !== 0 && 
        response.data.map(comment => <Comment body={comment.body} key={comment.id} />)
    )
}

export default function PostComments({ postId }) {

    const [comment, setComment] = useState('');

    const commentOnPost = (e) => {
        e?.preventDefault();
        setComment('');
    }

    return (
        <div className="post-comments">
            <h3>Comments</h3>

            <CommentsSet postId={postId} />

            <form className="comment">
                <textarea
                    className="main-textarea"
                    rows={1}
                    placeholder='Write A Comment'
                    value={comment}
                    onChange={({ target }) => setComment(target.value)}
                ></textarea>
                <button className="submit-comment" onClick={commentOnPost}><BiSend /></button>
            </form>
        </div>
    )
}
