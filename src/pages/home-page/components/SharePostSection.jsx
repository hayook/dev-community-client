import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query';
import Spinner from '../../components/spinner/Spinner'
import { sharePost } from '../../../app/api'
import ProfileImg from '../../components/profile-img/ProfileImg'
import useCurrentUserData from '../../../hooks/useCurrentUserData'

export default function SharePostSection() {

    const { img_url:profileImg } = useCurrentUserData()

    const [postBody, setPostBody] = useState('');
    const [showFunctionalities, setShowFunctionalities] = useState(false);

    const handleSharePostTextarea = ({ target }) => setPostBody(target.value);

    const queryClient = useQueryClient()
    const { mutate, isLoading:isPosting } = useMutation(sharePost); 

    const handleSharePost = () => {
        const post = {post_body: postBody, post_type: 'post'}
        mutate(post, {
            onSuccess: async () => {
                await queryClient.invalidateQueries('get-posts');
                setPostBody('');
            }
        });
    }

    return (
            <section className="share-post">
                <ProfileImg url={profileImg} />
                <textarea
                value={postBody}
                onChange={handleSharePostTextarea}
                onFocus={() => setShowFunctionalities(true)}
                className="main-textarea"
                placeholder="Write Something"
            ></textarea>

                {showFunctionalities &&
                    <div className="functionalities">
                        <button onClick={handleSharePost} className="post main-button" disabled={isPosting}>{isPosting ? <Spinner /> : 'Post'}</button>
                    </div>
                }
            </section>
    )
}