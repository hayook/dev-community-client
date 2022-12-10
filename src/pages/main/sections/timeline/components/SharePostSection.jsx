import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query';
import Spinner from '../../../../../components/spinner/Spinner'
import { sharePost } from '../../../../../app/api'

export default function SharePostSection() {

    const [postBody, setPostBody] = useState('');
    const [showFunctionalities, setShowFunctionalities] = useState(false);


    const queryClient = useQueryClient()
    const { mutate, isLoading:isPosting } = useMutation(() => sharePost()); 

    const handleSharePost = async () => {
        const post = {post_body: postBody, post_type: 'post'}
        mutate(post, {
            onSuccess: (res) => {
                console.log('Fetching Success With Status ' + res.status)
                queryClient.invalidateQueries('get-posts');
            }
        });
        setPostBody('');
    }

    const handleSharePostTextarea = ({ target }) => setPostBody(target.value);

    return (
            <section className="share-post">
                <div className="profile-img"></div>
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