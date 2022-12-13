import { useEffect } from 'react';
import { api } from '../app/api'

export default function TestComp() {

    useEffect(() => {
        api.get('/posts').then(res => {
            console.log(Object.hasOwn(res, 'data'))
        })
        
    }, []);

    return <h1>Test</h1>
}