import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useMutation, useQueryClient } from 'react-query';
import DeleteModel from '../../delete-model/DeleteModel'
import { BiArrowBack } from 'react-icons/bi'
import { BsPencil } from 'react-icons/bs'
import Model from '../../model/Model'
import ProjectMember from '../../../../pages/dashboard-page/components/ProjectMember'
import useProjectMembers from '../../../../hooks/useProjectMembers'
import { updateTask, deleteTask, getSuggestedMember } from '../../../../app/api'
import MainButton from '../../main-button/MainButton'
import { useAdminTaskContext } from './AdminTask'

export default function AdminTaskInfoModel({ closeModel }) {

    const { title, status, taskId, description, member, progress, taskSkills } = useAdminTaskContext()

    const { id: projectId } = useParams();

    const { isLoading, data: response, error } = useProjectMembers(projectId);

    const [editting, setEditting] = useState(false);
    const [reassign, setReassign] = useState(false);
    const [task, setTask] = useState({
        title,
        description,
        member,
        type: 'test'
    });
    const [deleteTaskModel, setDeleteTaskModel] = useState(false);

    const openDeleteModel = () => setDeleteTaskModel(true);
    const closeDeleteModel = () => setDeleteTaskModel(false);

    // Delete Task
    const { mutate: mutateDelete, isLoading: isDeleting } = useMutation(deleteTask)
    const handleDeleteTask = () => {
        mutateDelete({ projectId, taskId }, {
            onSuccess: () => {
                queryClient.invalidateQueries([`get-project-${projectId}-tasks`]);
                queryClient.invalidateQueries([`get-project-${projectId}`]);
                closeDeleteModel()
            }
        })
    }

    const editMember = (memberId, memberImg, memberUsername) => {
        const member = { memberId, memberImg, memberUsername }
        setTask(prev => ({ ...prev, member: member }))
        setReassign(false)
    }

    const { mutate, isLoading: isMutating } = useMutation(updateTask);
    const queryClient = useQueryClient();
    const submitChanges = () => {
        const skillsObj = {};
        taskSkills.forEach(skill => {
            skillsObj[skill.technology_id] = skill.technology_level;
        })
        const newTask = {
            task_title: task.title,
            task_description: task.description,
            task_type: task.type,
            member_id: task.member.memberId,
            task_skills: skillsObj,
        }
        mutate({ projectId, taskId, newTask }, {
            onSuccess: res => {
                queryClient.invalidateQueries([`get-project-${projectId}-tasks`]);
                closeModel();
            }
        })
    }

    const { mutate: mutateAutoAssign } = useMutation(getSuggestedMember);
    const autoAssign = () => {
        const skillsObj = {};
        taskSkills.forEach(skill => {
            skillsObj[skill.technology_id] = skill.technology_level;
        })
        const body = { task_skills: skillsObj };
        mutateAutoAssign({ body, projectId }, {
            onSuccess: res => editMember(res?.data.member_id, res?.data.img_url, res?.data.username),
        })
    }

    return (
        <>
            <Model closeModel={closeModel}>
                <div className="model-container admin-task-info">
                    {!editting ? (
                        <div className="info">
                            <h3>{task.title}</h3>
                            <p>{task.description}</p>
                            <span className='task-status'>Status <small>{status}</small> {status === 'in-progress' && `${progress}%`}</span>
                            <div className="assignment">
                                <span>Assigned To </span>
                                <ProjectMember
                                    memberImg={task.member.memberImg}
                                    memberUsername={task.member.memberUsername}
                                    userId={task.member.userId}
                                />
                            </div>
                            <button className="link-button" onClick={() => setEditting(true)}>Edit Task</button>
                            <div className="model-functionalities">
                                <button className="main-button">Done</button>
                            </div>

                        </div>
                    ) : (
                        !reassign ? (
                            <div className='info'>
                                <input type="text" className="main-input" value={task.title} onChange={({ target }) => setTask(prev => ({ ...prev, title: target.value }))} />
                                <textarea row={3} className='main-textarea' value={task.description} onChange={({ target }) => setTask(prev => ({ ...prev, description: target.value }))}></textarea>
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
                                    <button className="link-button" onClick={autoAssign}>Auto Assgin</button>
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
                    )}
                </div>
            </Model>
            {deleteTaskModel &&
                <DeleteModel
                    type='task'
                    cancelDelete={closeDeleteModel}
                    submitDelete={handleDeleteTask}
                    isDeleting={isDeleting}
                />
            }
        </>
    )
}