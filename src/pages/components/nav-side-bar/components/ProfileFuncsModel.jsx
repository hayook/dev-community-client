import { useEffect, useRef } from 'react'
import { FiLogOut } from 'react-icons/fi'

export default function ProfileFuncsModel({ logout, setProfileFuncsModel, buttonRef }) {

    const profileFuncsModelRef = useRef(null)

    useEffect(() => {
        console.log('model mounted')
        const listener = ({ target }) => {
            const control = target !== buttonRef.current && !buttonRef.current.contains(target) && profileFuncsModelRef.current !== target && !profileFuncsModelRef.current.contains(target)
            if (control) setProfileFuncsModel(false)
        }
        document.body.addEventListener('click', listener)

        return () => document.body.removeEventListener('click', listener)
    }, [])

    return (
        <div ref={profileFuncsModelRef} className="profile-funcs-model">
            <button onClick={logout}><FiLogOut /> Logout</button>
        </div>
    )
}