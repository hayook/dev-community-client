import { useEffect, useState } from 'react';
import Post from './Post';

function genId() {
    let id = '';
    for (let i = 0; i < 2; i++) id += Math.trunc(Math.random() * 9);
    return id;
}

export default function Posts() {
    const [posts, setPosts] = useState(null);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
        .then(res => res.json())
        .then(data => {
            setPosts(data);
            setIsLoading(false)
        })
        .catch(err => console.log(err))
    }, []);

    return (
        <section className="posts">
            {
                isLoading ? <h1>Loading...</h1> : 
                posts.map((post, idx) => {
                    let { userId:postOwnerId, id:postId, title, body } = post; 
                    postOwnerId = Number(genId() + postOwnerId + genId());
                    return <Post key={idx} postOwnerId={postOwnerId} postId={postId} title={title} body={body} />
                })
                
            } 
        </section>
    )
}