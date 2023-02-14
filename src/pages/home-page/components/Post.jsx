import { useState, useRef, useContext, createContext } from 'react'
import { Link } from 'react-router-dom'
import { useQueryClient, useMutation } from 'react-query'; 
import { BsThreeDotsVertical } from 'react-icons/bs';
import SvgIcon from '../../../assets/icons/SvgIcon'
import { icons } from '../../../assets/icons/icons'
import '../../components/user-profile-showcase/style.css'
import PostComments from './PostComments';
import DeletePostModel from './DeletePostModel'
import EditPostModel from './EditPostModel';
import FuncsModel from './FuncsModel'
import { likePost } from '../../../app/api'; 
import { subStr } from '../../../utiles/string-utiles'
import ProfileImg from '../../components/profile-img/ProfileImg'
import useCurrentUserData from '../../../hooks/useCurrentUserData';

const PostContext = createContext();
export const usePostContext = () => useContext(PostContext);

export default function Post({ postOwnerId, profileImg, postOwnerUsername, postDate, postId, body, nbrLikes, nbrComments, liked }) {

    const { currentUserId } = useCurrentUserData()

    const [funcs, setFuncs] = useState(false);
    const [editPost, setEditPost] = useState(false);
    const [deletePost, setDeletePost] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [likedPost, setLikedPost] = useState(liked);
    const [postNbrLikes, setPostNbrLikes] = useState(nbrLikes);
    const [postNbrComments, setPostNbrComments] = useState(nbrComments)
    const [fullPostContent, setFullPostContent] = useState(body.length <= 300);

    const openEditPostModel = () => setEditPost(true);
    const openDeletePostModel = () => setDeletePost(true);
    const closeEditPostModel = () => setEditPost(false);
    const closeDeletePostModel = () => setDeletePost(false);

    const funcsButtonRef = useRef(null);

    const openFuncs = () => setFuncs(!funcs);

    const queryClient = useQueryClient()
    const { isLoading, mutate } = useMutation(likePost)
    const handleLikePost = () => {
        setLikedPost(!likedPost); 
        setPostNbrLikes(prev => likedPost ? prev - 1 : prev + 1);
        mutate(postId, {
            onSuccess: (res) => {
                queryClient.invalidateQueries(['get-posts']);
            }, 
            onError: (err) => console.log('error ' + err)
        })
    }

    const handlePostComments = () => setShowComments(prev => !prev);

    const value = {
        postOwnerId,
        postId,
        body,
        nbrLikes,
        setFuncs,
        closeEditPostModel,
        openEditPostModel,
        closeDeletePostModel,
        openDeletePostModel,
        funcsButtonRef,
        setPostNbrComments,

    }


    return (
        <div className="post">
            <PostContext.Provider value={value}>

                {editPost && <EditPostModel />}
                {deletePost && <DeletePostModel />}

                <div className="post-info">
                    <Link to={`/user/${postOwnerId}`}><ProfileImg url={profileImg} /></Link>
                    <div className="post-main">
                    <Link to={`/user/${postOwnerId}`}><span>{ postOwnerUsername }</span></Link>
                        <span className="date">{ postDate }</span>
                        <p className="post-content">
                        { fullPostContent ? body : subStr(body, 300) }
                        { !fullPostContent && <span onClick={() => setFullPostContent(true)} className='read-more'>...Read More</span>}
                        </p>
                        {currentUserId === postOwnerId &&
                            <button ref={funcsButtonRef} onClick={openFuncs} className="post-funcs" style={{ display: funcs && 'block' }}>
                                <BsThreeDotsVertical />
                            </button>
                        }
                        {funcs &&
                            <FuncsModel 
                            type={'Post'} 
                            setFuncs={setFuncs}
                            openEditModel={openEditPostModel}
                            openDeleteModel={openDeletePostModel}
                            funcsButtonRef={funcsButtonRef}
                            />
                        }
                    </div>
                </div>

                <div className="functionalities">
                    <button className="like-post" onClick={handleLikePost}>
                        <SvgIcon path={icons.like} fill={likedPost && 'white'} />
                        <span>{ postNbrLikes }</span>
                    </button>
                    <button className="comment-on-post" onClick={handlePostComments}>
                        <SvgIcon path={icons.comment} />
                        <span>{ postNbrComments }</span>
                    </button>
                </div>

                {showComments && <PostComments />}

            </PostContext.Provider>
        </div>
    )
}