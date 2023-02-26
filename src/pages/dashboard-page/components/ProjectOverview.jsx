import { useState } from 'react'
import { useParams } from 'react-router-dom';
import { useQueryClient, useMutation } from 'react-query'
import { BiArrowBack } from 'react-icons/bi'
import { BsChevronDown } from 'react-icons/bs'
import AdminTask from '../../components/kanban-board/components/AdminTask';
import KanbanBoard from "../../components/kanban-board/KanbanBoard";
import ProjectMember from './ProjectMember';
import { postTask, updateStatus } from '../../../app/api'
import useProjectTasks from '../../../hooks/useProjectTasks'
import useProjectMembers from '../../../hooks/useProjectMembers'
import MainButton from '../../components/main-button/MainButton'
import Spinner from '../../components/spinner/Spinner'


const columns = ['todo', 'in-progress', 'in-validation', 'completed']

export default function ProjectOverview() {

    const { id: projectId } = useParams()
    const queryClient = useQueryClient()
    const projectData = queryClient.getQueryData([`get-project-${projectId}`])?.data[0];

    const { isLoading, data: response, error } = useProjectTasks(projectId)
    const { isLoading: isLoadingMembers, data: membersResponse, error: membersError } = useProjectMembers(projectId);

    const [showMembers, setShowMembers] = useState(false);
    const [createTask, setCreateTask] = useState(false);
    const [currentMember, setCurrentMember] = useState({
        memberId: projectData.member_id,
        memberUsername: projectData.username,
        memberProfileImg: projectData.img_url,
    })
    const [task, setTask] = useState({
        title: '',
        description: '',
        type: 'test',
    })

    // Updatae the task status
    const { mutate: mutateStatus, isLoading: isUpdatingStatus } = useMutation(updateStatus)
    const dropTask = (e, newStatus) => {
        if (!e.dataTransfer.getData('taskId')) return;
        const taskId = e.dataTransfer.getData('taskId');
        mutateStatus({ projectId, taskId, newStatus }, {
            onSuccess: () => queryClient.invalidateQueries([`get-project-${projectId}-tasks`]),
        })
    }

    // Post a new task
    const { mutate, isLoading: isPosting } = useMutation(postTask)
    const submitTask = e => {
        e.preventDefault();
        const newTask = {
            task_title: task.title,
            task_description: task.description,
            task_type: task.type,
            member_id: currentMember.memberId,
        }
        mutate({ projectId, task: newTask }, {
            onSuccess: () => {
                queryClient.invalidateQueries([`get-project-${projectId}-tasks`]),
                setCreateTask(false);
            }
        })

    }

    let content = null;
    if (isLoading) return content = <Spinner dim='30px' />
    if (response?.data?.length === 0) content = <p>No tasks</p>
    return (
        <section className="overview">
            <div className="heading">
                <h1>Project Overview</h1>
                {createTask ?
                    <button onClick={() => setCreateTask(false)} className='back-button'><BiArrowBack /></button>
                    :
                    <button onClick={() => setCreateTask(true)} className='main-button'>New Task</button>
                }
            </div>
            <div className="content">
                {!createTask ? (
                    <KanbanBoard
                        dropTask={dropTask}
                        content={content}
                        columns={columns}
                    >
                        {response?.data?.map((task, idx) => <AdminTask
                            key={idx}
                            title={task.task_title}
                            description={task.task_description}
                            status={task.task_state}
                            taskId={task.task_id}
                            member={{ memberId: task.member_id, memberUsername: task.username, userId: task.user_id, memberImg: task.img_url }}
                            progress={task.task_progress}
                        />
                        )}
                    </KanbanBoard>
                ) : (
                    <form onSubmit={submitTask} className="create-task">
                        <div className='inputs'>
                            <label>Title</label>
                            <input type="text" className="main-input" value={task.title} onChange={({ target }) => setTask(prev => ({ ...prev, title: target.value }))} />
                        </div>
                        <div className='inputs'>
                            <label>Description</label>
                            <textarea row={4} className='main-textarea' value={task.description} onChange={({ target }) => setTask(prev => ({ ...prev, description: target.value }))} />
                        </div>
                        <div className="assignment">
                            <button type='button' onClick={() => setShowMembers(prev => !prev)}>
                                <ProjectMember
                                    memberId={currentMember.memberId}
                                    memberUsername={currentMember.memberUsername}
                                    memberImg={currentMember.memberProfileImg}
                                ><BsChevronDown className="drop-icon" style={{ transform: `${showMembers ? 'rotate(180deg)' : 'rotate(0)'}` }} /></ProjectMember>
                            </button>
                            {showMembers &&
                                <div className="members-list">
                                    {membersResponse?.data?.map((member, idx) => {
                                        return <button type="button"
                                            key={idx}
                                            onClick={() => {
                                                setCurrentMember(prev => (
                                                    {
                                                        memberId: member.member_id,
                                                        memberUsername: member.username,
                                                        memberProfileImg: member.img_url,
                                                    }
                                                ))
                                                setShowMembers(false)
                                            }}
                                        >
                                            <ProjectMember
                                                userId={member.user_id}
                                                memberUsername={member.username}
                                                memberImg={member.img_url}
                                            />
                                        </button>
                                    })}
                                </div>
                            }
                        </div>
                        <MainButton disabled={isPosting}>Submit</MainButton>
                    </form>
                )
                }
            </div>
        </section>
    )
}