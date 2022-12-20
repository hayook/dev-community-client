import { useState } from 'react';
import AllMembersTab from './AllMembersTab'
import MembersList from './MembersList';

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
                { currentTab === 'all-members' && <AllMembersTab />}
                { currentTab === 'admins' && <MembersList filter='admin' />}
            </div>
        </section>
    )
}