export function activateTab(ulRef, e, setTarget) {
    if (ulRef.current === e.target) return;

    const lis = [...ulRef.current.children]
    lis.forEach(li => li.classList.remove('active'))
    e.target.classList.add('active')
    setTarget(e.target.getAttribute('target'))
}