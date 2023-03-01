import { useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'
import { useMutation, useQueryClient } from 'react-query'
import AdminTask from '../../components/kanban-board/components/AdminTask';
import KanbanBoard from "../../components/kanban-board/KanbanBoard";
import useProjectTasks from '../../../hooks/useProjectTasks'
import CreateTaskForm from './CreateTaskForm';
import { useParams } from 'react-router-dom';
import Spinner from '../../components/spinner/Spinner';
import { updateStatus } from '../../../app/api'

const columns = ['todo', 'in-progress', 'in-validation', 'completed']

export default function ProjectOverview() {

    const { id: projectId } = useParams();
    const { isLoading, data: response, error } = useProjectTasks(projectId)

    const [createTask, setCreateTask] = useState(false);

    // Updatae the task status
    const queryClient = useQueryClient();
    const { mutate: mutateStatus, isLoading: isUpdatingStatus } = useMutation(updateStatus)
    const dropTask = (e, newStatus) => {
        if (!e.dataTransfer.getData('taskId')) return;
        const taskId = e.dataTransfer.getData('taskId');
        mutateStatus({ projectId, taskId, newStatus }, {
            onSuccess: () => queryClient.invalidateQueries([`get-project-${projectId}-tasks`]),
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
                    <CreateTaskForm setCreateTask={setCreateTask} />
                )
                }
            </div>
        </section>
    )
}