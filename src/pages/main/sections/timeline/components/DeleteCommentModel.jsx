import Model from '../../../../../components/model/Model';
import { useMutation, useQueryClient } from 'react-query';
import { deleteComment } from '../../../../../app/api'
import Spinner from '../../../../../components/spinner/Spinner';
import { usePostContext } from './Post';

export default function DeleteCommentModel({ commentId, closeDeleteCommentModel }) {

    const { postId } = usePostContext()


    const queryClient = useQueryClient(); 
    const { mutate, isLoading:isDeleting } = useMutation(deleteComment)
    const handleDeleteComment = () => {
        mutate({ commentId, postId }, {
            onSuccess: () => {
                queryClient.invalidateQueries([`get-post-${postId}-comments`]);
                closeDeleteCommentModel();
            },
            onError: (err) => console.log('error ' + err)
        })
    }

    return (
        <Model closeModel={closeDeleteCommentModel} modelHeading='Delete Comment'>
            {
                !isDeleting ?
                    <>
                        <div className="model-container">
                            <p>Are you sure you want to delete this comment</p>
                        </div>
                        <div className="model-functionalities">
                            <button onClick={() => closeDeleteCommentModel()} className='main-button cancel-button'>Cancel</button>
                            <button onClick={handleDeleteComment} className='main-button'>Delete</button>
                        </div>
                    </>
                    : 
                    <Spinner dim='30px'/>
            }
        </Model>
    )
}