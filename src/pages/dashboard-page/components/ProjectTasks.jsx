import { useState } from 'react'
import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query'
import KanbanBoard from '../../components/kanban-board/KanbanBoard'
import Task from '../../components/kanban-board/components/Task'
import useMemberTasks from '../../../hooks/useMemberTasks'
import { updateStatus } from '../../../app/api';
import Spinner from '../../components/spinner/Spinner'

const columns = ['todo', 'in-progress', 'in-validation'];

export default function ProjectTasks() {

    const { id: projectId } = useParams()

    const { isLoading, data: response, error } = useMemberTasks(projectId)

    const queryClient = useQueryClient();
    const { mutate, isLoading: isMutating, error: mutatationError } = useMutation(updateStatus);
    const dropTask = (e, newStatus) => {
        const taskId = e.dataTransfer.getData('taskId');
        mutate({ projectId, taskId, newStatus }, {
            onSuccess: res => queryClient.invalidateQueries([`get-member-project-${projectId}-tasks`])
        })
    }

    let content = null;
    if (isLoading) return content = <Spinner dim='30px' />
    if (response?.data?.length === 0) content = <p>No tasks</p>
    return (
        <KanbanBoard
            dropTask={dropTask}
            content={content}
            columns={columns}
        >
            {response?.data?.map((task, idx) =>
                <Task
                    key={idx}
                    taskId={task.task_id}
                    status={task.task_state}
                    title={task.task_title}
                    description={task.description}
                    progress={task.task_progress}
                    taskStartDate={task.task_start_date}
                    taskEndDate={task.task_end_date}
                />
            )}
        </KanbanBoard>
    )
}