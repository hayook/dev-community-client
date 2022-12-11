import { useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { useRef } from 'react';


const getter = async () => {
    const response =  await fetch('http://localhost:3000/posts');
    if (response.ok) return ({ ok: response.ok, data: await response.json() })
    return response;
}

// https://yajanarao.medium.com/how-to-create-a-basic-authentication-app-using-react-query-and-react-navigation-1c755269d031

export default function TestComp() {

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

   return (
    <form onSubmit={sendFile}>
        <input ref={imageRef} type="file" name="image"/>
        <button>Send    </button>
        <img src='http://localhost:3000/static/img/382b3bc0-6a3f-46ca-a6b7-528320d8fb62' />
    </form>
   )
}