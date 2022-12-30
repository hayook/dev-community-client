import { useQuery } from "react-query";
import useCurrentUserData from './useCurrentUserData'
import { api } from '../app/api'

const getInvites = () => api.get('/user/invites/');

export default function useInvites() {

    const { currentUserId } = useCurrentUserData()

    return useQuery([`get-user-${currentUserId}-invites`], getInvites)
}