export default function MainButton({ disabled, children, ...rest }) {
    return (
        <button { ...rest } className={`main-button ${disabled ? 'disabled' : ''}`}>{ children }</button>
    )
}