import { useRef, useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import Main from "../components/main/Main";
import NavSideBar from "../components/nav-side-bar/NavSideBar"
import ProfileImg from "../components/profile-img/ProfileImg";
import UploadImageModel from './components/UploadImageModel'
import { uploadImage, updateUserInfo } from '../../app/api'
import useUser from '../../hooks/useUser';
import './style.css'

export default function EditProfilePage() {

    const { id: userId } = useParams()
    const navigate = useNavigate()

    const imageRef = useRef(null)

    const [newUserInfo, setNewUserInfo] = useState({
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        about: '',
        password: '',
        newPassword: '',
        confirmPassword: '',
    })

    const { isLoading, data: response, error } = useUser(userId)
    useEffect(() => {
        if (!!response) setNewUserInfo(prev => {
            return ({
                firstname: response.data.first_name,
                lastname: response.data.last_name,
                username: response.data.username,
                email: response.data.email,
                about: response.data.about,
                password: '',
                newPassword: '',
                confirmPassword: '',
            })
        })
    }, [response])
    // console.log({ isLoading: isLoading, isRefetching: isRefetching, data: response })

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

    const queryClient = useQueryClient()
    const { mutate, isLoading: isUploading } = useMutation(uploadImage)
    const uploadImageHandler = () => {
        const body = new FormData()
        body.append('image', imageRef.current.files[0])
        mutate(body, {
            onSuccess: res => {
                queryClient.invalidateQueries([`get-user-${userId}`])
                closeUploadModel()
            }
        })
    }

    const { mutate: mutateEditInfo, isLoading: isEditting } = useMutation(updateUserInfo)
    const submitEdit = e => {
        e.preventDefault()
        const user = {
            first_name: newUserInfo.firstname,
            last_name: newUserInfo.lastname,
            username: newUserInfo.username,
            email: newUserInfo.email,
            about: newUserInfo.about,
            password: newUserInfo.password,
            new_password: newUserInfo.newPassword,
        }
        mutateEditInfo(user, {
            onSuccess: res => console.log('done')
        })
    }

    if (isLoading) return <h1>Loading...</h1>
    return (
        <Main>
            <NavSideBar />
            <section className='edit-profile-page'>
                {!!imageUploaded &&
                    <UploadImageModel
                        imgUrl={imageUploaded}
                        submitUpload={uploadImageHandler}
                        cancelUpload={closeUploadModel}
                        isUploading={isUploading}
                    />
                }
                <form onSubmit={submitEdit} className="edit-profile-form">
                    <h1>Profile Image</h1>
                    <div className="edit-profile-image">
                        <ProfileImg url={response.data.img_url} />
                        <span>{ response.data.username}</span>
                        <button onClick={handleChangeImage}>Change Profile Image</button>
                        <input type="file" ref={imageRef} style={{ display: 'none' }} onChange={previewImage} />
                    </div>

                    <h1>Basic Info</h1>
                    <div className="edit-basic-info">
                        <label>Firstname</label>
                        <input type="text" className="main-input" value={newUserInfo.firstname} onChange={({ target }) => setNewUserInfo({ ...newUserInfo, firstname: target.value })} />
                        <label>Lastname</label>
                        <input type="text" className="main-input" value={newUserInfo.lastname} onChange={({ target }) => setNewUserInfo({ ...newUserInfo, lastname: target.value })} />
                        <label>Username</label>
                        <input type="text" className="main-input" value={newUserInfo.username} onChange={({ target }) => setNewUserInfo({ ...newUserInfo, username: target.value })} />
                        <label>Email</label>
                        <input type="email" className="main-input" value={newUserInfo.email} onChange={({ target }) => setNewUserInfo({ ...newUserInfo, email: target.value })} />
                        <label>About</label>
                        <textarea rows={5} className="main-textarea" value={newUserInfo.about} onChange={({ target }) => setNewUserInfo({ ...newUserInfo, about: target.value })} />
                    </div>
                    <h1>Password</h1>
                    <div className="edit-password">
                        <label>Your Password</label>
                        <input type="password" className="main-input" value={newUserInfo.password} onChange={({ target }) => setNewUserInfo({ ...newUserInfo, password: target.value })} />
                        <label>New Password</label>
                        <input type="password" className="main-input" value={newUserInfo.newPassword} onChange={({ target }) => setNewUserInfo({ ...newUserInfo, newPassword: target.value })} />
                        <label>Confirm Password</label>
                        <input type="password" className="main-input" value={newUserInfo.confirmPassword} onChange={({ target }) => setNewUserInfo({ ...newUserInfo, confirmPassword: target.value })} />
                    </div>

                    <div className="functionalities">
                        <Link to={`/user/${userId}`} className="main-button">Cancel</Link>
                        <button className={`main-button ${isEditting ? 'disabled' : ''}`} disabled={isEditting}>Save</button>
                    </div>
                </form>
            </section>
        </Main>
    )
}