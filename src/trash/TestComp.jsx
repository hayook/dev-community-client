import { useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { useRef } from 'react';
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.min.css";


const getter = async () => {
    const response = await fetch('http://localhost:3000/posts');
    if (response.ok) return ({ ok: response.ok, data: await response.json() })
    return response;
}

// https://yajanarao.medium.com/how-to-create-a-basic-authentication-app-using-react-query-and-react-navigation-1c755269d031


const language = 'python py'
const code = `
    def sum(a, b):
        return a + b
`


export default function TestComp() {

    useEffect(() => {
        Prism.highlightAll();
    }, []);

    const imageRef = useRef(null)

    const sendFile = (e) => {
        e.preventDefault();
        const image = imageRef.current.files[0]
        let formData = new FormData()
        formData.append("image", image);
        fetch('http://localhost:3000/uploadfile/', {
            body: formData,
        })
            .then(res => res.json()).then(data => console.log(data))
    }

    const handleFile = ({ target }) => {
        const formData = new FormData();
        const file = target.files[0];
        formData.append('file', file)
        console.log('send a request to get the link');
    }

    return (
        // <form onSubmit={sendFile}>
        //     <input onInput={handleFile} ref={imageRef} type="file" name="image"/>
        //     <button>Send</button>
        // </form>
        <>
            <pre><code className={`language-${language}`}>{code}</code></pre>
        </>
    )
}