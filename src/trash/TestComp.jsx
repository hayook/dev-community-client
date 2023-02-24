import { useState } from 'react'
import { tasks as initialState } from './test-data'
import Task from './kanban-board/components/Task'
import AdminTask from './kanban-board/components/AdminTask'
import Main from '../pages/components/main/Main'
import './style.css'
import KanbanBoard from './kanban-board/KanbanBoard';

const memberColumns = ['backlog', 'in-progress', 'completed'];
const adminColumns = ['backlog', 'in-progress', 'in-validation', 'completed'];

export default function TestComp() {

  const [tasks, setTasks] = useState(initialState)

  const dropTask = (e, newStatus) => {
    if (newStatus === 'completed') newStatus = 'in-validation'
    const newTasks = tasks.map(task => task.id === Number(e.dataTransfer.getData('taskId')) ? { ...task, status: newStatus } : task)
    setTasks(newTasks)
  }

  return <Main>
    <KanbanBoard
      dropTask={dropTask}
      columns={adminColumns}
    >
      {tasks.map((task, idx) => <Task key={idx} taskId={task.id} status={task.status} title={task.title} />)}
    </KanbanBoard>
  </Main>
}