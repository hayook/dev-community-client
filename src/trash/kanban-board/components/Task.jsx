import { useState } from 'react'
import { AiOutlineSetting, AiOutlineCheck } from 'react-icons/ai'
import PrimaryModel from './PrimaryModel'

export default function Task({ taskId, title, status }) {

    const [taskInfo, setTaskInfo] = useState(false)

    const closeModel = () => setTaskInfo(false)

    const dragTask = e => e.dataTransfer.setData('taskId', taskId);

    return (
        <>
            {taskInfo &&
                <PrimaryModel closeModel={closeModel}>
                    <div className="member-task-info">
                        <h2>title</h2>
                        <p className="description">lorem500 Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt obcaecati repudiandae neque recusandae eius reiciendis pariatur quod. Corporis delectus nemo et enim unde voluptatibus, ea hic quos rem tenetur at sint dolor porro? Ipsum assumenda voluptates hic molestiae error, deleniti adipisci repellat aliquid eos tempore id. Quasi doloremque distinctio dolores?</p>

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

