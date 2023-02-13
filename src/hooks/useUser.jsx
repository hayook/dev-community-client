import { useQuery } from "react-query";
import { api } from '../app/api'

const getUserById = (userId) => api.get(`/user/${userId}`)

export default function useUser(userId) {
    return useQuery([`get-user-${userId}`], () => getUserById(userId), {
        select: res => ({...res, data: res.data[0] })
    })
}