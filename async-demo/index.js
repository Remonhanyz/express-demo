console.log('Before'); //appears 1st (sync)
const user = getUser(1);
console.log(user)
console.log('After'); //appears 2nd (sync)

// Callbacks
// Promises
// Async/await

function getUser(id) {
    setTimeout(()=> {
        console.log('Reading a user from database....')
        return {id: id, gitHubUsername: 'mosh'}
    }, 2000);
}