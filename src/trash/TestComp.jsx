import { useState } from 'react'
import { tasks as initialState } from './test-data'
import './style.css'

const tasksClasses = ['backlog', 'in-progress', 'in-validation', 'completed'];

export default function TestComp() {

  const [tasks, setTasks] = useState(initialState)

  const updateTaskStatus = (taskId, newStatus) => {
    setTasks(tasks.map(task => {
      if (task.id === Number(taskId)) return ({ ...task, status: newStatus })
      return task; 
    }))
  }

  const dragTask = (e, taskId) => {
    e.dataTransfer.setData('taskId', taskId);
  }

  const hoveringTask = e => {
    e.preventDefault()
  }

  const dropTask = (e, tasksClass) => {
    updateTaskStatus(e.dataTransfer.getData('taskId'), tasksClass)
  }

  return (
    <div className="tasks-container">
      {
        tasksClasses.map(tasksClass => {
          return (

            <div onDragOver={hoveringTask} onDrop={e => dropTask(e, tasksClass)} className="clmn" id={tasksClass}>
              <h2>{tasksClass}</h2>
              <div className="tasks-list">
                {
                  tasks.map(task => {
                    if (task.status === tasksClass) return (
                      <div
                        draggable
                        onDragStart={e => dragTask(e, task.id)}
                        className='task'
                      >
                        {task.title}
                      </div>
                    )
                  })
                }
              </div>
            </div>
          )
        })
      }
    </div>
  )

}