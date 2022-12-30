import { useState, useRef } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { RiImageAddFill } from 'react-icons/ri'
import ProfileImg from '../../components/profile-img/ProfileImg'
import UploadImageModel from './UploadImageModel'
import { useParams } from 'react-router-dom'

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

export default function ProfilePicture() {

    const { id:userId } = useParams()
    const uploadImgButtonRef = useRef(null)
    const [profilePic, setProfilePic] = useState(null)

    const queryClient = useQueryClient()
    const { img_url:profileImgUrl } = queryClient.getQueryData([`get-user-${userId}`]).data[0]

    const closeUploadModel = () => {
        setProfilePic(null)
        uploadImgButtonRef.current.value = ''
    }

    // Open Upload Model & Read the image for a preview
    const insertToUpload = ({ target }) => {
        const reader = new FileReader()
        reader.onload = () => setProfilePic(reader.result)
        reader.readAsDataURL(target.files[0]);
    }

    // Upload the image
    const { isLoading: isUploading, mutate } = useMutation(uploadImage)
    const uploadImageHandler = () => {
        const body = new FormData()
        body.append('image', uploadImgButtonRef.current.files[0])
        mutate(body, {
            onSuccess: res => {
                queryClient.invalidateQueries([`get-user-${userId}`])
                closeUploadModel();
            }
        })
    }

    return (
        <div className="user-pic">
            {!!profilePic &&
                <UploadImageModel
                    imgUrl={profilePic}
                    submitUpload={uploadImageHandler}
                    cancelUpload={closeUploadModel}
                    isUploading={isUploading}
                />
            }
            <ProfileImg
                dim='150px'
                url={profileImgUrl}
            />
            <input
                ref={uploadImgButtonRef}
                type="file" style={{ display: 'none' }}
                onChange={insertToUpload}
            />
            <button
                onClick={() => uploadImgButtonRef.current.click()}
                className="upload-pic">
                <RiImageAddFill />
            </button>
        </div>
    )
}