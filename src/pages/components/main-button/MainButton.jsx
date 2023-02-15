export default function MainButton({ disabled, children, ...rest }) {
    return (
        <button { ...rest } className={`main-button ${disabled ? 'disabled' : ''}`} disabled={disabled}>{ children }</button>
    )
}