import { Link } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import { BsQuestionSquare, BsFillFileEarmarkPostFill, BsCodeSquare } from 'react-icons/bs';

export default function NavSideBar() {
    return (
        <nav className="main-nav">
            <ul>
                <li><Link to="/"><AiOutlineHome />Home</Link></li>
                    <li><Link to="/questions"><BsQuestionSquare />Questions</Link></li>
                    <li><Link to="/job-offers"><BsFillFileEarmarkPostFill />Job Offers</Link></li>
                    <li><Link to="/projects"><BsCodeSquare />Projects</Link></li>
            </ul>
        </nav>
    )
}