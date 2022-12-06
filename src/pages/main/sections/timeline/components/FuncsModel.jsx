import { useRef, useEffect } from 'react';
import { usePostContext } from './Post';
import { BsPencil } from 'react-icons/bs';
import { BiTrashAlt } from 'react-icons/bi';

export default function FuncsModel() {

    const { setFuncs, OpenEditPostModel, OpenDeletePostModel, funcsButtonRef } = usePostContext();
    
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
                <li><button onClick={OpenEditPostModel}><BsPencil /> Edit Post</button></li>
                <li><button onClick={OpenDeletePostModel}><BiTrashAlt />Remove Post</button></li>
            </ul>
        </div>
    )
}