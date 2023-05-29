import React, { useState } from 'react';
import './LoginPage.css'; // Import CSS file for the login page styles
import {useHistory, useLocation} from "react-router-dom";
import { useContext } from 'react';
// import {UserContext} from '../App';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(false)
  const history = useHistory();

  const REACT_APP_LOGIN_USERNAME = process.env.REACT_APP_LOGIN_USERNAME;
  const REACT_APP_LOGIN_PASS = process.env.REACT_APP_LOGIN_PASS;

  // console.log(REACT_APP_LOGIN_USERNAME,REACT_APP_LOGIN_PASS)

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = (event) => {
    event.preventDefault();

    if (username === REACT_APP_LOGIN_USERNAME && password === REACT_APP_LOGIN_PASS) {
      // Authentication successful, navigate to dashboard or another page
      alert("Login successful");
      sessionStorage.setItem('IsAuthenticated',"true");
      var url = '/dashboard'; // Replace with your navigation logic
      history.push(`${url}`);
    } else {
      // Authentication failed, display error message or perform other actions
      alert('Login failed')
    }
  };

  return (
    <div className="login-container">
      <h1>Telehealth Login</h1>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            className="form-control"
          />
        </div>
        <div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
