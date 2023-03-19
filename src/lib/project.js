export const filterByRole = (arr, role) => {
    const roles = ['admin', 'member'];
    if (!roles.includes(role)) return arr;
    return arr.filter(member => member.member_role.trim().toLowerCase() === role.trim().toLowerCase());
}

export const isAdmin = (queryClient, projectId) => {
    const data = queryClient.getQueryData([`get-project-${projectId}`]).data[0]
    return data.member_role === 'admin';

}