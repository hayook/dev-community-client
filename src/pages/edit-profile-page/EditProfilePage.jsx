import { useRef, useState } from "react";
import Main from "../components/main/Main";
import NavSideBar from "../components/nav-side-bar/NavSideBar"
import ProfileImg from "../components/profile-img/ProfileImg";
import UploadImageModel from './components/UploadImageModel'
import './style.css'

export default function EditProfilePage() {

    const imageRef = useRef(null)
    const previewImg = useRef(null)

    const [imageUploaded, setImageUploaded] = useState(null)
    const closeUploadModel = () => {
        setImageUploaded(null)
        imageRef.current.value = ''

    }

    const handleChangeImage = e => {
        e.preventDefault()
        imageRef.current.click()
    }

    const previewImage = e => {
        const image = e.target.files[0];
        const imageUrl = URL.createObjectURL(image)
        setImageUploaded(imageUrl)
    }

    return (
        <Main>
            <NavSideBar />
            <section className='edit-profile-page'>
                {!!imageUploaded &&
                    <UploadImageModel
                        imgUrl={imageUploaded}
                        cancelUpload={closeUploadModel}
                    />
                }
                <form className="edit-profile-form">
                    <h1>Profile Image</h1>
                    <div className="edit-profile-image">
                        <ProfileImg />
                        <p>Username</p>
                        <button onClick={handleChangeImage}>Change Profile Image</button>
                        <input type="file" ref={imageRef} style={{ display: 'none' }} onChange={previewImage} />
                    </div>

                    <h1>Basic Info</h1>
                    <div className="edit-basic-info">
                        <label>Name</label>
                        <input type="text" className="main-input" />
                        <label>Username</label>
                        <input type="text" className="main-input" />
                        <label>Email</label>
                        <input type="email" className="main-input" />
                        <label>About</label>
                        <textarea rows={5} className="main-textarea" />
                    </div>
                    <h1>Password</h1>
                    <div className="edit-password">
                        <label>Your Password</label>
                        <input type="password" className="main-input" />
                        <label>New Password</label>
                        <input type="password" className="main-input" />
                        <label>Confirm Password</label>
                        <input type="password" className="main-input" />
                    </div>

                    <button className="main-button">Save</button>
                </form>
            </section>
        </Main>
    )
}