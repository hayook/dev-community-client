import { useRef, useEffect } from 'react'
import './style.css'

export default function Model({ closeModel, children }) {

    const modelRef = useRef(null);

    useEffect(() => {
        const listener = e => {
            if (e.keyCode === 27) closeModel();
        }

        document.body.addEventListener('keydown', listener);

        return () => document.body.removeEventListener('keydown', listener)

    }, [])

    const handleCloseModel = e => {
        const control = e.target !== modelRef.current && !modelRef.current.contains(e.target);
        if (control) closeModel();
    }

    return (
        <>
            <div className="overlay" onClick={handleCloseModel}>
                <div ref={modelRef} className="model">
                    {children}
                </div>
            </div>
        </>
    )
}