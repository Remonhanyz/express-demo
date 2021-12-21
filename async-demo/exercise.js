async function notifyCustomer() {
  const customer = await getCustomer(1)
  console.log('Customer: ', customer);
  if (customer.isGold) {
    const movies = getTopMovies()
    console.log('Top movies: ', movies);
    await sendEmail(customer.email, movies) //vim
    console.log('Email sent...')
  };
}
notifyCustomer()

function getCustomer(id) {
  return new Promise((resolve, reject) => { //vim
    setTimeout(() => {
      resolve({ 
      id: 1, 
      name: 'Mosh Hamedani', 
      isGold: true, 
      email: 'email' 
      })
    })
  }, 4000);  
}

function getTopMovies() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(['movie1', 'movie2']);
    }, 4000)
  })
}


function sendEmail(email, movies) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, 4000);
  })
}