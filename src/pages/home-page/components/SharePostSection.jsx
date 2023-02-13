import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query';
import Spinner from '../../components/spinner/Spinner'
import { sharePost } from '../../../app/api'
import ProfileImg from '../../components/profile-img/ProfileImg'
import useCurrentUserData from '../../../hooks/useCurrentUserData'
import { adjustInputHeight } from '../../../utiles/dom';

export default function SharePostSection() {

    const { currentUserProfileImg } = useCurrentUserData()

    const [postBody, setPostBody] = useState('');
    const [showFunctionalities, setShowFunctionalities] = useState(false);

    const handleSharePostTextarea = ({ target }) => {
        setPostBody(target.value);
        adjustInputHeight(target, '100px')
    }

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
                <ProfileImg url={currentUserProfileImg} />
                <textarea
                value={postBody}
                onChange={handleSharePostTextarea}
                onFocus={() => setShowFunctionalities(true)}
                className="main-textarea"
                placeholder="Write Something"
                style={{ height: '100px' }}
            ></textarea>

                {showFunctionalities &&
                    <div className="functionalities">
                        <button onClick={handleSharePost} className="main-button" disabled={isPosting}>{isPosting ? <Spinner /> : 'Post'}</button>
                    </div>
                }
            </section>
    )
}