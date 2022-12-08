import { useState } from 'react'
import { useGlobalState } from '../../../../../app/GlobalStateProvider';
import { POSTPost } from '../../../../../app/api';

export default function SharePostSection() {

    const { id:currentUserId } = useGlobalState().state.user;

    const [postBody, setPostBody] = useState('');
    const [showFunctionalities, setShowFunctionalities] = useState(false);


    const sharePost = async () => {
        POSTPost({ userId: currentUserId, id: new Date().getTime(), title: '', body: postBody, type: 'Post' });
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
                        <button onClick={sharePost} className="post main-button">Post</button>
                    </div>
                }
            </section>
    )
}