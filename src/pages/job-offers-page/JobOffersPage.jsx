import Main from '../components/main/Main';
import NavSideBar from '../components/nav-side-bar/NavSideBar';
import WorkingRooms from '../components/working-rooms/WorkingRooms';

export default function JobOffersPage() {
    return (
        <Main>
            <NavSideBar />
            <h1>Job Offers</h1>
            <WorkingRooms />
        </Main>
    )
}