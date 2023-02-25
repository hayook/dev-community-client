import { useState } from 'react'
import { AiOutlineSetting, AiOutlineCheck } from 'react-icons/ai'

export default function TaskV1({ taskId, title, status }) {

    const [taskProgress, setTaskProgress] = useState(43);
    const [settingProgress, setSettingProgress] = useState(false)

    const dragTask = e => e.dataTransfer.setData('taskId', taskId);

    const submitProgress = () => {
        setSettingProgress(prev => !prev)
        if (taskProgress === 100) return; // set the status to be completed
    }

    const handleProgress = e => {
        if (!settingProgress) return;
        setTaskProgress(e.target.value)
    }

    return (
        <>
            <div
                onClick={() => console.log('task clicked')}
                className='task'
                draggable={!settingProgress}
                onDragStart={dragTask}
            >
                <p>{title}</p>
                {status === 'in-progress' && (
                    <>
                        <button className="set-progress-btn" onClick={submitProgress}>
                            <small>{taskProgress}%</small>
                            <span>{settingProgress ? <AiOutlineCheck /> : <AiOutlineSetting />}</span>
                        </button>
                        <span className='progress' style={{ width: `${taskProgress}%` }}></span>
                        <input onChange={handleProgress} className='range-input' type="range" value={taskProgress} />
                    </>

                )}
            </div>
        </>
    )
}