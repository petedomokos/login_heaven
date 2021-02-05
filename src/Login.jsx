import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
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

  function handleChange(e) {
  }

  //await
  const handleSubmit = (e) => {
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
                      Login
                  </button>
              </div>
              {error && <div className={classes.error}>{error}</div>}
          </form>
      </div>
    );
}

Login.propTypes = {
}
Login.defaultProps = {
}

