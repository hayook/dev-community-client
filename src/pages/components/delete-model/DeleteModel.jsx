import Model from '../model/Model';
import Spinner from '../spinner/Spinner';

export default function DeleteModel({ type, cancelDelete, submitDelete, isDeleting }) {


    return (
        <Model closeModel={cancelDelete}>
            {
                !isDeleting ?
                    <>
                        <div className="model-heading">
                            <h2>Delete {type}</h2>
                        </div>
                        <div className="model-container">
                            <p>Are you sure you want to delete this {type}</p>
                        </div>
                        <div className="model-functionalities">
                            <button onClick={cancelDelete} className='main-button cancel-button'>Cancel</button>
                            <button onClick={submitDelete} className='main-button'>Delete</button>
                        </div>
                    </>
                    : 
                    <Spinner dim='30px'/>
            }
        </Model>
    )
}