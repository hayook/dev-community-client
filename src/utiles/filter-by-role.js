export const filterByRole = (arr, role) => {
    const roles = ['admin', 'member'];
    if (!roles.includes(role)) return arr; 
    return arr.filter(member => member.member_role.trim().toLowerCase() === role.trim().toLowerCase());
}