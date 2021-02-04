import React, { useState } from 'react';
import PropTypes from 'prop-types';
//MUI
import { makeStyles } from '@material-ui/core/styles';
//helpers
import { attemptLogin } from './api';

//pass in site theme here
const useStyles = makeStyles(theme => ({
  root: {
  },
  error:{
  }
}));

export default function Login(props) {
  const classes = useStyles();
  //state
  const initStatus = {
      credentials:{username:'', password:''},
      attemptingLogin:false,
  }
  const [status, setStatus] = useState(initStatus);
  const [userJwt, setUserJwt] = useState('');
  //deconstruct
  const { username, password } = status.credentials;

  //user input
  const handleChange = (e) => {
      const { name, value } = e.target;
      setStatus(status => ({...status, credentials:{...status.credentials, [name]: value } }));
  }

  const handleSubmit = async (e) => {
      e.preventDefault();
      if (username && password) {
          setStatus(status => ({...status, attemptingLogin:true}))
          //api call
          const data = await attemptLogin(status.credentials);
          console.log('data', data)
          if(data.error){
            //add error (todo? could wipe pw too)
            //setStatus(status => {...status, attemptingLogin:false, error:data.error})
          }
          else{
            console.log('success', data)
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
  console.log('userJwt', userJwt)
  if(userJwt){
      //user is authenticated
      //redirect to Home page or referrer (defaults to '/')
      //home page can access token via storage (or via cookie or redux store, depending on implementation above)
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

