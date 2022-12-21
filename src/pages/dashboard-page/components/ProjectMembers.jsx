import { useState } from 'react';
import { projects } from '../../../trash/test-data'
import AllMembersTab from './AllMembersTab'
import AdminsTab from './AdminsTab'
import TeamsTab from './TeamsTab'
import { filterByRole } from '../../../utiles/filter-by-role'

export default function ProjectMembers() {

    const [currentTab, setCurrentTab] = useState('all-members')

    const handleTarget = ({ target }) => {
        setCurrentTab(target.getAttribute('target'));
        document.querySelectorAll('ul.members-roles li').forEach(item => item.classList.remove('active'));
        target.classList.add('active')
    }

    return (
        <section className='members'>
            <div className="heading">
                <h1>Members</h1>
                <ul className="members-roles">
                    <li onClick={handleTarget} target='all-members' className='active'>All Members</li>
                    <li onClick={handleTarget} target='admins'>Admins</li>
                    <li onClick={handleTarget} target='teams'>Teams</li>
                </ul>
            </div>
            <div className="members-list-container">
            { currentTab === 'all-members' && <AllMembersTab membersList={projects[0].projectMembers} />}
            { currentTab === 'admins' && <AdminsTab membersList={filterByRole(projects[0].projectMembers, 'admin')} />}
            { currentTab === 'teams' && <TeamsTab />}
            </div>
        </section>
    )
}