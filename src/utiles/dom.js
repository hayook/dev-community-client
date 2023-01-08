export function activateTab(ulRef, e) {
    if (ulRef.current === e.target) return;

    const lis = [...ulRef.current.children]
    lis.forEach(li => li.classList.remove('active'))
    e.target.classList.add('active')
}