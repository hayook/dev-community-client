export const filterByRole = (arr, role) => {
    const roles = ['admin', 'member'];
    if (!roles.includes(role)) return arr; 
    return arr.filter(member => member.userRole.trim().toLowerCase() === role.trim().toLowerCase());
}