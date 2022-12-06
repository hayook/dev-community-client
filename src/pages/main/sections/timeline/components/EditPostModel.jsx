import Model from '../../../../../components/model/Model'
import { usePostContext } from './Post';

export default function EditPostModel() {

    const { closeEditPostModel, body } = usePostContext();

    const handleCursor = ({ target }) => target.selectionStart = target.value.length

const saveChanges = () => {
    closeEditPostModel();
}

const cancelChanges = () => {
    closeEditPostModel();
}

return (
    <Model closeModel={cancelChanges} modelHeading='Edit Post' >
        <div className="model-container">
            <textarea
                onFocus={handleCursor}
                autoFocus
                rows={4}
                className="main-textarea"
                placeholder='Write Something'
                defaultValue={body}
                //onChange={({ target }) => setTempBody(target.value)}
            ></textarea>
        </div>
        <div className="model-functionalities">
            <button onClick={cancelChanges} className='main-button cancel-button'>Cancel</button>
            <button onClick={saveChanges} className='main-button'>Save</button>
        </div>
    </Model>
)
}