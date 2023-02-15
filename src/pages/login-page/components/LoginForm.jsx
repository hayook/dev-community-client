import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from 'react-query'; 
import Spinner from '../../components/spinner/Spinner'
import { authUser, requestContents } from '../../../app/api';
import useCurrentUser from '../../../hooks/useCurrentUser'
import MainButton from '../../components/main-button/MainButton'
import '../../register-page/style.css'


export default function LoginForm() {

    const navigate = useNavigate()

    const [loginErr, setLoginErr] = useState('')
    const [userCredentials, setUserCredentials] = useState({ username: '', password: '' });  

    const { refetch:refetchUser } = useCurrentUser()

    const { isLoading, mutate } = useMutation(authUser); 

    const login = async (e) => {
        e.preventDefault();
        const user = {username: userCredentials.username, password: userCredentials.password };
        mutate({endpoint: '/login', body: user, content: requestContents.urlencoded }, {
            onSuccess: (res) => {
                if (res.status === 403) {
                    setLoginErr(res.data.detail); 
                    return; 
                }
                if (res.status === 200) {
                    localStorage.setItem('token', res.data.access_token);
                    refetchUser()
                    return;
                }
            },
            onError: (err) => console.log(err)
        })
    }

    return (
        <form onSubmit={login} className="main-form login-form">
            {!!loginErr && <span className='reg-error'>{loginErr}</span>}
            <label>Username Or Email</label>
            <input 
            onChange={({ target }) => setUserCredentials({...userCredentials, username: target.value})} 
            value={userCredentials.username} 
            className="main-input" 
            type="text" 
            placeholder="Enter Username Or Email" 
            />

            <label>Password</label>
            <input 
            onChange={({ target }) => setUserCredentials({...userCredentials, password: target.value})} 
            value={userCredentials.password} 
            className="main-input" 
            type="password" 
            placeholder="Enter Password" 
            />

            <MainButton disabled={isLoading}>Login</MainButton>
        </form>
    )
}