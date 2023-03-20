import useProject from '../hooks/useProject'
import useTechnologies from '../hooks/useTechnologies'

export default function TestComp() {

  const res = useTechnologies();

  return <h1>test</h1>
}