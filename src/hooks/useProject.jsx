import { useQuery } from "react-query";

const getProjectById = (projectId) => fetch(`http://localhost:3000/projects/${projectId}`).then(res => res.json())

export default function useProject(projectId) {
    return useQuery([`get-project-${projectId}`], () => getProjectById(projectId));
}