console.log('Before'); //appears 1st (sync)

// Promise based approach
// getUser(1)
//     .then(user => getRepositories(user.gitHubUsername)) // .then to getUser()
//     .then(repos => getCommits(repos[0])) // .then to getRepositories()
//     .then(commits => console.log('Commits', commits))
//     .catch(err => console.log('Error', err.message))

// Async & await 
async function displayCommits() {
    try {
        const user = await getUser(1)
        const repos = await getRepositories(user.gitHubUsername)
        const commits = await getCommits(repos[0])
        console.log(commits)
    }
    catch (err) {
        console.log('Error', err)
    }
}
displayCommits()

console.log('After'); //appears 2nd (sync)

function getUser(id) {
    return new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('Reading a user from database....')
        resolve({id: id, gitHubUsername: 'mosh'})
    }, 2000)});
}

function getRepositories(username) { // this differs from the previous function withe same name as the arguments are different
    return new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(['repo1', 'repo2', 'repo3']);
    }, 2000)});
}

//correction that should have been in the video
function getCommits(repo) {
    return new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(['commit1', 'commit2', 'commit3']);
    }, 2000)});
}