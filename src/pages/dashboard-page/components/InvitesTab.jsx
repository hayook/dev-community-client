
import { useParams } from 'react-router-dom'
import ProjectMember from './ProjectMember'
import useProjectInvites from '../../../hooks/useProjectInvites'
import Spinner from '../../components/spinner/Spinner'
import { useMutation, useQueryClient } from 'react-query'
import { cancelInvite } from '../../../app/api'

export default function InvitesTab() {

    const { id: projectId } = useParams()

    const { isLoading, data: response, error } = useProjectInvites(projectId)

    const queryClient = useQueryClient()
    const { isLoading:isCanceling, mutate } = useMutation(cancelInvite)
    const calcelInviteHandler = (inviteId) => {
        mutate({ inviteId, projectId }, {
            onSuccess: () => queryClient.invalidateQueries([`get-project-${projectId}-invites`])
        })
    }
    return (
        <div className="invites-tab">
            <div className="heading">
                <h1>Pending Invites</h1>
            </div>
            <div className="invites-list">
                {isLoading ? <Spinner dim='30px' /> :
                    response?.data.length == 0 ? <p style={{ textAlign: 'center',}}>No Invites</p> :
                        response.data.map(invite => {
                            return (
                                <ProjectMember memberUsername={invite.user_id}>
                                    <button 
                                    onClick={() => calcelInviteHandler(invite.invite_id)} 
                                    className='main-button'
                                    disabled={isCanceling}
                                    >
                                        {isCanceling ? <Spinner /> : 'Cancel'}
                                        </button>
                                </ProjectMember>
                            )
                        })
                }
            </div>
        </div>
    )
}