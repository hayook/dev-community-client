import { useState, useRef, useEffect, useContext, createContext } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs';
import SvgIcon from '../../../../../assets/icons/SvgIcon'
import { icons } from '../../../../../assets/icons/icons'
import '../../../../../components/user-profile-showcase/style.css'
import PostComments from './PostComments';
import DeletePostModel from './DeletePostModel'
import EditPostModel from './EditPostModel';
import FuncsModel from './FuncsModel'
import { useGlobalState } from '../../../../../app/GlobalStateProvider';

const PostContext = createContext();
export const usePostContext = () => useContext(PostContext);

export default function Post({ postOwnerId, postId, body, nbrLikes }) {

    const { state } = useGlobalState();

    const [funcs, setFuncs] = useState(false);
    const [editPost, setEditPost] = useState(false);
    const [deletePost, setDeletePost] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [liked, setLiked] = useState(false);

    const OpenEditPostModel = () => setEditPost(true);
    const OpenDeletePostModel = () => setDeletePost(true);
    const closeEditPostModel = () => setEditPost(false);
    const closeDeletePostModel = () => setDeletePost(false);

    const funcsButtonRef = useRef(null);

    const openFuncs = () => setFuncs(!funcs);

    const likePost = () => {
        setLiked(prev => !prev);
        console.log({ postId, postOwnerId, currentUserId: 5173 });
    }

    const handlePostComments = () => setShowComments(prev => !prev);

    const value = {
        postOwnerId,
        postId,
        body,
        nbrLikes,
        setFuncs,
        closeEditPostModel,
        OpenEditPostModel,
        closeDeletePostModel,
        OpenDeletePostModel,
        funcsButtonRef,

    }


    return (
        <div className="post">
            <PostContext.Provider value={value}>

                {editPost && <EditPostModel />}
                {deletePost && <DeletePostModel />}

                <div className="post-info">
                    <div className="profile-img"></div>
                    <div className="post-main">
                        {state.user.user_id === postOwnerId &&
                            <button ref={funcsButtonRef} onClick={openFuncs} className="post-funcs" style={{ display: funcs && 'block' }}>
                                <BsThreeDotsVertical />
                            </button>
                        }
                        {funcs && <FuncsModel />}
                        <span>user#{postOwnerId}</span>
                        <span className="date">21h</span>
                        <p className="post-content">{body}</p>
                    </div>
                </div>

                <div className="functionalities">
                    <button className="like-post" onClick={likePost}>
                        <SvgIcon path={icons.like} fill={liked && 'white'} />
                        <span>{nbrLikes}</span>
                    </button>
                    <button className="comment-on-post" onClick={handlePostComments}>
                        <SvgIcon path={icons.comment} />
                        <span>7.2k</span>
                    </button>
                </div>

                {showComments && <PostComments />}

            </PostContext.Provider>
        </div>
    )
}