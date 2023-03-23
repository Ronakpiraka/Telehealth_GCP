import React from 'react'
import Calender from './calendar.jsx'
import {GoogleLogin} from 'react-google-login'

export default function CalenderSchedule() {
  const responseGoogle=response=>{
    console.log(response)
  }
  const responseError=error=>{
    console.log(error)
  }
  return (
    <div>
      <div id='schedule'>
        <div id='loader'>Loading....</div>
      </div>
      <div>
        <GoogleLogin 
        clientId='500600276612-edtf6kqco3sg68nd7173s0re768mf93s.apps.googleusercontent.com'
        buttonText='Sign in & Authorise Calendar'
        onSuccess={responseGoogle}
        onFailure={responseError}
        cookiePolicy={'single_host_origin'}
        responseType='code'
        accessType='offline'
        scope='openid email profile https://www.googleapis.com/auth/calendar'
        />
       
      </div>
    </div>
  )
}
