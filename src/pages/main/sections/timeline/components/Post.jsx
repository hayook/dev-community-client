import { useState, useRef, useEffect } from 'react'
import { BiSend } from 'react-icons/bi';
import UserProfileShowcase from "../../../../../components/user-profile-showcase/UserProfileShowcase"
import SvgIcon from '../../../../../assets/icons/SvgIcon'
import { icons } from '../../../../../assets/icons/icons'

export default function Post({ postOwnerId, postId, title, body }) {

    const [comment, setComment] = useState('');
    const [showComments, setShowComments] = useState(false);
    const [liked, setLiked] = useState(false);

    const commentOnPost = (e) => {
        e?.preventDefault();
        console.log({ postOwnerId, postId, commentBody: comment, currentUserId: 5173 });
        setComment('');
    }

    const likePost = () => {
        setLiked(prev => !prev);
        console.log({ postId, postOwnerId, currentUserId: 5173 });
    }

    return (
        <div className="post">
            <UserProfileShowcase userId={postOwnerId} />
            <p className="post-content">{`${title}\n${body}`}</p>
            <div className="functionalities">
                <button onClick={likePost}><SvgIcon path={icons.like} fill={liked && 'white'} /></button>
                <button onClick={() => setShowComments(prev => !prev)}><SvgIcon path={icons.comment} /></button>
            </div>
            {
                showComments &&
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
            }
        </div>
    )
}