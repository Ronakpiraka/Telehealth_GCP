import {GoogleLogin, GoogleLogout} from 'react-google-login';
import {useHistory, useLocation} from "react-router-dom";

// const clientid="500600276612-mgjcluoljofc77q5nbdttqve1ma7pr7d.apps.googleusercontent.com"

export default function Logout(){

const history = useHistory();

  const onSuccess =()=>{
    console.log("Successful Logout")
    sessionStorage.removeItem('Patient_name')
    sessionStorage.removeItem('IsAuthenticated')
    localStorage.clear();
    var url = `/login`;
    history.push(`${url}`);
  }


  return(
    <div id="SignOutButton">
        <a onClick={onSuccess} href="">Logout</a>
    </div>
  )
    
}

// export default Login();