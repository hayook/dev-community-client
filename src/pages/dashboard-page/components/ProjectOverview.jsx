import { useState } from 'react'
import AdminTask from '../../../trash/kanban-board/components/AdminTask';
import KanbanBoard from "../../../trash/kanban-board/KanbanBoard";
import { tasks as initialState } from "../../../trash/test-data";
import ProjectMember from './ProjectMember';
import { BiArrowBack } from 'react-icons/bi'
import { useMutation } from 'react-query';
import { postTask } from '../../../app/api'
import { useParams } from 'react-router-dom';
import useProjectTasks from '../../../hooks/useProjectTasks'
import useCurrentUserData from '../../../hooks/useCurrentUserData'
import useProjectMembers from '../../../hooks/useProjectMembers'

const columns = ['todo', 'in-progress', 'in-validation', 'completed']

export default function ProjectOverview() {

    const { id: projectId } = useParams()
    const currentUser = useCurrentUserData()

    const { isLoading, data: response, error } = useProjectTasks(projectId)
    const { isLoading: isLoadingMembers, data: membersResponse, error: membersError } = useProjectMembers(projectId);

    const [tasks, setTasks] = useState(initialState);
    const [showMembers, setShowMembers] = useState(false);
    const [createTask, setCreateTask] = useState(false);
    const [currentMember, setCurrentMember] = useState({
        memberId: currentUser.currentUserId,
        memberUsername: currentUser.currentUserUsername,
        memberProfileImg: currentUser.currentUserProfileImg,
    })
    const [task, setTask] = useState({
        title: '',
        description: '',
        type: 'test',
    })

    const dropTask = (e, newStatus) => {
        const newTasks = tasks.map(task => task.id === Number(e.dataTransfer.getData('taskId')) ? { ...task, status: newStatus } : task)
        setTasks(newTasks)
    }

    const { mutate, isLoading: isPosting } = useMutation(postTask)
    const submitTask = e => {
        e.preventDefault();
        const newTask = {
            task_title: task.title,
            task_description: task.description,
            task_type: task.type,
            member_id: currentMember.memberId,
        }
        console.log(newTask)
        mutate({ projectId, task: newTask })

    }

    if (isLoading) return <p>is Loading</p>
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
                        columns={columns}
                    >
                        {response?.data?.map((task, idx) => <AdminTask 
                        key={idx} 
                        title={task.task_title} 
                        status={task.task_state} 
                        taskId={task.task_id} 
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
                                />
                            </button>
                            {showMembers &&
                                <div className="members-list">
                                    {membersResponse?.data?.map((member, idx) => {
                                        return <button type="button"
                                            key={idx}
                                            onClick={() => {
                                                setCurrentMember(prev => (
                                                    {
                                                        memberId: member.user_id,
                                                        memberUsername: member.username,
                                                        memberProfileImg: member.img_url,
                                                    }
                                                ))
                                                setShowMembers(false)
                                            }}
                                        >
                                            <ProjectMember
                                                memberId={member.user_id}
                                                memberUsername={member.username}
                                                memberImg={member.img_url}
                                            />
                                        </button>
                                    })}
                                </div>
                            }
                        </div>
                        <button className='main-button'>Submit</button>
                    </form>
                )
                }
            </div>
        </section>
    )
}