import Main from '../components/main/Main'
import NavSideBar from '../components/nav-side-bar/NavSideBar'
import ProfileImg from '../components/profile-img/ProfileImg'
import { RiImageAddFill } from 'react-icons/ri'
import './style.css'
import { useRef } from 'react'
import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import UploadImageModel from './componwnra/UploadImageModel'

const uploadImage = async (body) => {
    const response = await fetch(`http://localhost:3000/user_profile_img`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body,
    })
    try {
        return ({ ok: response.ok, status: response.status, data: await response.json() })
    } catch {
        return ({ ok: response.ok, status: response.status })
    }
}

export default function ProfilePage() {

    const uploadImgRef = useRef(null)
    const profileImgRef = useRef(null)
    const queryClient = useQueryClient()
    const [profilePic, setProfilePic] = useState(null)

    const closeUploadModel = () => {
        setProfilePic(null)
        uploadImgRef.current.value = ''
    }

    const insertToUpload = ({ target }) => {
        const reader = new FileReader()
        reader.onload = function () {
            setProfilePic(reader.result)
        }
        reader.readAsDataURL(target.files[0]);
    }

    const { isLoading: isUploading, mutate } = useMutation(uploadImage)
    const uploadImageHandler = () => {
        const body = new FormData()
        body.append('image', uploadImgRef.current.files[0])
        mutate(body, {
            onSuccess: res => { 
                queryClient.invalidateQueries(['get-user'])
                closeUploadModel();
            }
        })
    }

    return (
        <Main>
            <NavSideBar />
            <div className="profile-page">
                {!!profilePic &&
                    <UploadImageModel
                        imgUrl={profilePic}
                        submitUpload={uploadImageHandler}
                        cancelUpload={closeUploadModel}
                        isUploading={isUploading}
                    />
                }
                <section className="hero">
                    <div className="user-pic">
                        <ProfileImg dim='150px' url={queryClient.getQueryData(['get-user']).data[0].img_url} />
                        <input ref={uploadImgRef} type="file" style={{ display: 'none' }} onChange={insertToUpload} />
                        <button onClick={() => uploadImgRef.current.click()} className="upload-pic"><RiImageAddFill /></button>
                    </div>
                    <div className="basic-info">
                        <h2>Username</h2>
                        <nav>
                            <ul>
                                <li>Posts</li>
                                <li>Questions</li>
                                <li>Projects</li>
                                <li>About</li>
                            </ul>
                        </nav>
                    </div>
                </section>
            </div>
        </Main>
    )
}