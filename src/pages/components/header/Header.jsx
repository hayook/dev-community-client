import { useGlobalState } from '../../../app/GlobalStateProvider'
import UserProfileShowcase from '../../components/user-profile-showcase/UserProfileShowcase'
import './style.css'


export default function Header() {

    const { state } = useGlobalState();

    return (
        <header>
            <div className="container">
                <input type="text" className="main-input search" placeholder="search" />
                <UserProfileShowcase userId={state.user.user_id} />
            </div>
        </header>
    )
}