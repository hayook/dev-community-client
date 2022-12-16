import { useState } from 'react'
import Model from '../../components/model/Model'
import { editPost } from '../../../app/api';
import { usePostContext } from './Post';
import { useMutation, useQueryClient } from 'react-query'
import Spinner from '../../components/spinner/Spinner'

export default function EditPostModel() {

    const { closeEditPostModel, body, postId } = usePostContext();
    const [newBody, setNewBody] = useState(body)

    const handleCursor = ({ target }) => target.selectionStart = target.value.length

    const queryClient = useQueryClient()
    const { isLoading, mutate } = useMutation(editPost);

    const saveChanges = () => {
        
        const newPost = { post_body: newBody, post_type: 'post' }
        mutate({ newPost, postId }, {
            onSuccess: () => {
                queryClient.invalidateQueries(['get-posts'])
                closeEditPostModel();
            },
            onError: (err) => console.log('error ' + err),
        })
    }

    const cancelChanges = () => {
        closeEditPostModel();
    }

    return (
        <Model closeModel={cancelChanges} modelHeading='Edit Post' >
            {
                isLoading ? <Spinner dim='30px'/> :
                    <>
                        <div className="model-container">
                            <textarea
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