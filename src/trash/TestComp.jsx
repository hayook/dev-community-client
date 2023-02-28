import { useState } from 'react';
import Main from '../pages/components/main/Main';
import './style.css'

export default function TestComp() {
  const [date, setDate] = useState();

  return (
    <Main>
      <input type="date" onChange={({ target }) => console.log(new Date(target.value))} />
    </Main>
  )
}