console.log('Before'); //appears 1st (sync)
getUser(1, getRepositories);
console.log('After'); //appears 2nd (sync)

function getRepositories(user) {
    getRepositories(user.gitHubUsername, getCommits)
}

function getCommits(repos) {
    getCommits(repos[0], displayCommits)
}

function displayCommits(commits) {
    console.log(commits)
}


function getUser(id, callback) {
    setTimeout(() => {
        console.log('Reading a user from database....')
        callback({id: id, gitHubUsername: 'mosh'})
    }, 2000);
}

function getRepositories(username, callback) { // this differs from the previous function withe same name as the arguments are different
    setTimeout(() => {
        callback(['repo1', 'repo2', 'repo3']);
    }, 2000);
}

//correction that should have been in the video
function getCommits(repo, callback) {
    setTimeout(() => {
        callback(['commit1', 'commit2', 'commit3']);
    }, 2000);
}