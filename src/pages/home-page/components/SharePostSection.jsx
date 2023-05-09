import { useState, useRef } from 'react'
import { Link } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { sharePost } from '../../../app/api'
import ProfileImg from '../../components/profile-img/ProfileImg'
import useCurrentUserData from '../../../hooks/useCurrentUserData'
import { adjustInputHeight } from '../../../lib/dom';
import MainButton from '../../components/main-button/MainButton'
import Show from '../../components/show/Show'
import { fullSpaces } from '../../../lib/string'

export default function SharePostSection() {

    const postFieldRef = useRef(null);

    const { currentUserProfileImg, currentUserId } = useCurrentUserData()

    const [postBody, setPostBody] = useState('');
    const [postErr, setPostErr] = useState('asdf');
    const [showFunctionalities, setShowFunctionalities] = useState(false);

    const handleSharePostTextarea = ({ target }) => {
        setPostBody(target.value);
        adjustInputHeight(target)
    }

    const queryClient = useQueryClient()
    const { mutate, isLoading: isPosting } = useMutation(sharePost);

    const handleSharePost = () => {

        postFieldRef.current.classList.remove('error-field');

        if (fullSpaces(postBody)) {
            postFieldRef.current.focus();
            postFieldRef.current.classList.add('error-field');
            return;
        }

        const post = { post_body: postBody, post_type: 'post' }
        mutate(post, {
            onSuccess: async () => {
                await queryClient.invalidateQueries('get-posts');
                setPostBody('');
                postFieldRef.current.style.height = 'unset';
            }
        });
    }

    return (
        <section className="share-post">
            <Link to={`/user/${currentUserId}`}><ProfileImg url={currentUserProfileImg} /></Link>
            <textarea
                ref={postFieldRef}
                value={postBody}
                onChange={handleSharePostTextarea}
                onFocus={() => setShowFunctionalities(true)}
                className="main-textarea"
                placeholder="Write Something"
                rows={3}
            ></textarea>

            <Show when={showFunctionalities}>
                <div className="functionalities">
                    <MainButton disabled={isPosting} onClick={handleSharePost} >Post</MainButton>
                </div>
            </Show>
        </section>
    )
}