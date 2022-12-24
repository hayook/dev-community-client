import { useMutation, useQueryClient } from 'react-query';
import { acceptInvite, rejectInvite } from "../../../../app/api"
import Spinner from '../../spinner/Spinner'

export default function Invite({ projectId, inviteId }) {

    const queryClient = useQueryClient()
    const { user_id:userId } = queryClient.getQueryData('get-user').data[0]

    const { isLoading:isAccepting, mutate:mutateAccept } = useMutation(acceptInvite)
    const handleAccept = () => {
        mutateAccept(inviteId, {
            onSuccess: () => queryClient.invalidateQueries([`get-user-${userId}-invites`])
        });
    }

    const { isLoading:isRejecting, mutate:mutateReject } = useMutation(rejectInvite)
    const handleReject = () => {
        mutateReject(inviteId, {
            onSuccess: () => queryClient.invalidateQueries([`get-user-${userId}-invites`])
        })
    }

    return (
        <div className="invites-list">
            <div className="invite">
                <h4>Project#{ projectId }</h4>
                <div className="functionalities">
                    <button onClick={handleAccept} className="main-button" disabled={isAccepting}>{ isAccepting ? <Spinner /> : 'Accept'}</button>
                    <button onClick={handleReject} className="main-button reject" disabled={isRejecting}>{ isRejecting ? <Spinner /> : 'Reject'}</button>
                </div>
            </div>
        </div>
    )
}