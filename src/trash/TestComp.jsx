import useProject from '../hooks/useProject'

export default function TestComp() {

  const res = useProject(5)

  return <h1>test</h1>
}