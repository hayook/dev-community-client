import { useState, useRef } from 'react'
import Model from '../../components/model/Model'
import { editPost } from '../../../app/api';
import { usePostContext } from './Post';
import { useMutation, useQueryClient } from 'react-query'
import Spinner from '../../components/spinner/Spinner'
import { fullSpaces } from '../../../lib/string';

export default function EditPostModel() {

    const editPostFieldRef = useRef(null);

    const { closeEditPostModel, body, postId, postOwnerId: userId } = usePostContext();
    const [newBody, setNewBody] = useState(body)

    const handleCursor = ({ target }) => target.selectionStart = target.value.length

    const queryClient = useQueryClient()
    const { isLoading, mutate } = useMutation(editPost);

    const saveChanges = () => {

        editPostFieldRef.current.classList.remove('error-field');

        if (fullSpaces(newBody)) {
            editPostFieldRef.current.focus();
            editPostFieldRef.current.classList.add('error-field');
            return;
        }

        const newPost = { post_body: newBody, post_type: 'post' }
        mutate({ newPost, postId }, {
            onSuccess: () => {
                queryClient.invalidateQueries(['get-posts'])
                queryClient.invalidateQueries([`get-user-${userId}-posts`])
                closeEditPostModel();
            },
        })
    }

    const cancelChanges = () => {
        closeEditPostModel();
    }

    return (
        <Model closeModel={cancelChanges}>
            {
                isLoading ? <Spinner dim='30px' /> :
                    <>
                        <div className="model-heading">
                            <h2>Edit post</h2>
                        </div>
                        <div className="model-container">
                            <textarea
                                ref={editPostFieldRef}
                                onFocus={handleCursor}
                                autoFocus
                                rows={4}
                                className="main-textarea"
                                placeholder='Write Something'
                                value={newBody}
                                onChange={({ target }) => setNewBody(target.value)}
                            ></textarea>
                        </div>
                        <div className="model-functionalities">
                            <button onClick={cancelChanges} className='main-button cancel-button'>Cancel</button>
                            <button onClick={saveChanges} className='main-button'>Save</button>
                        </div>
                    </>
            }
        </Model>
    )
}