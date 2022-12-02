import { useState, useRef, useEffect } from 'react'
import { BiSend } from 'react-icons/bi';
import { BsThreeDotsVertical, BsPencil } from 'react-icons/bs';
import { BiTrashAlt } from 'react-icons/bi';
import SvgIcon from '../../../../../assets/icons/SvgIcon'
import { icons } from '../../../../../assets/icons/icons'
import { useGlobalState } from '../../../../../app/GlobalStateProvider';
import '../../../../../components/user-profile-showcase/style.css'

// refactore the main style.css file and this file
// The comment structure is the same as the post so make a post component and call it recursively

export default function Post({ postOwnerId, postId, title, body, date }) {

    const [comment, setComment] = useState('');
    const [showComments, setShowComments] = useState(false);
    const [liked, setLiked] = useState(false);
    const [funcs, setFuncs] = useState(false);
    const { state } = useGlobalState();
    const { userId } = state.user;

    const buttonRef = useRef(null);
    const modelRef = useRef(null);

    const openFuncs = () => {
        setFuncs(!funcs);
    }

    function FuncsModel() {

        const editPost = () => console.log('Edit post of user ' + postOwnerId)
        const removePost = () => console.log('Remove post of user ' + postOwnerId)

        useEffect(() => {
            const listener = ({ target }) => {
                const control = target !== buttonRef.current && !buttonRef.current.contains(target) && modelRef.current !== target //&& !modelRef.current.contains(target)
                if (control) setFuncs(false)
            }
            document.body.addEventListener('click', listener);

            return () => document.body.removeEventListener('click', listener)
        }, []);
        return (
            <div ref={modelRef} className="funcs-model">
                <ul>
                    <li><button onClick={editPost}><BsPencil /> Edit Post</button></li>
                    <li><button onClick={removePost}><BiTrashAlt />Remove Post</button></li>
                </ul>
            </div>
        )
    }

    const commentOnPost = (e) => {
        e?.preventDefault();
        console.log({ postOwnerId, postId, commentBody: comment, userId });
        setComment('');
    }

    const likePost = () => {
        setLiked(prev => !prev);
        console.log({ postId, postOwnerId, currentUserId: 5173 });
    }

    return (
        <div className="post">
            <div className="post-info">
                <div className="profile-img"></div>
                <div className="post-main">
                    <button ref={buttonRef} onClick={openFuncs} className="post-funcs">
                        <BsThreeDotsVertical />
                    </button>
                    {funcs && <FuncsModel />}
                    <span>user#{postOwnerId}</span>
                    <span className="date">21h</span>
                    <p className="post-content">{`${title}\n${body}`}</p>
                </div>
            </div>

            <div className="functionalities">
                <button className="like-post" onClick={likePost}>
                    <SvgIcon path={icons.like} fill={liked && 'white'} />
                    <span>40k</span>
                </button>
                <button className="comment-on-post" onClick={() => setShowComments(prev => !prev)}>
                    <SvgIcon path={icons.comment} />
                    <span>7.2k</span>
                </button>
            </div>
            {
                showComments &&
                <>
                    <div className="post-comments">
                        <h3>Comments</h3>
                        <div className="post-info comment">
                            <div className="profile-img"></div>
                            <div className="post-main">
                                <span>user#{postOwnerId}</span>
                                <span className="date">21h</span>
                                <p className="post-content">This is an aweawe comment</p>
                                <button>
                                    <SvgIcon path={icons.like} fill={liked && 'white'} />
                                    <span>244</span>
                                </button>
                            </div>
                        </div>
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
                </>
            }
        </div>
    )
}