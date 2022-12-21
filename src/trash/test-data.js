export const projects = [{
    projectId: 1,
    projectTitle: 'this is an empty project',
    projectProgress: 0,
    projectOwner: { userId: 8 },
    projectMembers: [
        { userId: 8, userRole: 'admin' },
        { userId: 1, userRole: 'member' },
        { userId: 11, userRole: 'member' },
        { userId: 22, userRole: 'member' },
        { userId: 33, userRole: 'member' },
        { userId: 144, userRole: 'member' },
        { userId: 5411, userRole: 'member' },
        { userId: 1010, userRole: 'member' },
        { userId: 13726, userRole: 'member' },
        { userId: 2, userRole: 'member' },
        { userId: 3, userRole: 'admin' },
        { userId: 4, userRole: 'member' },
    ],
    projectTeams: [
        {
            id: 1946,
            name: 'team 1',
            teamLeader: { userId: 3 },
            teamMembers: [
                { userId: 3 }, 
                { userId: 144 },
                { userId: 5411 },
            ]
        },
        {
            id: 1947,
            name: 'team 2',
            teamLeader: { userId: 8 },
            teamMembers: [
                { userId: 8 }, 
                { userId: 22 },
                { userId: 1 },
                { userId: 33 },
            ]
        },
        {
            id: 1950,
            name: 'team 3',
            teamLeader: { userId: 13726 },
            teamMembers: [
                { userId: 13726 }, 
                { userId: 1010 },
            ]
        },
    ],
    recommandedMembers: [
        { userId: 555 },
        { userId: 666 },
        { userId: 777 },
        { userId: 888 },
    ],
}
]; 

export const users = [
    { userId: 555 },
    { userId: 65 },
    { userId: 888 },
    { userId: 424 },
    { userId: 3214 },
    { userId: 666 },
    { userId: 13 },
    { userId: 777 },
]

