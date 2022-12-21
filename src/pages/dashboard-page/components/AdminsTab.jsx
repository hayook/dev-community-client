import MembersTab from './MembersTab';

export default function AdminsTab({ membersList }) {
    return <MembersTab heading="Project Admins" membersList={membersList} />
}