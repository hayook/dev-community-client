import { useQueryClient } from 'react-query';
import MembersTab from './MembersTab';
import { filterByRole } from '../../../utiles/filter-by-role'
import { useParams } from 'react-router-dom';

export default function AdminsTab() {

    const { id:projectId } = useParams()
    const queryClient = useQueryClient()

    return <MembersTab 
    heading="Project Admins" 
    membersList={filterByRole(queryClient.getQueryData([`get-project-${projectId}-members`]).data, 'admin')} 
    />
}