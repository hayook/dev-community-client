import { useState } from 'react'
import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query'
import KanbanBoard from '../../../trash/kanban-board/KanbanBoard'
import Task from '../../../trash/kanban-board/components/Task'
import { tasks as initialState } from '../../../trash/test-data';
import useMemberTasks from '../../../hooks/useMemberTasks'
import { updateStatus } from '../../../app/api';

const columns = ['todo', 'in-progress', 'in-validation'];

export default function ProjectTasks() {

    const { id: projectId } = useParams()

    const [tasks, setTasks] = useState(initialState)

    const { isLoading, data: response, error } = useMemberTasks(projectId)

    const queryClient = useQueryClient();
    const { mutate, isLoading:isMutating, error:mutatationError } = useMutation(updateStatus);
    const dropTask = (e, newStatus) => {
        const taskId = e.dataTransfer.getData('taskId');
        mutate({ projectId, taskId, newStatus }, {
            onSuccess: res => queryClient.invalidateQueries([`get-member-project-${projectId}-tasks`])
        })
    }
    
    if (isLoading) return <p>is loading</p>
    return (
        <KanbanBoard
            dropTask={dropTask}
            columns={columns}
        >
            {response?.data?.map((task, idx) =>
                <Task
                    key={idx}
                    taskId={task.task_id}
                    status={task.task_state}
                    title={task.task_title}
                    description={task.description}
                />
            )}
        </KanbanBoard>
    )
}