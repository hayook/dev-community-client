import { useState } from 'react'
import Model from '../../components/model/Model'
import { editComment } from '../../../app/api';
import { usePostContext } from './Post';
import { useMutation, useQueryClient } from 'react-query'
import Spinner from '../../components/spinner/Spinner'

export default function EditCommentModel({ closeEditCommentModel, commentId, commentBody }) {

    const { postId } = usePostContext();
    const [newBody, setNewBody] = useState(commentBody)

    const handleCursor = ({ target }) => target.selectionStart = target.value.length

    const queryClient = useQueryClient()
    const { isLoading, mutate } = useMutation(editComment);

    const saveChanges = () => {
        mutate({ newBody, postId, commentId }, {
            onSuccess: () => {
                queryClient.invalidateQueries([`get-post-${postId}-comments`])
                closeEditCommentModel();
            },
            onError: (err) => console.log('error ' + err),
        })
    }

    const cancelChanges = () => {
        closeEditCommentModel();
    }

    return (
        <Model closeModel={cancelChanges}>
            {
                isLoading ? <Spinner dim='30px'/> :
                    <>
                        <div className="model-heading">
                            <h2>Edit comment</h2>
                        </div>
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