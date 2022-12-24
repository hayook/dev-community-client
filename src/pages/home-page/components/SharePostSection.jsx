import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query';
import Spinner from '../../components/spinner/Spinner'
import { sharePost } from '../../../app/api'
import ProfileImg from '../../components/profile-img/ProfileImg'

export default function SharePostSection() {

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
ProfileImg

    return (
            <section className="share-post">
                <ProfileImg />
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