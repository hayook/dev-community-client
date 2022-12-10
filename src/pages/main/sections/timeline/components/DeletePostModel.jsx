import { useState } from 'react';
import Model from '../../../../../components/model/Model';
import { usePostContext } from './Post'
// import { DELETEPost } from '../../../../../app/api';
import Spinner from '../../../../../components/spinner/Spinner';
import { useGlobalState } from '../../../../../app/GlobalStateProvider' 
import { ACTIONS } from '../../../../../app/actions';

export default function DeletePostModel() {

    const { closeDeletePostModel, postId } = usePostContext();
    const { dispatch } = useGlobalState();

    const [ isDeleting, setIsDeleting ] = useState(false);

    const deletePost = async () => {
        setIsDeleting(true);
        const response = await DELETEPost(postId);
        if (response.status === 200) {
            dispatch({ type: ACTIONS.EMPTY_POSTS});
            setIsDeleting(false); 
            closeDeletePostModel();
        }
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
                            <button onClick={deletePost} className='main-button'>Delete</button>
                        </div>
                    </>
                    : 
                    <Spinner dim='30px'/>
            }
        </Model>
    )
}