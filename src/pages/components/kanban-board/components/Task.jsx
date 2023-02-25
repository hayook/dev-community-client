import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useMutation, useQueryClient } from 'react-query'
import PrimaryModel from './PrimaryModel'
import { updateProgress } from '../../../../app/api'
import MainButton from '../../../../pages/components/main-button/MainButton'

export default function Task({ taskId, title, status, description, progress }) {

    const { id: projectId } = useParams()
    const [taskInfo, setTaskInfo] = useState(false)
    const [taskProgress, setTaskProgress] = useState(progress)

    const closeModel = () => setTaskInfo(false)

    const dragTask = e => e.dataTransfer.setData('taskId', taskId);

    const queryClient = useQueryClient()

    const { mutate, isLoading, error } = useMutation(updateProgress)
    const submitProgress = () => {
        mutate({ projectId, taskId, newProgress: taskProgress }, {
            onSuccess: () => {
                queryClient.invalidateQueries([`get-member-project-${projectId}-tasks`]);
                setTaskInfo(false);
            }

        })
    }

    return (
        <>
            {taskInfo &&
                <PrimaryModel closeModel={closeModel}>
                    <div className="member-task-info">
                        <h2>{title}</h2>
                        <p className="description">{description}</p>
                        <span className='task-status'>Status <small>{status}</small> {status === 'in-progress' && `${taskProgress}%`}</span>
                        {status === 'in-progress' &&
                            <div className="progress">
                                <input type="range" className="range-input" value={taskProgress} onChange={({ target }) => setTaskProgress(prev => target.value)} />
                            </div>
                        }
                        <MainButton onClick={submitProgress} disabled={isLoading}>Done</MainButton>
                    </div>
                </PrimaryModel>
            }
            <div
                onClick={() => setTaskInfo(true)}
                className='task'
                draggable
                onDragStart={dragTask}
            ><p>{title}</p></div>
        </>
    )
}

