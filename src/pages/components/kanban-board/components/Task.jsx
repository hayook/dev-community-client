import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useMutation, useQueryClient } from 'react-query'
import Model from '../../model/Model'
import { updateProgress } from '../../../../app/api'
import MainButton from '../../../../pages/components/main-button/MainButton'
import { differenceInSeconds, isBefore } from 'date-fns'

export default function Task({ taskId, title, status, description, progress, taskStartDate, taskEndDate }) {

    const { id: projectId } = useParams()
    const [taskInfo, setTaskInfo] = useState(false)
    const [taskProgress, setTaskProgress] = useState(progress)

    const cancelModel = () => {
        setTaskInfo(false);
        setTaskProgress(progress);
    }

    const dragTask = e => e.dataTransfer.setData('taskId', taskId);

    const queryClient = useQueryClient()

    const { mutate, isLoading, error } = useMutation(updateProgress)
    const submitProgress = () => {
        const difSdSp = taskProgress === 0 ? differenceInSeconds(new Date(taskEndDate), new Date(taskStartDate)) : differenceInSeconds(new Date(), new Date(taskStartDate));
        mutate({ projectId, taskId, newProgress: taskProgress, difSdSp }, {
            onSuccess: (res) => {
                queryClient.invalidateQueries([`get-member-project-${projectId}-tasks`]);
                queryClient.invalidateQueries([`get-project-${projectId}`]);
                setTaskInfo(false);
            }

        })
    }

    return (
        <>
            {taskInfo &&
                <Model closeModel={cancelModel}>
                    <div className="model-container member-task-info">
                        <h2>{title}</h2>
                        <p className="description">{description}</p>
                        <span className='task-status'>Status <small>{status}</small> {status === 'in-progress' && `${taskProgress}%`}</span>
                        {status === 'in-progress' &&
                            <div className="progress">
                                <input type="range" className="range-input" value={taskProgress} onChange={({ target }) => setTaskProgress(prev => target.value)} />
                            </div>
                        }
                    </div>
                    <div className="model-functionalities">
                        <MainButton onClick={submitProgress} disabled={isLoading}>Done</MainButton>
                    </div>
                </Model>
            }
            <div
                onClick={() => setTaskInfo(true)}
                className='task'
                draggable
                onDragStart={dragTask}
            >
                <p>{title}</p>
                <span className="progress" style={{ width: `${taskProgress}%`}}></span>
                </div>
        </>
    )
}

