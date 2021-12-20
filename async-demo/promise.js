const p = new Promise((resolve, reject) => {
    // Async code here
    setTimeout(() => {
        resolve(1) // result of the async code if succeded (eg: 1) 
        // reject(new Error('message')) //if the async returns error
    }, 2000)
})

p
    .then(result => console.log('Result', result))
    .catch(err => console.log('Error', err.message))