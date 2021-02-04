import React, { useState } from 'react';
//MUI
import { makeStyles } from '@material-ui/core/styles';

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
  const password = '';
  const [credentials, setCredentials] = useState({username:'', password:''});

  //user input
  function handleChange(e) {
      const { name, value } = e.target;
      setCredentials(credentials => ({ ...credentials, [name]: value }));
  }
  //user submit
  const handleSubmit = (e) => {
  }

  return (
      <div className={classes.root}>
          <h2>Login</h2>
          <form name="form" onSubmit={handleSubmit}>
              <div>
                  <label>Username</label>
                  <input type="text" name="username" value={credentials.username} onChange={handleChange} />
              </div>
              <div>
                  <label>Password</label>
                  <input type="password" name="password" value={credentials.password} onChange={handleChange} />
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
}
Login.defaultProps = {
}

