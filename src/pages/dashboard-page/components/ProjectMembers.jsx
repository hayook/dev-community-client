import { useState } from 'react';
import { useParams } from 'react-router-dom'
import { projects } from '../../../trash/test-data'
import AllMembersTab from './AllMembersTab'
import AdminsTab from './AdminsTab'
import TeamsTab from './TeamsTab'
import useProjectMembers from '../../../hooks/useProjectMembers'
import Spinner from '../../components/spinner/Spinner'
import InvitesTab from './InvitesTab'

export default function ProjectMembers() {

    const { id:projectId } = useParams();
    const { isLoading, data:response, error } = useProjectMembers(projectId); 

    const [currentTab, setCurrentTab] = useState('all-members')

    const handleTarget = ({ target }) => {
        setCurrentTab(target.getAttribute('target'));
        document.querySelectorAll('ul.members-roles li').forEach(item => item.classList.remove('active'));
        target.classList.add('active')
    }

    if (isLoading) return <Spinner dim='30px' />
    if (response.ok && 'data' in response) return (
        <section className='members'>
            <div className="heading">
                <h1>Members</h1>
                <ul className="members-roles">
                    <li onClick={handleTarget} target='all-members' className='active'>All Members</li>
                    <li onClick={handleTarget} target='admins'>Admins</li>
                    <li onClick={handleTarget} target='teams'>Teams</li>
                    <li onClick={handleTarget} target='invites'>Invites</li>
                </ul>
            </div>
            <div className="members-list-container">
            { currentTab === 'all-members' && <AllMembersTab />}
            { currentTab === 'admins' && <AdminsTab />}
            { currentTab === 'teams' && <TeamsTab />}
            { currentTab === 'invites' && <InvitesTab />}
            </div>
        </section>
    )
    if (!response.ok) return <h1>{ response.status }</h1>
    return <h1>Error { error?.message }</h1>
}