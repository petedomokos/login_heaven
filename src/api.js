
//mock
export const attemptLogin = (credentials) =>{
  return {jwt:'mockToken'}
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