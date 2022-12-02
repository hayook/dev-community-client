import { useState } from 'react'
import UserProfileShowcase from '../../../../../components/user-profile-showcase/UserProfileShowcase';
import { useGlobalState } from '../../../../../app/GlobalStateProvider';

export default function SharePostSection() {

    const [postBody, setPostBody] = useState('');
    const [showFunctionalities, setShowFunctionalities] = useState(false);
    const [rows, setRows] = useState(3)

    const { state } = useGlobalState();
    const { userId } = state.user;

    const sharePost = () => {
        console.log({ user_id: userId, post_description: postBody });
        setPostBody('');
    }

    const handleSharePostTextarea = ({ target }) => {
        setPostBody(target.value)
    }

    return (
        <>
        <section className="share-post">
            <div className="profile-img"></div>
            <textarea
                rows={rows}
                value={postBody}
                onChange={handleSharePostTextarea}
                onFocus={() => setShowFunctionalities(true)}
                className="main-textarea"
                placeholder="Write Something"
            ></textarea>
            {showFunctionalities &&
                <div className="functionalities">
                    <button onClick={sharePost} className="post main-button">Post</button>
                </div>
            }
        </section>
        <section className="other-posts-types">
            <div className="or">
                <hr />
                <span>OR</span>
                <hr />
            </div>
            <div className="functionalities">
                <button className="secondary-button">Ask A Question</button>
                <button className="secondary-button">Share Your Work</button>
            </div>
        </section>
        </>
    )
}