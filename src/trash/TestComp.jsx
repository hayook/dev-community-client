import { useState } from 'react';
import Main from '../pages/components/main/Main'


export default function TestComp() {

  const [dark, setDark] = useState(true);

  const handleTheme = e => setDark(prev => !prev);

  return (
    <Main>
      <Show when={dark}>
        <h1>Dark</h1>
      </Show>
      <Show when={!dark}>
      <h1>Light</h1>
      </Show>

      <button className="main-button" onClick={handleTheme}>Switch</button>
    </Main>
  )
}


function Show({ children, when }) {
  if (when) return children;
}