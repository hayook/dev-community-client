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
import { endOfDay, differenceInSeconds, isSameDay } from 'date-fns';

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
        title: 'task',
        description: '',
        type: 'test',
        startDate: new Date(),
        endDate: endOfDay(new Date()),
    })

    // Post a new task
    const { mutate, isLoading: isPosting } = useMutation(postTask)
    const submitTask = e => {
        e.preventDefault();
        const taskNeededTime = differenceInSeconds(task.endDate, task.startDate);
        const newTask = {
            task_title: task.title,
            task_description: task.description,
            task_type: task.type,
            member_id: currentMember.memberId,
            task_start_date: task.startDate.toString(),
            task_end_date: task.endDate.toString(),
            task_needed_time: taskNeededTime,
        }
        mutate({ projectId, task: newTask }, {
            onSuccess: (res) => {
                queryClient.invalidateQueries([`get-project-${projectId}-tasks`]),
                    queryClient.invalidateQueries([`get-project-${projectId}`]),
                    setCreateTask(false);
            }
        })

    }

    const updateStartDate = date => {
        if (date === null) {
            setTask(prev => ({ ...prev, startDate: new Date() }))
            return;
        }
        if (isSameDay(date, new Date())) {
            setTask(prev => ({ ...prev, startDate: new Date() }))
        }
        if (date < new Date()) return;
        if (date > task.endDate) {
            setTask(prev => ({ ...prev, endDate: endOfDay(date), startDate: date }))
            return;
        }
        setTask(prev => ({ ...prev, startDate: date }));
    }

    const updateEndDate = date => {
        if (date === null) {
            setTask(prev => ({ ...prev, endDate: endOfDay(new Date()) }));
            return;
        }
        if (date < task.startDate) return;
        setTask(prev => ({ ...prev, endDate: endOfDay(date) }));
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