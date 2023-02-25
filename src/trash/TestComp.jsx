import { useState } from "react";
import PrimaryModel from "../pages/components/kanban-board/components/PrimaryModel";

export default function TestComp() {

  const [model, setModel] = useState(true);
  const closeModel = () => setModel(false)

  if (model) return (
    <PrimaryModel closeModel={closeModel}>

    </PrimaryModel>
  )
}