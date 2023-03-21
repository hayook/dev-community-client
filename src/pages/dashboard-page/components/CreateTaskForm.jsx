import { useState, useRef, useMemo } from 'react'
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
import ChipsInput from '../../components/chips-input/ChipInput'
import Model from '../../components/model/Model'
import Show from '../../components/show/Show'
import useTechnologies from '../../../hooks/useTechnologies'
import { getSuggestedMember } from '../../../app/api'
import Spinner from '../../components/spinner/Spinner';

export default function CreateTaskForm({ setCreateTask }) {

    const ulRef = useRef(null)

    const { id: projectId } = useParams()
    const queryClient = useQueryClient()
    const projectData = queryClient.getQueryData([`get-project-${projectId}`])?.data[0];

    const { isLoading: isLoadingMembers, data: membersResponse } = useProjectMembers(projectId);
    const { isLoading: isLoadingTechs, data: response } = useTechnologies();

    const techs = useMemo(() => {
        if (!!response) {
            return response?.data.map(tech => ({ id: tech.technology_id, name: tech.technology_name.toUpperCase() }));
        }
    }, [response]);

    const [showMembers, setShowMembers] = useState(false);
    const [taskTechnologies, setTaskTechnologies] = useState([]);
    const [selectedTech, setSelectedTech] = useState(null);
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
    const closeModel = () => setSelectedTech(null);

    // Post a new task
    const { mutate, isLoading: isPosting } = useMutation(postTask)
    const submitTask = e => {
        e.preventDefault();
        const skillsObj = {};
        taskTechnologies.forEach(tech => {
            skillsObj[tech.id] = tech.level;
        })

        const taskNeededTime = differenceInSeconds(task.endDate, task.startDate);
        const newTask = {
            task_title: task.title,
            task_description: task.description,
            task_type: task.type,
            member_id: currentMember.memberId,
            task_start_date: task.startDate.toString(),
            task_end_date: task.endDate.toString(),
            task_needed_time: taskNeededTime,
            task_skills: skillsObj,
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

    const selectChip = chip => setSelectedTech(chip);
    const removeChip = id => setTaskTechnologies(prev => prev.filter(chip => chip.id !== id));

    const submitLevel = e => {
        if (e.target === ulRef.current) return;
        setTaskTechnologies(prev => [...prev, { ...selectedTech, level: Number(e.target.getAttribute('target')) }])
        closeModel();
    }

    const { mutate: mutateAutoAssign, isLoading } = useMutation(getSuggestedMember);
    const autoAssign = () => {
        const techObj = {};
        taskTechnologies.forEach(tech => {
            techObj[tech.id] = tech.level;
        })
        const body = { task_skills: techObj };
        mutateAutoAssign({ body, projectId }, {
            onSuccess: res => {
                console.log(res);
                setCurrentMember(prev => ({ memberId: res?.data?.user_id, memberUsername: res?.data?.username, memberProfileImg: res?.data?.img_url }))
            }
        })
    }

    if (isLoadingMembers || isLoadingTechs) return <Spinner dim='30px' />
    return (
        <form onSubmit={submitTask} className="create-task">
            <Show when={selectedTech !== null}>
                <Model closeModel={closeModel}>
                    <div className="model-heading">
                        <h2>{selectedTech?.name}</h2>
                    </div>
                    <div className="model-container">
                        <ul ref={ulRef} className="importance-levels" onClick={submitLevel}>
                            <li className="level active" target="1">Novice</li>
                            <li className="level" target="2">Beginner</li>
                            <li className="level" target="3">Intermediate</li>
                            <li className="level" target="4">Advanced</li>
                            <li className="level" target="5">Expert</li>
                        </ul>
                    </div>
                </Model>
            </Show>

            <div className='inputs'>
                <label>Title</label>
                <input type="text" className="main-input" value={task.title} onChange={({ target }) => setTask(prev => ({ ...prev, title: target.value }))} />
            </div>
            <div className='inputs'>
                <label>Description</label>
                <textarea row={4} className='main-textarea' value={task.description} onChange={({ target }) => setTask(prev => ({ ...prev, description: target.value }))} />
            </div>
            <div className="inputs">
                <label>Task Technologies</label>
                <ChipsInput
                    options={techs}
                    placeholder="eg. C++, Go"
                    chips={taskTechnologies}
                    onSelect={selectChip}
                    onRemove={removeChip}
                />
            </div>
            <button onClick={autoAssign} className='link-button' type='button'>Auto Assign</button>
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