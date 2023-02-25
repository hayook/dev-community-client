import { useEffect, useRef } from 'react'
import './style.css'

export default function Model({ closeModel, modelHeading, children }) {

    const overlayRef = useRef(null);

    useEffect(() => {

        const listener = () => closeModel(false);

        overlayRef.current.addEventListener('click', listener);

        return () => overlayRef.current?.removeEventListener('click', listener);
    }, []);

    return (
        <>
            <div ref={overlayRef} className="overlay delete-model"></div>
            <div className="model delete-model">
                <h3>{ modelHeading }</h3>
                {children}
            </div>
        </>
    )
}