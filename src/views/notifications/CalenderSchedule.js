import React, { useEffect } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import env from 'react-dotenv';
import { gapi } from 'gapi-script';
import axios from 'axios';

function AuthPage() {  
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: '500600276612-edtf6kqco3sg68nd7173s0re768mf93s.apps.googleusercontent.com',
        scope: 'email',
      });
    }

    gapi.load('client:auth2', start);
  }, []);


  // **you can access the token like this**
  // const accessToken = gapi.auth.getToken().access_token;
  // console.log(accessToken);

  const createEvent = () =>{

    var event = {
      'summary': 'Sample Event',
      'location': 'San Francisco, CA',
      'description': 'This is a sample event.',
      'start': {
        'dateTime': '2023-04-01T09:00:00-07:00',
        'timeZone': 'America/Los_Angeles'
      },
      'end': {
        'dateTime': '2023-04-01T10:00:00-07:00',
        'timeZone': 'America/Los_Angeles'
      },
      'reminders': {
        'useDefault': true
      }
    };

    const request = gapi.client.calendar.events.insert({
      calendarId: 'telehealthgcp@gmail.com',
      resource: event,
    });

    request.execute((event) => {
      console.log('Event created: ', event);
    });
  };

  const onSuccess = response => {
    console.log('SUCCESS', response);
    console.log('AccessToken', response.accessToken)
    const {code} = response
    axios.post('http://localhost:8000/create-tokens',{code})
    .then(resp=>{
      console.log(resp.data)
    })
    // sessionStorage.setItem('Calendar Token', response.accessToken)
  };
  const onFailure = response => {
    console.log('FAILED', response);
  };
  const onLogoutSuccess = () => {
    console.log('SUCESS LOG OUT');
  };

  return (
    <div>
      <GoogleLogin
        clientId='500600276612-edtf6kqco3sg68nd7173s0re768mf93s.apps.googleusercontent.com'
        onSuccess={onSuccess}
        onFailure={onFailure}
      />
      <GoogleLogout
        clientId='500600276612-edtf6kqco3sg68nd7173s0re768mf93s.apps.googleusercontent.com'
        onLogoutSuccess={onLogoutSuccess}
      />
    </div>
  );
}

export default AuthPage;