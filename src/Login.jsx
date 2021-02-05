import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
//MUI
import { makeStyles } from '@material-ui/core/styles';

import { attemptLogin } from '/api';

//pass in site theme here
const useStyles = makeStyles(theme => ({
  root: {
  },
  error:{
  }
}));

export default function Login(props) {
  const classes = useStyles();
  const initStatus = {
    credentials:{username:'', password:''},
    attemptingLogin:false,
    error:'',
    nrOfAttempts:0
  }
  const [status, setStatus] = useState(initStatus);
  const [userToken, setUserToken] = useState('');

  function handleChange(e) {
      const { name, value } = e.target;
      const updatedCredentials = { ...credentials, [name]: value };
      //update credentials and remove error message
      setStatus(status => {...status, credentials:updatedCredentials, error:''})
  }

  //await
  const handleSubmit = async (e) => {
      e.preventDefault();

      if (username && pw) {
          setStatus(status => {...status, attemptingLogin:true, nrOfAttempts:status.nrOfAttempts + 1})
          const data = await attemptLogin(credentials)
          if(data.error){
            //add error (todo? could wipe pw too)
            setStatus(status => {...status, attemptingLogin:false, error:data.error})
          }
          else{
            //if no error, then data will contain a JWT token (assumed back-end implemtation)
            //store user token in session storage (note: could use redux store)
            // or could use Route to get to Home instead, and pass user to Home as props
            if (typeof window !== "undefined"){
              sessionStorage.setItem('jwt', JSON.stringify(jwt))
              //update token in component state to trigger re-render and Redirect
              setUserToken(data.jwt)
            }
          }
      }else{
        alert('Please provide a username and password.')
      }
  }
   if(userToken){
      //do we need to check isAuthenticated - should be checked already?
      //user is authenticated
      //redirect to Home page or referrer (defaults to '/')
      //home page can access token via storage (or via cookie or redux store, depending on implementation above)
      return(<Redirect to={referrerUrl} />);
  }

  //todo - handle nrOfAttempts at max limit
  return (
      <div className={classes.root}>
          <h2>Login</h2>
          <form name="form" onSubmit={handleSubmit}>
              <div>
                  <label>Username</label>
                  <input type="text" name="username" value={username} onChange={handleChange} />
              </div>
              <div>
                  <label>Password</label>
                  <input type="password" name="password" value={password} onChange={handleChange} />
              </div>
              <div>
                  <button>
                      Login
                  </button>
              </div>
              {error && <div className={classes.error}>{error}</div>}
          </form>
      </div>
    );
}

Login.propTypes = {
  referrerUrl:PropTypes.string
}
Login.defaultProps = {
  referrerUrl:'/'
}

