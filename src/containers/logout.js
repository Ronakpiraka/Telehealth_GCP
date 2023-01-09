import {GoogleLogin, GoogleLogout} from 'react-google-login';
import {useHistory, useLocation} from "react-router-dom";

const clientid="500600276612-mgjcluoljofc77q5nbdttqve1ma7pr7d.apps.googleusercontent.com"

export default function Logout(){

const history = useHistory();

  const onSuccess =()=>{
    console.log("Successful Logout")
    var url = `/login`;
    history.push(`${url}`);
  }


  return(
    <div id="SignOutButton">
        <GoogleLogout
        clientId={clientid}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
        />
    </div>
  )
    
}

// export default Login();