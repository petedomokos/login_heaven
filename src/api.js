
//mock success
export const attemptLogin = (credentials) =>{
  return {jwt:'mockToken'}
}
//mock failure
/*export const attemptLogin = (credentials) =>{
    return {error:'Username not recognised'}
}*/
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