import Main from '../components/main/Main'
import NavSideBar from '../components/nav-side-bar/NavSideBar'

export default function ProfilePage() {
    return (
        <Main>
            <NavSideBar />
            <section className="hero">
                <div className="profile-showcase"></div>
                <div className="about-user"></div>
            </section>
        </Main>
    )
}