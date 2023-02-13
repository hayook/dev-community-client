import Model from '../../components/model/Model';
import { usePostContext } from './Post'
import { useMutation, useQueryClient } from 'react-query';
import { deletePost } from '../../../app/api'
import Spinner from '../../components/spinner/Spinner';

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

    return (
        <Model closeModel={closeDeletePostModel} modelHeading='Delete Post'>
            {
                !isDeleting ?
                    <>
                        <div className="model-container">
                            <p>Are you sure you want to delete this post</p>
                        </div>
                        <div className="model-functionalities">
                            <button onClick={() => closeDeletePostModel()} className='main-button cancel-button'>Cancel</button>
                            <button onClick={handleDeletePost} className='main-button'>Delete</button>
                        </div>
                    </>
                    : 
                    <Spinner dim='30px'/>
            }
        </Model>
    )
}