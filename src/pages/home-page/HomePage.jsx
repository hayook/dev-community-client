import Main from '../components/main/Main';
import NavSideBar from '../components/nav-side-bar/NavSideBar';
import WorkingRooms from '../components/working-rooms/WorkingRooms';
import SharePostSection from './components/SharePostSection';
import Posts from './components/Posts';
import './style.css'
import '../questions-page/style.css' // I forgot why this guy is in here

export default function HomePage() {
    return (
        <Main>
            <NavSideBar />
            <section className="timeline">
                <div className="timeline-container">
                    <SharePostSection />

                    <section className="posts">
                        <Posts />
                    </section>
                </div>
            </section>
            <WorkingRooms />
        </Main>
    )
}