// Asynchronous
console.log('Before'); //appears 1st (sync)
getUser(1, (user) => {
    getRepositories(user.gitHubUsername, (repos) => {
        getCommits(repo, (commits) => {
            //Callback Hell
        })
    })
});
console.log('After'); //appears 2nd (sync)

// Synchronous
console.log('Before');
const user = getUser(1);
const repos = getRepositories(user.gitHubUsername);
const commits = getCommits(repos[0])
console.log('After');


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
