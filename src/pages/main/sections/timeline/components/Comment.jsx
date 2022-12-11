import { useRef, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { likeComment } from '../../../../../app/api'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { icons } from '../../../../../assets/icons/icons'
import SvgIcon from '../../../../../assets/icons/SvgIcon'
import { useGlobalState } from '../../../../../app/GlobalStateProvider';
import FuncsModel from './FuncsModel';
import { usePostContext } from './Post';
import DeleteCommentModel from './DeleteCommentModel';
import EditCommentModel from './EditCommentModel';

export default function Comment({ commentOwnerId, commentId, commentBody, liked, commentOwnerUsername, commentDate, nbrLikes }) {

    const { postId } = usePostContext()
    const { state } = useGlobalState()
    const funcsButtonRef = useRef()
    const [funcs, setFuncs] = useState(false);
    const [deleteCommentModel, setDeleteCommentModel] = useState(false);
    const [editCommentModel, setEditCommentModel] = useState(false)
    const [likedComment, setLikedComment] = useState(liked);
    const [commentNbrLikes, setCommentNbrLikes] = useState(nbrLikes); // i can avoid these states by update the query cache

    const closeDeleteCommentModel = () => setDeleteCommentModel(false);
    const openDeleteCommentModel = () => setDeleteCommentModel(true);
    const openEditCommentModel = () => setEditCommentModel(true)
    const closeEditCommentModel = () => setEditCommentModel(false)

    const openFuncs = () => setFuncs(!funcs);

    const queryClient = useQueryClient()
    const { mutate } = useMutation(likeComment)
    const handleLikeComment = () => {
        setLikedComment(!likedComment);
        setCommentNbrLikes(prev => likedComment ? prev - 1 : prev + 1);
        mutate({ commentId, postId }, {
            onSuccess: () => {
                queryClient.invalidateQueries([`get-post-${postId}-comments`]);
            },
            onError: (err) => console.log('error ' + err)
        })
    }

    return (
        <>
        {deleteCommentModel && <DeleteCommentModel closeDeleteCommentModel={closeDeleteCommentModel} commentId={commentId} />}
        {editCommentModel && <EditCommentModel closeEditCommentModel={closeEditCommentModel} commentId={commentId} commentBody={commentBody} />}

        <div className="post-info comment">
            <div className="profile-img"></div>
            <div className="post-main">
                <span>{commentOwnerUsername}</span>
                <span className="date">{commentDate}</span>
                <p className="post-content">{commentBody}</p>
                <button className='like-comment' onClick={handleLikeComment}>
                    <SvgIcon path={icons.like} fill={likedComment && 'white'} />
                    <span>{commentNbrLikes}</span>
                </button>
                {state.user.user_id === commentOwnerId &&
                    <button ref={funcsButtonRef} onClick={openFuncs} className="post-funcs" style={{ display: funcs && 'block' }}>
                        <BsThreeDotsVertical />
                    </button>
                }
                {funcs && <FuncsModel type='Comment' openEditModel={openEditCommentModel} openDeleteModel={openDeleteCommentModel} setFuncs={setFuncs} funcsButtonRef={funcsButtonRef} />}
            </div>
        </div>
        </>
    )
}