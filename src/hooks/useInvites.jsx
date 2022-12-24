import { useQuery } from "react-query";
import { useGlobalState } from '../app/GlobalStateProvider'
import { api } from '../app/api'

const getInvites = () => api.get('/user/invites/');

export default function useInvites() {

    const { user_id:userId } = useGlobalState().state.user;

    return useQuery([`get-user-${userId}-invites`], getInvites)
}