import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useMutation, useQueryClient } from 'react-query';
import { AiOutlineCheck } from 'react-icons/ai'
import { BiArrowBack } from 'react-icons/bi'
import { BsPencil } from 'react-icons/bs'
import PrimaryModel from './PrimaryModel'
import ProjectMember from '../../../../pages/dashboard-page/components/ProjectMember'
import useProjectMembers from '../../../../hooks/useProjectMembers'
import { updateTask } from '../../../../app/api'

export default function AdminTask({ title, status, taskId, description, member, progress }) {

    const { id: projectId } = useParams()

    const [taskInfo, setTaskInfo] = useState(false);
    const closeModel = () => setTaskInfo(false)

    const dragTask = e => e.dataTransfer.setData('taskId', taskId);

    const { isLoading, data: response, error } = useProjectMembers(projectId)

    const [editTitle, setEditTitle] = useState(false);
    const [editDescription, setEditDescription] = useState(false)
    const [reassign, setReassign] = useState(false)
    const [deleteTask, setDeleteTask] = useState(false)
    const [task, setTask] = useState({
        title,
        description,
        member,
        type: 'test'
    })

    const openModel = () => setDeleteTask(true)

    const editMember = (memberId, memberImg, memberUsername) => {
        const member = { memberId, memberImg, memberUsername }
        setTask(prev => ({ ...prev, member: member }))
        setReassign(false)
    }

    const { mutate, isLoading: isMutating } = useMutation(updateTask);
    const queryClient = useQueryClient();
    const submitChanges = () => {
        const newTask = {
            task_title: task.title,
            task_description: task.description,
            task_type: task.type,
            member_id: task.member.memberId,
        }
        console.log(newTask)
        mutate({ projectId, taskId, newTask }, {
            onSuccess: res => {
                queryClient.invalidateQueries([`get-project-${projectId}-tasks`]);
                closeModel();
            }
        })
    }


    return (
        <>
            {taskInfo &&
                <PrimaryModel closeModel={() => setTaskInfo(false)}>
                    <div className="admin-task-info">
                        {!reassign ? (
                            <div className="info">
                                <div className="title">
                                    {editTitle ? (
                                        <>
                                            <input type="text" className="main-input" value={task.title} onChange={({ target }) => setTask(prev => ({ ...prev, title: target.value }))} />
                                            <button onClick={() => setEditTitle(prev => false)}><AiOutlineCheck /></button>
                                        </>
                                    ) : (
                                        <>
                                            <h2>{task.title}</h2>
                                            <button onClick={() => setEditTitle(prev => true)}><BsPencil /></button>
                                        </>
                                    )
                                    }
                                </div>
                                <div className="description">
                                    {editDescription ? (
                                        <>
                                            <textarea row={3} className='main-textarea' value={task.description} onChange={({ target }) => setTask(prev => ({ ...prev, description: target.value }))}></textarea>
                                            <button onClick={() => setEditDescription(prev => false)}><AiOutlineCheck /></button>
                                        </>
                                    ) : (
                                        <>
                                            <p>{task.description}</p>
                                            <button onClick={() => setEditDescription(prev => true)}><BsPencil /></button>
                                        </>
                                    )
                                    }
                                </div>
                                <span className='task-status'>Status <small>{status}</small> {status === 'in-progress' && `${progress}%`}</span>
                                <div className="assignment">
                                    <span>Assigned To </span>
                                    <ProjectMember memberImg={task.member.memberImg} memberUsername={task.member.memberUsername} />
                                    <button onClick={() => setReassign(prev => !prev)}><BsPencil /></button>
                                </div>
                                <button className="link-button" onClick={() => openModel()}>Delete Task</button>
                                <div className="functionalities">
                                    <button className="main-button cancel-button" onClick={() => closeModel()}>Cancel</button>
                                    <button className="main-button" onClick={submitChanges}>Save</button>
                                </div>
                            </div>
                        ) : (
                            <div className="members-list">
                                <button className="back-button" onClick={() => setReassign(false)}><BiArrowBack /></button>
                                <div className="list">
                                    {
                                        response?.data?.map((member, idx) => {
                                            return <button key={idx} onClick={() => editMember(member.member_id, member.img_url, member.username)}>
                                                <ProjectMember memberImg={member.img_url} memberUsername={member.username} />
                                            </button>
                                        })
                                    }
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