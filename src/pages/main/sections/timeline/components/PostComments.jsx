import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query';
// import { getPostComments } from '../../../../../app/api';
import { BiSend } from 'react-icons/bi';
import Spinner from '../../../../../components/spinner/Spinner'
import Comment from './Comment'
import { usePostContext } from './Post'
import { commentOnPost } from '../../../../../app/api';
import { handleDate } from '../../../../../utiles/handle-date.js';
import usePostComments from '../../../../../hooks/usePostComments';

function CommentsSet() {

    const { postId } = usePostContext();

    const { isLoading, data: response, error } = usePostComments(postId);
    
    if (isLoading) return <Spinner dim='25px' />
    if (error) return <h3>{ error.message }</h3>
    if (response.ok && response.data.length === 0) return <h3 className='no-comments'>No Comments</h3>
    return (
        response.data.map(comment => {
            const {
                comment_id:commentId,
                comment_owner_id:commentOwnerId,
                username:commentOwnerUsername,
                comment_body:commentBody,
                comment_date:commentDate,
                comment_number_likes:nbrLikes,
            } = comment;
            return <Comment key={commentId}
            commentOwnerUsername={commentOwnerUsername}
            commentOwnerId={commentOwnerId}
            commentId={commentId}
            commentBody={commentBody}
            commentDate={handleDate(commentDate)}
            nbrLikes={nbrLikes}
            liked={comment.liked === 'true'}
            />
        })
    )
}

export default function PostComments() {
    
    const [comment, setComment] = useState('');
    const { postId, setPostNbrComments } = usePostContext();
    
    const queryClient = useQueryClient();
    const { mutate, isLoading } = useMutation(commentOnPost);
    const hancleComment = (e) => {
        e.preventDefault();
        const body = { comment_body: comment };
        mutate({ body, postId }, {
            onSuccess: () => {
                setPostNbrComments(prev => prev + 1);
                queryClient.invalidateQueries([`get-post-${postId}-comments`]);
                setComment('');
            },
            onError: (err) => console.log('Error ' + err),
        });
    }

    return (
        <div className="post-comments">
            <h3>Comments</h3>

            <CommentsSet />

            <form onSubmit={hancleComment} className="comment">
                <textarea
                    className="main-textarea"
                    rows={1}
                    placeholder='Write A Comment'
                    value={comment}
                    onChange={({ target }) => setComment(target.value)}
                ></textarea>
                <button className="submit-comment">{isLoading ? <Spinner /> : <BiSend /> }</button>
            </form>
        </div>
    )
}
