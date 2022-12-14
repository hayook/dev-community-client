import { useQuery } from 'react-query';
import { api } from '../app/api'
import { useGlobalState } from '../app/GlobalStateProvider';
import { ACTIONS } from '../app/actions';

const getCurrentUser = () => api.get('/userprofile');

export default function useUser() {
    const { dispatch, state } = useGlobalState();
    const { token } = state;

    return useQuery([`get-user`], getCurrentUser, {
        enabled: !!token,
        onSuccess: (res) => {
            if (res.status === 200) {
                dispatch({ type: ACTIONS.SET_USER, payload: res.data[0] });
                return;
            }
        },
        onError: (err) => console.log('Error ' + err),
    });
}