import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './scss/style.scss';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {gapi} from 'gapi-script'
import { useEffect } from 'react';
toast.configure()

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));
const Login = React.lazy(() => import('./containers/Userlogin'));
const Logout = React.lazy(() => import('./containers/logout'));

const CLIENT_ID="500600276612-mgjcluoljofc77q5nbdttqve1ma7pr7d.apps.googleusercontent.com"

export default function App() {

    useEffect(()=>{
      function start(){
        gapi.client.init({
          clientid:CLIENT_ID,
          scope:"https://www.googleapis.com/auth/bigquery"

        })
      };
      gapi.load('client:auth2', start)
    });

    //   var accessToken = gapi.auth.getToken();
    //   console.log(accessToken)

    return (
      <HashRouter>
          <React.Suspense fallback={loading}>
            <Switch>
              <Route path="/dashboard" name="Home" render={props => <TheLayout {...props}/>} />
              {/* <Route path="/login" name="Login" render={props => <Login {...props}/>} />
              <Route path="/logout" name="Logout" render={props => <Logout {...props}/>} /> */}
              <Route path="/" name="Home" render={props => <TheLayout {...props}/>} />
            </Switch>
          </React.Suspense>
      </HashRouter>
    );
  }

// export default App;
