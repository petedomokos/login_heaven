
//mock success
/*export const attemptLogin = (credentials) =>{
  return new Promise((resolve, reject) => {
    setTimeout(() =>{
      resolve({jwt:'mock token'});
    },1000)
  })
}
*/
//mock failure
export const attemptLogin = (credentials) =>{
   return new Promise((resolve, reject) => {
      setTimeout(() =>{
        resolve({error:'Username not recognised'});
      },1000)
   })
}

/*
export const attemptLogin = async (credentials) => {
  try {
      let response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}
*/