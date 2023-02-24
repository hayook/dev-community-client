import { useState } from 'react'
import { AiOutlineSetting, AiOutlineCheck } from 'react-icons/ai'
import PrimaryModel from './PrimaryModel'

export default function Task({ taskId, title, status, description }) {

    const [taskInfo, setTaskInfo] = useState(false)

    const closeModel = () => setTaskInfo(false)

    const dragTask = e => e.dataTransfer.setData('taskId', taskId);

    return (
        <>
            {taskInfo &&
                <PrimaryModel closeModel={closeModel}>
                    <div className="member-task-info">
                        <h2>{ title }</h2>
                        <p className="description">{ description }</p>

                        {status === 'in-progress' &&
                            <div className="progress">
                                <span>progress 100%</span>
                                <input type="range" className="range-input"/>
                            </div>
                        }
                        <button className='main-button'>Done</button>
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

