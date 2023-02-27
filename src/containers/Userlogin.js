import {GoogleLogin} from 'react-google-login';
import Logout from './logout'
import React , {useEffect, useState} from 'react'
import {useHistory, useLocation} from "react-router-dom";

const clientid="500600276612-mgjcluoljofc77q5nbdttqve1ma7pr7d.apps.googleusercontent.com"


export default function Login(){

  const history = useHistory();
  var access_token
  const [tokenClient, settokenClient] = useState({})
  const [data, setdata] = useState({});

  function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    sessionStorage.setItem("Accesstoken",response.credential)

    var url = `/dashboard`;
    history.push(`${url}`);
  }


  // function getToken() {
  //   tokenClient.requestAccessToken();
  //   // getObject();
  // } 

//   function getObject() {
//     var accessToken = sessionStorage.getItem("Accesstoken");
//     const dashboardData = fetch('https://bigquery.googleapis.com/bigquery/v2/projects/telehealth-365911/datasets/telehealth-365911.FHIR_Synthea/tables/telehealth-365911.FHIR_Synthea.Patient v3/data', {
//       method: 'GET',
//       mode: 'no-cors',
//       headers: {
//           'Authorization': 'Bearer ' + accessToken
//       }
//     })
//     .then(resp=>{
//         setdata(resp)
//         console.log(data)  
//       })
//     .catch(error => {
//       console.log(error)
//     });
// }

  useEffect(()=>{
    /*global google*/
    google.accounts.id.initialize({
      client_id: clientid,
      callback: handleCredentialResponse
    });
    google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "outline", size: "large" }  // customization attributes
    );
    google.accounts.id.prompt(); // also display the One Tap dialog

  // settokenClient(
  //   google.accounts.oauth2.initTokenClient({
  //     client_id: clientid,
  //     scope: 'email',
  //     prompt: '',
  //     callback: (tokenResponse) => {
  //         access_token = tokenResponse.access_token;
  //         console.log(access_token)
          
  //     },
  // }));
  },[])

  // console.log(tokenClient)
  // tokenClient.requestAccessToken();
  // console.log(data)


  return(
    <div>
      <div id="g_id_onload"
            data-client_id={clientid}
            data-context="signin"
            data-ux_mode="popup"
            data-login_uri="https://telehealth-365911.uc.r.appspot.com/#/login"
            data-nonce=""
            data-auto_prompt="false">
        </div>
       <div className="g_id_signin"
          data-type="standard"
          data-shape="pill"
          data-theme="filled_blue"
          data-text="signin_with"
          data-size="large"
          data-logo_alignment="left">
      </div>

      {/* <button onClick={getToken}>Get access token</button> */}
       {/* <button onClick={getObject}>Load Object</button> */}
    </div>

  )
    
}

// export default Login();