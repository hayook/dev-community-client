import { useQueryClient } from 'react-query'

export default function useCurrentUserData() {
    const queryClient = useQueryClient()
    return queryClient.getQueryData(['get-user']).data[0]; 
}