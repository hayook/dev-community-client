import { useMutation, useQueryClient } from 'react-query';
import { acceptInvite, rejectInvite } from "../../../../app/api"
import Spinner from '../../spinner/Spinner'
import MainButton from '../../main-button/MainButton'

export default function Invite({ projectName, inviteId }) {

    const queryClient = useQueryClient()
    const { user_id: userId } = queryClient.getQueryData('get-user').data[0]

    const { isLoading: isAccepting, mutate: mutateAccept } = useMutation(acceptInvite)
    const handleAccept = () => {
        mutateAccept(inviteId, {
            onSuccess: () => {
                queryClient.invalidateQueries([`get-user-${userId}-invites`])
                queryClient.invalidateQueries([`get-user${userId}-current-projects`]);
            }
        });
    }

    const { isLoading: isRejecting, mutate: mutateReject } = useMutation(rejectInvite)
    const handleReject = () => {
        mutateReject(inviteId, {
            onSuccess: () => queryClient.invalidateQueries([`get-user-${userId}-invites`])
        })
    }

    return (
        <div className="invites-list">
            <div className="invite">
                <h4>{projectName}</h4>
                <div className="functionalities">
                    <MainButton onClick={handleAccept} disabled={isAccepting}>Accept</MainButton>
                    <MainButton onClick={handleReject} disabled={isRejecting} style={{ backgroundColor: 'var(--red-clr-300)' }}>Reject</MainButton>
                </div>
            </div>
        </div>
    )
}