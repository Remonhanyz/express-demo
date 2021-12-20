
const p = Promise.resolve({id: 1}) // returns a promise that is already resolved (usefull in unit testing)
p.then(result => console.log(result))

const p = Promise.reject(new Error('reason for rejection...')) // returns a promise that is already resolved (usefull in unit testing)
p.catch(err => console.log(err))