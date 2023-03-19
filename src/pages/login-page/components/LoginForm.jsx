import { useRef, useState } from 'react'
import { useMutation } from 'react-query';
import { authUser, requestContents } from '../../../app/api';
import useCurrentUser from '../../../hooks/useCurrentUser';
import Show from '../../components/show/Show';
import MainButton from '../../components/main-button/MainButton'

const initialState = { username: '', password: '' };

export default function LoginForm() {

    const usernameFieldRef = useRef(null);
    const passwordFieldRef = useRef(null);

    const [loginErr, setLoginErr] = useState('');
    const [userCredentials, setUserCredentials] = useState(initialState);

    const { refetch: refetchUser } = useCurrentUser();

    // Send the login request
    const { isLoading, mutate } = useMutation(authUser);
    const login = async e => {
        e.preventDefault();

        usernameFieldRef.current.classList.remove('error-field');
        passwordFieldRef.current.classList.remove('error-field');

        if (userCredentials.username === '') {
            setLoginErr(`Username can't be empty`);
            usernameFieldRef.current.classList.add('error-field');
            usernameFieldRef.current.focus();
            return;
        }

        if (userCredentials.password === '') {
            setLoginErr(`Password can't be empty`);
            passwordFieldRef.current.classList.add('error-field');
            passwordFieldRef.current.focus();
            return;
        }

        const user = { username: userCredentials.username, password: userCredentials.password };
        mutate({ endpoint: '/login', body: user, content: requestContents.urlencoded }, {
            onSuccess: res => {

                // Incorrect Credentials
                if (res.status === 403) {
                    setUserCredentials(initialState);
                    setLoginErr(res.data.detail);
                    return;
                }

                // User is authenticated
                if (res.status === 200) {
                    localStorage.setItem('token', res.data.access_token);
                    refetchUser();
                    return;
                }
            },
            onError: () => setLoginErr('Something went wrong. Please try again')
        })
    }

    return (
        <form onSubmit={login} className='main-form'>
            <Show when={!!loginErr}>
                <span className='form-message error'>{loginErr}</span>
            </Show>

            <label>Username</label>
            <input
                ref={usernameFieldRef}
                onChange={({ target }) => setUserCredentials({ ...userCredentials, username: target.value })}
                value={userCredentials.username}
                className="main-input"
                type="text"
                placeholder="Enter Username"
            />

            <label>Password</label>
            <input
                ref={passwordFieldRef}
                onChange={({ target }) => setUserCredentials({ ...userCredentials, password: target.value })}
                value={userCredentials.password}
                className="main-input"
                type="password"
                placeholder="Enter Password"
            />

            <MainButton disabled={isLoading}>Login</MainButton>
        </form>
    )
}