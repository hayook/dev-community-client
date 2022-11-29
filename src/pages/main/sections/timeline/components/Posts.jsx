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
    }, []);

    return (
        <section className="timeline-content">
            {
                isLoading ? <h1>Loading...</h1> : 
                posts.map((post, idx) => {
                    let { userId, id:postId, title, body } = post; 
                    userId = Number(genId() + userId + genId());
                    return <Post key={idx} userId={userId} postId={postId} title={title} body={body} />
                })
                
            } 
        </section>
    )
}