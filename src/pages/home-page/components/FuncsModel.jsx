import { useRef, useEffect } from 'react';
import { BsPencil } from 'react-icons/bs';
import { BiTrashAlt } from 'react-icons/bi';

export default function FuncsModel({ type, setFuncs, openDeleteModel, openEditModel, funcsButtonRef }) {
    
    const funcsModelRef = useRef(null);

    useEffect(() => {
        const listener = ({ target }) => {
            const control = target !== funcsButtonRef.current && !funcsButtonRef.current.contains(target) && funcsModelRef.current !== target //&& !funcsModelRef.current.contains(target)
            if (control) setFuncs(false)
        }
        document.body.addEventListener('click', listener);

        return () => document.body.removeEventListener('click', listener)
    }, []);
    return (
        <div ref={funcsModelRef} className="funcs-model">
            <ul>
                <li><button onClick={openEditModel}><BsPencil /> Edit { type }</button></li>
                <li><button onClick={openDeleteModel}><BiTrashAlt />Remove { type }</button></li>
            </ul>
        </div>
    )
}