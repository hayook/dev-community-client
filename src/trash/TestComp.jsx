import { useState } from "react";
import Model from "../pages/components/model/Model";

export default function TestComp() {

  const [model, setModel] = useState(true);
  const closeModel = () => setModel(false)

  if (model) return (
    <Model closeModel={closeModel}>
      <button>click</button>
    </Model>
  )
}