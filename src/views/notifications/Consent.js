import React, { useEffect, useRef, useState } from 'react'
import Radio from '@mui/material/Radio';
import "../records/patients.css";
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Button } from 'antd';
import { useHistory, useLocation } from "react-router-dom";
import SignatureCanvas from 'react-signature-canvas';
import ReactDOM from 'react-dom';
import styles from './Consent.css'
import Signature from './signature'

export default function RadioButtonsGroup() {
   
    const history = useHistory();
    const [modal, setModal] = useState(false);

    const toggle = ()=>{
      setModal(!modal);
    }

    const senddata = () => {
        var myHeaders = new Headers();
        // var accessToken = sessionStorage.getItem('Accesstoken')
        // console.log(accessToken)
        // alert(accessToken)
        //   myHeaders.append("Authorization", "Bearer "+ accessToken);
          myHeaders.append("Content-Type", "application/json");
          
          var raw = JSON.stringify({
              "Patient_id": "003abc72-a814-4a81-bff1-ce6a54b0ce39",
              "App_Date": "2023-02-27",
              "Provider_id": "80e919cc-df1a-3838-b75e-541564a286e5",
              "Provider_name": "COTTAGE HOSPITAL",
              "Time_9_AM_10_AM": false,
              "Time_10_AM_11_AM": false,
              "Time_11_AM_12_PM": false,
              "Time_12_PM_1_PM": true,
              "Time_1_PM_2_PM": false,
              "Time_2_PM_3_PM": false,
              "Time_3_PM_4_PM": false,
              "Time_4_PM_5_PM": false,
              "Condition_code": "44465007",
              "Condition_name": "Sprain of ankle",
              "Patient_name": "Ms. Komal Kekare",
              "Practitioner_id": "0000016d-3a85-4cca-0000-000000000226",
              "Practitioner_name": "Dr. Leela",
              "Practitioner_Speciality": "Orthopedic Specialist",
              "MRN": "003abc72-a814-4a81-bff1-ce6a54b0ce39",
              "practitioner_email": "Lanny564.Huels583@example.com",
              "provider_contact_number": "508-228-1200",
              "Appointment_Status": "Pending",
              "Consent_form_choice": "True Partial",
              "Connected_Care_Status": false
          });
    
          // {
          //   "App_Date": "2001-01-01",
          //   "Provider_id": "80e919cc-df1a-3838-b75e-541564a286e5",
          //   "Provider_name": "NANTUCKET COTTAGE HOSPITAL",
          //   "Time_9_AM_10_AM": false,
          //   "Time_10_AM_11_AM": false,
          //   "Time_11_AM_12_PM": false,
          //   "Time_12_PM_1_PM": false,
          //   "Time_1_PM_2_PM": false,
          //   "Time_2_PM_3_PM": true,
          //   "Time_3_PM_4_PM": false,
          //   "Time_4_PM_5_PM": false,
          //   "Condition_code": "44465007",
          //   "Condition_name": "Sprain of ankle",
          //   "Patient_name": "Ms. Renda  Kessler",
          //   "Patient_id": "003abc72-a814-4a81-bff1-ce6a54b0ce39",
          //   "Practitioner_id": "0000016d-3a85-4cca-0000-000000000226",
          //   "Practitioner_Speciality": "Orthopedic Specialist",
          //   "Practitioner_name": "Dr. Lanny Huels",
          //   "MRN":"003abc72-a814-4a81-bff1-ce6a54b0ce39",
          //   "provider_contact_number":"508-228-1200",
          //   "practitioner_email":"Lanny564.Huels583@example.com"
          // }
          
          var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw
          };
          
          fetch("https://function-2-sh4iojyb3q-uc.a.run.app", requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result);
                // setModal(!modal);
                // console.log(modal); 
            })
            
            .catch(error => console.log('error', error));
      }
    
    const redirecttoEmail= () => {
        senddata()
            // setModal(!modal);
            // console.log(modal);  
            var url = `/notifications/email`;
            history.push(`${url}`);
        
     }
     
            return (
            <><FormControl>
                <FormLabel id="demo-radio-buttons-group-label"><b>Consent Form</b></FormLabel>
                <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="I dont"
                name="radio-buttons-group"
            >
                <FormControlLabel value="true" control={<Radio />} label="I give my consent to share my EHR records with practitioner as well as provider ." />
                <FormControlLabel value="true partial" control={<Radio />} label="I give my consent to share my EHR records with practitioner as well as provider for a period of 15 days prior to the completion of my appointment . " />
                <FormControlLabel value="false" control={<Radio defaultValue="true"/>} label="I would not like my records to be disclosed." />
            </RadioGroup>
            <br></br>
            {/* <FormLabel id="demo-radio-buttons-group-label"><b>Connected Care</b></FormLabel> */}
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="Yes"
                name="radio-buttons-group">   
                <p><b>Are you interested in <b>Connected Care</b></b></p>
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
             <br></br>  
            </RadioGroup>
            <title>Signature Pad</title>
            <form class="signature-pad-form">
            <p><b>Signature</b></p>
            <Signature/>
            
         </form>
        </FormControl><button type="button" className="btn btn-secondary btn-sm" style={{ cursor: 'pointer', padding: '1%', fontWeight: 'bolder' }} onClick={(e) => { redirecttoEmail(e); } }>Submit</button></>
        
  )
}

