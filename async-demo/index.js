console.log('Before'); //appears 1st (sync)
setTimeout(()=> {
    console.log('Reading a user from database....')
}, 2000); //appears 3rd (Async)
console.log('After'); //appears 2nd (sync)
