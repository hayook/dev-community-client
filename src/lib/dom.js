export function activateTab(ulRef, e, setTarget) {
    if (ulRef.current === e.target) return;

    const lis = [...ulRef.current.children]
    lis.forEach(li => li.classList.remove('active'))
    e.target.classList.add('active')
    setTarget(e.target.getAttribute('target'))
}

export function adjustInputHeight(element) {
    element.style.height = 'unset';
    element.style.height = `${element.scrollHeight + 2}px`;
    element.scrollTo({top: element.scrollHeight})
}

export async function updateQueryCache(queryClient, queryKey, newQueryData) {
    await queryClient.cancelQueries([queryKey]);
    queryClient.setQueryData([queryKey], oldQueryData => {
        return {
            ...oldQueryData,
            data: [...oldQueryData?.data, newQueryData]
        }
    })
}