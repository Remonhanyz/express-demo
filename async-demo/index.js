console.log('Before'); //appears 1st (sync)

getUser(1, (user) => {
    console.log('user', user)

    getRepositories(user.gitHubUsername, (repos) => {
        console.log('Repos', repos)
    })
});

console.log('After'); //appears 2nd (sync)

function getUser(id, callback) {
    setTimeout(() => {
        console.log('Reading a user from database....')
        callback({id: id, gitHubUsername: 'mosh'})
    }, 2000);
}

function getRepositories(username, callback) {
    setTimeout(() => {
        callback(['repo1', 'repo2', 'repo3']);
    }, 2000);
}
