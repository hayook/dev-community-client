import { useState } from 'react'
import { useQueryClient, useMutation } from 'react-query';
import { useParams } from 'react-router-dom';
import { BsChevronDown } from 'react-icons/bs'
import { postTask } from '../../../app/api'
import ProjectMember from './ProjectMember';
import useProjectMembers from '../../../hooks/useProjectMembers'
import DatePicker from 'react-date-picker'
import MainButton from '../../components/main-button/MainButton';
import '../date-picker.css';

function dummyFunction(dateStart, dateEnd) {
    return Math.trunc(Math.abs(dateEnd - dateStart) / 3600000);
}

export default function CreateTaskForm({ setCreateTask }) {

    const { id: projectId } = useParams()
    const queryClient = useQueryClient()
    const projectData = queryClient.getQueryData([`get-project-${projectId}`])?.data[0];

    const { isLoading: isLoadingMembers, data: membersResponse, error: membersError } = useProjectMembers(projectId);

    const [showMembers, setShowMembers] = useState(false);
    const [currentMember, setCurrentMember] = useState({
        memberId: projectData.member_id,
        memberUsername: projectData.username,
        memberProfileImg: projectData.img_url,
    })
    const [task, setTask] = useState({
        title: '',
        description: '',
        type: 'test',
        startDate: new Date(),
        endDate: new Date(),
    })

    // Post a new task
    const { mutate, isLoading: isPosting } = useMutation(postTask)
    const submitTask = e => {
        e.preventDefault();
        const newTask = {
            task_title: task.title,
            task_description: task.description,
            task_type: task.type,
            member_id: currentMember.memberId,
        }
        console.log(task.startDate)
        console.log(task.endDate)
        console.log(dummyFunction(task.startDate, task.endDate))
        mutate({ projectId, task: newTask }, {
            onSuccess: () => {
                queryClient.invalidateQueries([`get-project-${projectId}-tasks`]),
                    setCreateTask(false);
            }
        })

    }

    const updateStartDate = date => {
        setTask(prev => ({ ...prev, startDate: date }));
    }

    const updateEndDate = date => {
        setTask(prev => ({ ...prev, endDate: date }));
    }

    return (
        <form onSubmit={submitTask} className="create-task">
            <div className='inputs'>
                <label>Title</label>
                <input type="text" className="main-input" value={task.title} onChange={({ target }) => setTask(prev => ({ ...prev, title: target.value }))} />
            </div>
            <div className='inputs'>
                <label>Description</label>
                <textarea row={4} className='main-textarea' value={task.description} onChange={({ target }) => setTask(prev => ({ ...prev, description: target.value }))} />
            </div>
            <div className="assignment">
                <button type='button' onClick={() => setShowMembers(prev => !prev)}>
                    <ProjectMember
                        memberId={currentMember.memberId}
                        memberUsername={currentMember.memberUsername}
                        memberImg={currentMember.memberProfileImg}
                    ><BsChevronDown className="drop-icon" style={{ transform: `${showMembers ? 'rotate(180deg)' : 'rotate(0)'}` }} /></ProjectMember>
                </button>
                {showMembers &&
                    <div className="members-list">
                        {membersResponse?.data?.map((member, idx) => {
                            return <button type="button"
                                key={idx}
                                onClick={() => {
                                    setCurrentMember(prev => (
                                        {
                                            memberId: member.member_id,
                                            memberUsername: member.username,
                                            memberProfileImg: member.img_url,
                                        }
                                    ))
                                    setShowMembers(false)
                                }}
                            >
                                <ProjectMember
                                    userId={member.user_id}
                                    memberUsername={member.username}
                                    memberImg={member.img_url}
                                />
                            </button>
                        })}
                    </div>
                }
            </div>
            <div className="task-dates">
                <div>
                    <label>Start Date</label>
                    <DatePicker value={task.startDate} onChange={updateStartDate} />
                </div>
                <div>
                    <label>End Date</label>
                    <DatePicker value={task.endDate} onChange={updateEndDate} />
                </div>
            </div>
            <MainButton disabled={isPosting}>Submit</MainButton>
        </form>
    )
}