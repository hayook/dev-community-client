
export default function PrimaryModel({ closeModel, children }) {

    const modelRef = useRef(null)
    
    const handleClick = e => {
        const control = e.target !== modelRef.current && !modelRef.current.contains(e.target);
        if (control) closeModel()
    }

    return (
        <div className="overlay" onClick={handleClick}>
            <div ref={modelRef} className="model">
                { children }
            </div>
        </div>
    )
}