export const isAdmin = (queryClient, projectId) => {
    const data = queryClient.getQueryData([`get-project-${projectId}`]).data[0]
    return data.member_role === 'admin';

}