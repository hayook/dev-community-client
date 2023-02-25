import Model from '../../components/model/Model';
import { usePostContext } from './Post'
import { useMutation, useQueryClient } from 'react-query';
import { deletePost } from '../../../app/api'
import Spinner from '../../components/spinner/Spinner';
import DeleteModel from '../../components/delete-model/DeleteModel';

export default function DeletePostModel() {

    const { closeDeletePostModel, postId, postOwnerId:userId } = usePostContext();

    const queryClient = useQueryClient(); 
    const { mutate, isLoading:isDeleting } = useMutation(deletePost)
    const handleDeletePost = () => {
        mutate(postId, {
            onSuccess: () => {
                queryClient.invalidateQueries('get-posts');
                queryClient.invalidateQueries([`get-user-${userId}-posts`])
                closeDeletePostModel();
            },
            onError: (err) => console.log('error ' + err)
        })
    }

    
    return <DeleteModel
        type='post'
        cancelDelete={closeDeletePostModel}
        submitDelete={handleDeletePost}
        isDeleting={isDeleting}
    />
}