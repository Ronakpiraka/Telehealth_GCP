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
import { _ } from 'core-js';

export default function RadioButtonsGroup() {
   
    const history = useHistory();
    const [modal, setModal] = useState(false);
    const [consentValue, setConsentValue] = useState('true');
    const [connectedCareValue, setConnectedCareValue] = useState('Yes');

    const toggle = ()=>{
      setModal(!modal);
    }
   
    const handleConsentChange = (event) => {
      const value = event.target.value;
      localStorage.setItem('consentValue', value);
      setConsentValue(value);
      if(event.target.value == 'Do') { localStorage.setItem("Appointment_Status", "Pending")}
      if(event.target.value == 'Do partial'){ localStorage.setItem("Appointment_Status", "Pending")}
      if(event.target.value == 'Do not'){ localStorage.setItem("Appointment_Status","Booked")}
      
    };
  
    const handleConnectedCareChange = (event) => {
      const value = event.target.value;
      localStorage.setItem('connectedCareValue', value);
      setConnectedCareValue(value);
    };

    const senddata = () => {
        var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
         
          var raw = JSON.stringify({
            "Patient_id": localStorage.getItem('Patient_MRN'),
            "App_Date": localStorage.getItem('date'),
            // "App_Date":"2023-03-11",
            "Provider_id": localStorage.getItem('provider_id'),
            "Provider_name": localStorage.getItem('provider_name'),
            "Time_9_AM_10_AM": false,
            "Time_10_AM_11_AM": false,
            "Time_11_AM_12_PM": false,
            "Time_12_PM_1_PM": false,
            "Time_1_PM_2_PM": false,
            "Time_2_PM_3_PM": false,
            "Time_3_PM_4_PM": false,
            "Time_4_PM_5_PM": false,
            "Condition_code": localStorage.getItem('condition_code'),
            "Condition_name": localStorage.getItem('condition_name'),
            "Patient_name": localStorage.getItem('Patient_name'),
            "Practitioner_id": localStorage.getItem('practitioner_id'),
            "Practitioner_name": localStorage.getItem('practitioner_name'),
            "Practitioner_Speciality":localStorage.getItem('practitioner_speciality'),
            "MRN": localStorage.getItem('Patient_MRN'),
            "practitioner_email": localStorage.getItem('practitioner_email'),
            "provider_contact_number": localStorage.getItem('provider_contact_number'),
            "Appointment_Status":localStorage.getItem('Appointment_Status'),
            "Consent_form_choice": localStorage.getItem('consentValue'),
            "Connected_Care_Status":localStorage.getItem('connectedCareValue'),
        });

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
            localStorage.removeItem('Patient_name');
            localStorage.removeItem('Patient_MRN');
            // localStorage.removeItem('MRN');
            localStorage.removeItem('condition_code');
            localStorage.removeItem('condition_name');
            localStorage.removeItem('provider_name');
            localStorage.removeItem('provider_id');
            localStorage.removeItem('provider_contact_number');
            localStorage.removeItem('date');
            localStorage.removeItem('practitioner_name');
            localStorage.removeItem('practitioner_id');	
            localStorage.removeItem('practitioner_speciality');
            localStorage.removeItem('practitioner_email');
            localStorage.removeItem('consentValue');
            localStorage.removeItem('connectedCareValue');
            localStorage.removeItem('Appointment_Status');
            // if(localStorage.9 AM - 10 AM') { localStorage.setItem("Time_9_AM_10_AM", true)}
            // if(localStorage.10 AM - 11 AM'){ localStorage.setItem("Time_10_AM_11_AM", true)}
            // if(localStorage.11 AM - 12 PM'){ localStorage.setItem("Time_11_AM_12_PM", true)}
            // if(localStorage.12 PM - 1 PM') { localStorage.setItem("Time_12_PM_1_PM", true)}
            // if(localStorage.1 PM - 2 PM')  { localStorage.setItem("Time_1_PM_2_PM", true)}
            // if(localStorage.2 PM - 3 PM')  { localStorage.setItem("Time_2_PM_3_PM", true)}
            // if(localStorage.3 PM - 4 PM')  { localStorage.setItem("Time_3_PM_4_PM", true)}
            // if(localStorage.4 PM - 5 PM')  { localStorage.setItem("Time_4_PM_5_PM", true)}
     }
     useEffect(() => {
      localStorage.setItem('consentValue','Do not');
      localStorage.setItem('connectedCareValue', 'False');
     },[])

    
     
            return (
            <>
            <div>
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label"><b>Consent Form</b></FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                // defaultValue="false"
                name="radio-buttons-group"
                value={consentValue}
                onChange={handleConsentChange}
              >
                <FormControlLabel value="Do" control={<Radio />} label="I give my consent to share my EHR records with practitioner as well as provider ." />
                <FormControlLabel value="Do partial" control={<Radio />} label="I give my consent to share my EHR records with practitioner as well as provider for a period of 15 days post completion of my appointment . " />
                <FormControlLabel value="Do not" control={<Radio defaultValue="true"/>} label="I will carry my records to the practitioner in person." />
                
            </RadioGroup>
            <br/>
            {/* <FormLabel id="demo-radio-buttons-group-label"><b>Connected Care</b></FormLabel> */}
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                // defaultValue="No"
                name="radio-buttons-group"
                value={connectedCareValue}
                onChange={handleConnectedCareChange}
                >   
                <p><b>Are you interested in <b>Connected Care</b></b></p>
                <FormControlLabel value="True" control={<Radio />} label="Yes" />
                <FormControlLabel value="False" control={<Radio />} label="No" />
             <br></br>  
            </RadioGroup>
              <form class="signature-pad-form">
                <p><b>Signature</b></p>
                <Signature/>
              </form>
          </FormControl>
            </div>
            <div> 
        <button type="button" className="btn btn-secondary btn-sm" style={{ cursor: 'pointer', padding: '1%', fontWeight: 'bolder' }} onClick={(e) => 
          {redirecttoEmail(e); }}
          >Submit</button>
        </div>
        </>
  )
}

