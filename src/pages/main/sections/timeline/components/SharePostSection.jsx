import { useState } from 'react'
import UserProfileShowcase from '../../../../../components/user-profile-showcase/UserProfileShowcase';
import { useGlobalState } from '../../../../../app/GlobalStateProvider';
import { headers } from '../../../../../app/api'

export default function SharePostSection() {

    const [postBody, setPostBody] = useState('');
    const { state } = useGlobalState();
    const { userId } = state.user;

    const sharePost = () => {
        console.log({ user_id: userId, post_description: postBody }); 
        setPostBody('');
    }

    return (
        <section className="share-post">
            <UserProfileShowcase userId={userId} />
            <textarea 
            value={postBody} 
            onChange={({ target }) => setPostBody(target.value)} 
            className="main-textarea" 
            placeholder="Write Something"
            ></textarea>
            <div className="functionalities">
                <button onClick={sharePost} className="post main-button">Post</button>
            </div>
        </section>
    )
}