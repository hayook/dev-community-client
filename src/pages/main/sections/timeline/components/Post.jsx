import { useState } from 'react'
import UserProfileShowcase from "../../../../../components/user-profile-showcase/UserProfileShowcase"

export default function Post({ userId, postId, title, body }) {

    const [comment, setComment] = useState('');

    const likePost = () => {
        console.log(`You Liked the post of id ${postId} of the user with the id ${userId}`);
        console.log('Reqest Body : ', {postId, userId, currentUserId: 5173})
    }

    const commentOnPost = (e) => {
        e.preventDefault();
        console.log(`You Wrota the comment "${comment}" on the post of the id ${postId} of the user with the id ${userId}`);
        console.log('Request Body : ', {userId, postId, commentBody: comment, currentUserId: 5173});
    }

    return (
        <div className="post">
            <UserProfileShowcase userId={userId} />
            <p className="post-content">{`${title}\n${body}`}</p>
            <div className="functionalities">
                <button onClick={likePost}>Like</button>
                <button>Comment</button>
            </div>
            <form className="comment">
                <textarea
                    className="main-textarea"
                    rows={1}
                    placeholder='Write A Comment'
                    value={comment}
                    onChange={({ target }) => setComment(target.value)}
                ></textarea>
                <button className="submit-comment" onClick={commentOnPost}>></button>
            </form>
        </div>
    )
}