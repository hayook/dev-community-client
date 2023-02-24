import { useState } from 'react'
import { useParams } from 'react-router-dom';
import KanbanBoard from '../../../trash/kanban-board/KanbanBoard'
import Task from '../../../trash/kanban-board/components/Task'
import { tasks as initialState } from '../../../trash/test-data';
import useMemberTasks from '../../../hooks/useMemberTasks'

const columns = ['todo', 'in-progress', 'in-validation'];

export default function ProjectTasks() {

    const { id: projectId } = useParams()

    const [tasks, setTasks] = useState(initialState)

    const { isLoading, data: response, error } = useMemberTasks(projectId)

    const dropTask = (e, newStatus) => {
        // the completed status for the member is in reality in-validation
        const newTasks = tasks.map(task => task.id === Number(e.dataTransfer.getData('taskId')) ? { ...task, status: newStatus } : task)
        setTasks(newTasks)
    }
    
    console.log(response?.data)
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
                />
            )}
        </KanbanBoard>
    )
}