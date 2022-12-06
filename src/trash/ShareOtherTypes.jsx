export default function ShareOtherTypes() {
    return (
        <section className="other-posts-types">
            <div className="or">
                <hr />
                <span>OR</span>
                <hr />
            </div>
            <div className="functionalities">
                <Link to="/new-question" className="secondary-button">Ask Question</Link>
                <Link to="/share-project" className="secondary-button">Share Your Work</Link>
            </div>
        </section>
    )
}