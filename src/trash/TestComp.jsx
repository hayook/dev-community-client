import { useEffect, useState } from 'react'
import { useQuery } from 'react-query';


const getter = async () => {
    const response =  await fetch('http://localhost:3000/posts');
    if (response.ok) return ({ ok: response.ok, data: await response.json() })
    return response;
}

// https://yajanarao.medium.com/how-to-create-a-basic-authentication-app-using-react-query-and-react-navigation-1c755269d031

export default function TestComp() {

    const { isLoading, error, isError, data} = useQuery(['test-query'], () => getter(), {
        // enabled: false,
        refetchOnWindowFocus: false,
        retry: false,
        retryOnMount: false,
        onSuccess: (res) => console.log(res),
        onError: () => console.log('Error')
    });


    if (isLoading) return <h1>Loading...</h1>
    if (isError) return <h1>{ error.message }</h1>
    if (data.ok) return <h1>Data</h1>
    return <h1>Server Error</h1>
}