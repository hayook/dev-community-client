import Model from '../../components/model/Model';
import ProfileImg from '../../components/profile-img/ProfileImg';
import Spinner from '../../components/spinner/Spinner';

export default function DeletePostModel({ imgUrl, cancelUpload, submitUpload, isUploading }) {


    return (
        <Model closeModel={cancelUpload} modelHeading='Upload Image' >
            {
                !isUploading ?
                    <>
                    <div className="model-container">
                            <ProfileImg url={imgUrl} dim='150px'/>
                        </div>
                        <div className="model-functionalities">
                            <button onClick={cancelUpload} className='main-button cancel-button'>Cancel</button>
                            <button onClick={submitUpload} className='main-button'>Upload</button>
                        </div>
                    </>
                    : 
                    <Spinner dim='30px'/>
            }
        </Model>
    )
}