import { useQuery } from "react-query";
import { getMemberTasks } from '../app/api'


export default function useMemberTasks(projectId) {
    return useQuery([`get-member-project-${projectId}-tasks`], () => getMemberTasks(projectId), {
        onSuccess: res => console.log(res),
    });
}