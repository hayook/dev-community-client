import { useQueryClient } from "react-query";
import{ useParams } from 'react-router-dom'
import MembersTab from "./MembersTab";

export default function AllMembersTab() {
    
    const { id:projectId } = useParams();
    const queryClient = useQueryClient()

    return <MembersTab 
    heading = 'All Project Members' 
    membersList={queryClient.getQueryData([`get-project-${projectId}-members`]).data} 
    />
}