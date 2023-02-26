import { useState, useContext, createContext } from 'react'
import AdminTaskInfoModel from './AdminTaskInfoModel'

const adminTaskContext = createContext();
export const useAdminTaskContext = () => useContext(adminTaskContext);

export default function AdminTask({ title, status, taskId, description, member, progress }) {

    const [taskInfo, setTaskInfo] = useState(false);
    const closeModel = () => setTaskInfo(false)

    const dragTask = e => {
        if (status === 'in-validation' || status === 'completed') {
            e.dataTransfer.setData('taskId', taskId);
            return;
        }
        e.preventDefault()
    }

    const value = { title, status, taskId, description, member, progress };

    return (
        <adminTaskContext.Provider value={value}>
            {taskInfo &&
                <AdminTaskInfoModel closeModel={closeModel} />
            }
            <div
                draggable
                onDragStart={dragTask}
                className="task"
                onClick={() => setTaskInfo(true)}>
                <span>{title}</span>
            </div>
        </adminTaskContext.Provider>
    )
}