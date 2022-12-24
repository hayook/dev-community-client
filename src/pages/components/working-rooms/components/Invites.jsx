import Invite from './Invite'
import useInvites from '../../../../hooks/useInvites'
import Spinner from '../../spinner/Spinner'

export default function Invites() {

    const { isLoading, data:response, error } = useInvites();
    
    if (isLoading) return <Spinner dim='30px' />
    if (response.ok && 'data' in response) {
        if (!response.data.length) return <span style={{ marginInline: 'auto'   }}>No Invites</span>
        return response.data.map(invite => <Invite key={invite.invite_id} inviteId={invite.invite_id} projectId={invite.project_id} />)
    }
    if(!response.ok) return <h1>{ response.status }</h1>
    return <h1>Error { error?.message }</h1>
}