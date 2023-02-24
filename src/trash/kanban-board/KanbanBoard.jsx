import { useState } from 'react'
import Task from './components/Task'
import { tasks as initialState } from '../test-data'
import './style.css'

export default function KanbanBoard({ columns, dropTask, children }) {

    const [tasks, setTasks] = useState(initialState);

    const hoveringTask = e => e.preventDefault();

    return (
        <div className="kanban-board-container">
            <div className="kanban-board">
                <div className="headings">
                    {columns.map((column, idx) => <h1 className='column' key={idx}>{column}</h1>)}
                </div>
                <div className="content">
                    {columns.map((column, idx) => {     
                        return <div
                            key={idx} className='tasks-container column'
                            onDragOver={hoveringTask}
                            onDrop={e => dropTask(e, column)}
                        >
                            {children.filter(child => child.props.status === column)}
                        </div>
                    })}
                </div>
            </div>
        </div>
    )
}