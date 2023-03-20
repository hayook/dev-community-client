import { useMemo, useState, useRef } from "react";
import { useMutation } from "react-query"
import { api } from '../app/api';
import ChipsInput from '../pages/components/chips-input/ChipInput'
import Main from '../pages/components/main/Main'
import Model from '../pages/components/model/Model'
import useTechnologies from '../hooks/useTechnologies'
import Show from '../pages/components/show/Show'

const setUserTechs = async (body) => api.put('/user_technologies', body);

export default function TestComp() {

  const ulRef = useRef(null);

  const [userTechnologies, setUserTechnologies] = useState([]);
  const [selectedTech, setSelectedTech] = useState(null);
  const closeModel = () => setSelectedTech(null);

  const { data: response } = useTechnologies();

  const techs = useMemo(() => {
    if (response) {
      return response?.data.map(tech => ({ id: tech.technology_id, name: tech.technology_name.toUpperCase() }));
    }
  }, [response])


  const { mutate, isLoading } = useMutation(setUserTechs);
  const handleSubmit = e => {
    e.preventDefault();

    const skills = {}
    userTechnologies.forEach(tech => {
      skills[tech.id] = tech.level;
    })

    const body = { user_skills: skills };
    mutate(body, {
      onSuccess: res => console.log(res)
    })
  }

  const selectTechnology = chip => {
    setSelectedTech(prev => chip)
  }

  const removeTechnology = id => {
    setUserTechnologies(prev => prev.filter(tech => tech.id !== id));
  }

  const submitLevel = e => {
    if (e.target === ulRef.current) return;
    setUserTechnologies(prev => [...prev, { ...selectedTech, level: Number(e.target.getAttribute('target')) }])
    closeModel();
  }

  return (
    <Main>
      <form className="create-task" onSubmit={handleSubmit}>
        <Show when={selectedTech !== null}>
          <Model closeModel={closeModel}>
            <div className="model-heading">
              <h2>{selectedTech?.name}</h2>
            </div>
            <div className="model-container">
              <ul ref={ulRef} className="importance-levels" onClick={submitLevel}>
                <li className="level active" target="1">Low</li>
                <li className="level" target="2">Intermediate</li>
                <li className="level" target="3">Experienced</li>
                <li className="level" target="4">High</li>
                <li className="level" target="5">Expert</li>
              </ul>
            </div>
          </Model>
        </Show>

        <ChipsInput
          placeholder='eg. C++, GO'
          options={techs}
          chips={userTechnologies}
          onSelect={selectTechnology}
          onRemove={removeTechnology}
        />
        <button className="main-button">Submit</button>
      </form>
    </Main>
  )
}