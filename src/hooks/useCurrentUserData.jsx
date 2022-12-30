import { useQueryClient } from 'react-query'

export default function useCurrentUserData() {
    const queryClient = useQueryClient()
    const data = queryClient.getQueryData(['get-user']).data[0]
    return ({
        currentUserUsername: data.username,
        currentUserId: data.user_id,
        currentUserProfileImg: data.img_url,
    }); 
}