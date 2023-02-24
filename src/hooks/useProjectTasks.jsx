import { useQuery } from "react-query";
import { getProjectTasks } from '../app/api'

export default function useProjectTasks(projectId) {
    return useQuery([`get-project-${projectId}-tasks`], () => getProjectTasks(projectId), {
        // onSuccess: res => console.log(res),
    })
}