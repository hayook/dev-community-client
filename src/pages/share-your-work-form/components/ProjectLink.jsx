import { RxCross1 } from 'react-icons/rx'
import { useShareSpecialPostContext } from '../ShareYourWorkForm'

export default function ProjectLink({ type, link, id }) {

    const { postInfo, updatePostInfo } = useShareSpecialPostContext()

    function updateLink(key, value) {
        updatePostInfo('projectLinks', postInfo.projectLinks.map(link => {
            if (link.id === id) return ({ ...link, [key]: value })
            return link;
        }))
    }

    const handleTypeInput = ({ target }) => updateLink('type', target.value)

    const handleLinkInput = ({ target }) => updateLink('link', target.value)

    const removeLink = (e) => {
        e.preventDefault();
        const temp = postInfo.projectLinks.filter((link) => link.id !== id);
        updatePostInfo('projectLinks', temp);
    }

    return (
        <div className='link'>
            <input type="text" onChange={handleTypeInput} className='main-input link-type' value={type} />
            <input type="text" onChange={handleLinkInput} className='main-input the-link' placeholder="Link Here" value={link} />
            <button className="times-button" onClick={removeLink}><RxCross1 /></button>
        </div>
    )
}