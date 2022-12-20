export const filterByRole = (arr, filter) => {
    if (filter === 'all') return arr; 
    return arr.filter(member => member.userRole.trim().toLowerCase() === filter.trim().toLowerCase())
}