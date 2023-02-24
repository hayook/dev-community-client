import { useState } from 'react'
import PrimaryModel from './PrimaryModel'
import ProjectMember from '../../../pages/dashboard-page/components/ProjectMember'

export default function AdminTask({ title, status, taskId, description }) {

    const [taskInfo, setTaskInfo] = useState(false);

    const dragTask = e => e.dataTransfer.setData('taskId', taskId);

    const [editTitle, setEditTitle] = useState(false);
    const [editDescription, setEditDescription] = useState(false)
    const [reassign, setReassign] = useState(false)

    return (
        <>
            {taskInfo &&
                <PrimaryModel closeModel={() => setTaskInfo(false)}>
                    <div className="admin-task-info">
                        {!reassign ? (
                            <div className="info">
                                <div className="title">
                                    {editTitle ? (
                                        <input type="text" className="main-input" defaultValue='title' />
                                    ) : (
                                        <h2>{ title }</h2>
                                    )
                                    }
                                    <button onClick={() => setEditTitle(prev => !prev)}>edit</button>
                                </div>
                                <div className="description">
                                    {editDescription ? (
                                        <textarea row={3} className='main-textarea' />
                                    ) : (
                                        <p>{ description }</p>
                                    )
                                    }
                                    <button onClick={() => setEditDescription(prev => !prev)}>edit</button>
                                </div>
                                <span>Progress 100%</span>
                                <div className="assignment">
                                    <span>Assigned To </span>
                                    <ProjectMember memberUsername="username" />
                                    <button onClick={() => setReassign(prev => !prev)}>edit</button>
                                </div>
                                <button className="delete-task-btn">Delete Task</button>
                                <div className="functionalities">
                                    <button className="main-button">Cancel</button>
                                    <button className="main-button">Save</button>
                                </div>
                            </div>
                        ) : (
                            <div className="members-list">
                                <div className="back">
                                    <button onClick={() => setReassign(false)}>back</button>
                                </div>
                                <div className="list">
                                    <ProjectMember memberUsername={'username'}>
                                        <button>assign</button>
                                        </ProjectMember>
                                </div>
                            </div>
                        )
                        }
                    </div>
                </PrimaryModel>
            }
            <div
                draggable={status === 'in-validation' || status === 'completed'}
                onDragStart={dragTask}
                className="task"
                onClick={() => setTaskInfo(true)}>
                <span>{title}</span>
            </div>
        </>
    )
}