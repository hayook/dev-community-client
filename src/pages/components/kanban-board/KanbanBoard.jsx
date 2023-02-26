import './style.css'

export default function KanbanBoard({ columns, dropTask, content, children }) {

    const hoveringTask = e => e.preventDefault();

    return (
        <div className="kanban-board">
            <div className="headings">
                {columns.map((column, idx) => <h2 className='column' key={idx}>{column}</h2>)}
            </div>
            <div className="content">
                {content || columns.map((column, idx) => {
                    return <div
                        key={idx} className='tasks-container column'
                        onDragOver={hoveringTask}
                        onDrop={e => dropTask(e, column)}
                    >
                        {children.filter(child => child.props.status === column)}
                    </div>
                })}
            </div>
        </div>
    )
}