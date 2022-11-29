import UserProfileShowcase from '../../../../../components/user-profile-showcase/UserProfileShowcase';

export default function SharePostSection() {
    return (
        <section className="share-post">
            <UserProfileShowcase />
            <textarea className="main-textarea" placeholder="Write Something"></textarea>
            <div className="functionalities">
                <button className="post main-button">Post</button>
            </div>
        </section>
    )
}