
const p1 = Promise((resolve, reject) => {
    setTimeout(() => {
        console.log("Async opreration 1...")
        resolve(1)
    }, 2000)
})

const p2 = Promise((resolve, reject) => {
    setTimeout(() => {
        console.log("Async opreration 2...")
        resolve(2)
    }, 2000)
})

const p3 = Promise((resolve, reject) => {
    setTimeout(() => {
        console.log("Async opreration 3...")
        reject(new Error('something went wrong'))
    }, 2000)
})

Promise.all([p1, p2, p3]) //returns an new promise that is resolved when the two promises (running in parallel) are resolved (result is an array of all the fulfilled promises)
    .then(result => console.log(result))
    .catch(err => consolee.log('Error', err.message)) //if one promise is rejected the whole code (the other 2 promises) is considered rejected
    
Promise.race([p1, p2, p3]) //returns a Promise that is resolved or rejected when any of the provided Promises are resolved or rejected. (the result isn't an array but the value of 1st fulfilled promise only)
    .then(result => console.log(result))
    .catch(err => consolee.log('Error', err.message))