import { icons } from '../../../../../assets/icons/icons'
import SvgIcon from '../../../../../assets/icons/SvgIcon'
export default function Comment({ body }) {
    return (
        <div className="post-info comment">
            <div className="profile-img"></div>
            <div className="post-main">
                <span>user#8080</span>
                <span className="date">21h</span>
                <p className="post-content">{ body }</p>
                <button>
                    <SvgIcon path={icons.like} />
                    <span>244</span>
                </button>
            </div>
        </div>
    )
}