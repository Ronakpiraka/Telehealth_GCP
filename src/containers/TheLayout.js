import React from 'react'
import {
  TheContent,
  TheSidebar,
  TheFooter,
  TheHeader,
} from './index';
import TheContent1 from './TheContent1'
import { useLocation, Route } from "react-router-dom";
import Appointment from 'src/views/notifications/appointments';

const Login = React.lazy(() => import('./Userlogin'));

const TheLayout = () => {

  const name = sessionStorage.getItem('Patient_name')
  const Authenticated = sessionStorage.getItem('IsAuthenticated')
  console.log("Layt", Authenticated)
  const location = useLocation();
  // let paramString = location.search.split('mabc=')[1];
  console.log(name)

  let paramString = location.search.split("?")[1];
  console.log(paramString);


  return (
    <div>
      {Authenticated ? (
      <div className="c-app c-default-layout">
        { name === null && Authenticated && ( <TheSidebar/>) }
        <div className="c-wrapper">
          <TheHeader/>
            <div className="c-body">
              <TheContent/>
            </div>
          <TheFooter/>
        </div>
      </div>
      )
      :
      <div>
        {/* {paramString ? 
        <Route path="/login" to="/login"  name="Login" render={props => <Login {...props}/>} />
        : */}
        <div className="c-wrapper">
         <TheHeader Authenticated={Authenticated}/>
           <div className="c-body">
             <TheContent1/>
           </div>
           <TheFooter/>
        </div>
        {/* } */}
        {/* <Route path="/bookAppointment" to="/bookAppointment"  name="Appointment Booking" render={props => <Appointment {...props}/>} /> */}
      </div>
      }
    </div>
  )
}

export default TheLayout
