import useCurrentProjects from '../../../../hooks/useCurrentProjects'
import ProjectShowcase from './ProjectShowcase'
import Spinner from '../../spinner/Spinner'

export default function CurrentProjects() {

    const { isLoading, data:response, error } = useCurrentProjects();
    if (isLoading) return <Spinner dim='30px' />
    if (response.ok && 'data' in response) {
        if (!response.data.length) return <p style={{ marginInline: 'auto' }} >No Projects</p>
        return (
            response.data.map(project => <ProjectShowcase key={project.project_id} projectId={project.project_id} projectTitle={project.project_name} />)
        )
    }
    if (!response.ok) return <h1>{ response.status }</h1>
    return <h1>Error { error?.message }</h1>
}