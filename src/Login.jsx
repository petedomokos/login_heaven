import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
//helpers
import { attemptLogin } from './api';

//pass in site theme here
const useStyles = makeStyles(theme => ({
  root: {
  },
  error:{
    color:'red'
  }
}));

export default function Login(props) {
  const classes = useStyles();
  //state
  const initStatus = {
      credentials:{username:'', password:''},
      attemptingLogin:false,
      error:'',
      nrOfAttempts:0
  }
  const [status, setStatus] = useState(initStatus);
  const [userJwt, setUserJwt] = useState('');
  //deconstruct
  const { credentials, attemptingLogin, error, nrOfAttempts } = status;
  const { username, password } = credentials;

  //user input
  const handleChange = (e) => {
      const { name, value } = e.target;
      setStatus(status => ({...status, credentials:{...status.credentials, [name]: value } }));
  }

  const handleSubmit = async (e) => {
      e.preventDefault();
      if (username && password) {
          setStatus(status => ({...status, attemptingLogin:true, nrOfAttempts:nrOfAttempts + 1}))
          //api call
          const data = await attemptLogin(status.credentials);
          console.log('data', data)
          if(data.error){
            //add error and reset attemptingLogin and password
            const updatedCredentials = {...credentials, password:''}
            setStatus(status => ({...status, attemptingLogin:false, error:data.error, credentials:updatedCredentials}));
          }
          else{
            //reset attemptingLogin
            setStatus(status => ({...status, attemptingLogin:false}));
            //if no error, then data will contain a JWT token (assumed back-end implemtation)
            //store user jwt token in session storage 
            //note alternative options: (a) could use redux store but no need,
            // or (b) could use Route to get to Home instead, and pass user to Home as props -but only if
            //this component was to be integrated with app, rather than standalone login
            if (typeof window !== "undefined"){
              sessionStorage.setItem('jwt', JSON.stringify(data.jwt))
              //update token in component state to trigger re-render and hence Redirect
              setUserJwt(data.jwt)
            }
          }
      }else{
        alert('Please provide a username and password.')
      }
  }
  if(userJwt){
      //user is authenticated
      //if integrated with app, then redirect to Home page or referrer (defaults to '/')
      //if standalone, then consider options -> server can store jwt token so it is accessible from other apps (ie for single sign-on)
      //for now, a mock Home page
      //home page, and other pages, can access token via session storage
      return(<MockHome/>)
  }

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
                      Submit
                  </button>
              </div>
              {attemptingLogin && <div className={classes.error}>Attempting login...</div>}
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

const MockHome = () => {
  return (
    <div>Home page</div>
    )
}


