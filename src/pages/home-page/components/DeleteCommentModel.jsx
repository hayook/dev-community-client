import Model from '../../components/model/Model';
import { useMutation, useQueryClient } from 'react-query';
import { deleteComment } from '../../../app/api'
import Spinner from '../../components/spinner/Spinner';
import { usePostContext } from './Post';
import DeleteModel from '../../components/delete-model/DeleteModel';

export default function DeleteCommentModel({ commentId, closeDeleteCommentModel }) {

    const { postId, setPostNbrComments } = usePostContext()


    const queryClient = useQueryClient(); 
    const { mutate, isLoading:isDeleting } = useMutation(deleteComment)
    const handleDeleteComment = () => {
        mutate({ commentId, postId }, {
            onSuccess: () => {
                queryClient.invalidateQueries([`get-post-${postId}-comments`]);
                setPostNbrComments(prev => prev - 1);
                closeDeleteCommentModel();
            },
            onError: (err) => console.log('error ' + err)
        })
    }

    return (
        <DeleteModel 
            type='comment'
            cancelDelete={closeDeleteCommentModel}
            submitDelete={handleDeleteComment}
            isDeleting={isDeleting}
        />
    )
}