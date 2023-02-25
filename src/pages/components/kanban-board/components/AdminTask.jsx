import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useMutation, useQueryClient } from 'react-query';
import DeleteModel from '../../delete-model/DeleteModel'
import { AiOutlineCheck } from 'react-icons/ai'
import { BiArrowBack } from 'react-icons/bi'
import { BsPencil } from 'react-icons/bs'
import Model from '../../model/Model'
import ProjectMember from '../../../../pages/dashboard-page/components/ProjectMember'
import useProjectMembers from '../../../../hooks/useProjectMembers'
import { updateTask, deleteTask } from '../../../../app/api'
import MainButton from '../../main-button/MainButton'

export default function AdminTask({ title, status, taskId, description, member, progress }) {

    const { id: projectId } = useParams()

    const [taskInfo, setTaskInfo] = useState(false);
    const closeModel = () => setTaskInfo(false)

    const dragTask = e => e.dataTransfer.setData('taskId', taskId);

    const { isLoading, data: response, error } = useProjectMembers(projectId)

    const [editTitle, setEditTitle] = useState(false);
    const [editDescription, setEditDescription] = useState(false)
    const [reassign, setReassign] = useState(false)
    const [deleteTaskModel, setDeleteTaskModel] = useState(false)
    const [task, setTask] = useState({
        title,
        description,
        member,
        type: 'test'
    })

    const openDeleteModel = () => setDeleteTaskModel(true)
    const closeDeleteModel = () => setDeleteTaskModel(false)

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
        mutate({ projectId, taskId, newTask }, {
            onSuccess: res => {
                queryClient.invalidateQueries([`get-project-${projectId}-tasks`]);
                closeModel();
            }
        })
    }

    const { mutate:mutateDelete, isLoading:isDeleting } = useMutation(deleteTask)
    const handleDeleteTask = () => {
        mutateDelete({ projectId, taskId }, {
            onSuccess: () => {
                queryClient.invalidateQueries([`get-project-${projectId}-tasks`]);
                closeDeleteModel()  
            }
        })
    }


    return (
        <>
            {taskInfo &&
                <Model closeModel={() => setTaskInfo(false)}>
                    <div className="mode-container admin-task-info">
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
                                <button className="link-button" onClick={() => openDeleteModel()}>Delete Task</button>
                                <div className="model-functionalities">
                                    <button className="main-button cancel-button" onClick={() => closeModel()}>Cancel</button>
                                    <MainButton onClick={submitChanges} disabled={isMutating}>Save</MainButton>
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
                </Model>
            }
            {deleteTaskModel &&
                <DeleteModel 
                    type='task'
                    cancelDelete={closeDeleteModel}
                    submitDelete={handleDeleteTask}
                    isDeleting={isDeleting}
                />
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