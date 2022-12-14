import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'; 
import Spinner from '../../../../components/spinner/Spinner'
import { authUser } from '../../../../app/api';
import { useGlobalState } from '../../../../app/GlobalStateProvider';
import '../../../Register/style.css'
import { ACTIONS } from '../../../../app/actions';


export default function LoginForm() {

    const [loginErr, setLoginErr] = useState('')
    const [userCredentials, setUserCredentials] = useState({ username: '', password: '' });  
    
    const { dispatch } = useGlobalState();

    const queryClient = useQueryClient();
    const { isLoading, mutate } = useMutation(authUser); 

    const login = async (e) => {
        e.preventDefault();
        const user = {username: userCredentials.username, password: userCredentials.password };
        mutate({endpoint: '/login', body: user }, {
            onSuccess: (res) => {
                if (res.status === 403) {
                    setLoginErr(res.data.detail); 
                    return; 
                }
                if (res.status === 200) {
                    localStorage.setItem('token', res.data.access_token);
                    dispatch({ type: ACTIONS.SET_TOKEN, payload: res.data.access_token});
                    queryClient.invalidateQueries('get-user')
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

            <button className="main-button" disabled={isLoading}>{ isLoading ? <Spinner dim='20px' /> : 'Login' }</button>
        </form>
    )
}