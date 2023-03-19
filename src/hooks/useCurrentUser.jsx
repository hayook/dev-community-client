import { useQuery } from 'react-query';
import { api } from '../app/api'

const getCurrentUser = () => api.get('/userprofile');

export default function useCurrentUser() {
    const { token } = localStorage;

    return useQuery([`get-user`], getCurrentUser, {
        enabled: !!token,
    });
}