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
          
          // var raw = JSON.stringify({
          //     "Patient_id": "003abc72-a814-4a81-bff1-ce6a54b0ce39",
          //     "App_Date": "2023-02-27",
          //     "Provider_id": "80e919cc-df1a-3838-b75e-541564a286e5",
          //     "Provider_name": "COTTAGE HOSPITAL",
          //     "Time_9_AM_10_AM": false,
          //     "Time_10_AM_11_AM": false,
          //     "Time_11_AM_12_PM": false,
          //     "Time_12_PM_1_PM": true,
          //     "Time_1_PM_2_PM": false,
          //     "Time_2_PM_3_PM": false,
          //     "Time_3_PM_4_PM": false,
          //     "Time_4_PM_5_PM": false,
          //     "Condition_code": "44465007",
          //     "Condition_name": "Sprain of ankle",
          //     "Patient_name": "Ms. Komal Kekare",
          //     "Practitioner_id": "0000016d-3a85-4cca-0000-000000000226",
          //     "Practitioner_name": "Dr. Leela",
          //     "Practitioner_Speciality": "Orthopedic Specialist",
          //     "MRN": "003abc72-a814-4a81-bff1-ce6a54b0ce39",
          //     "practitioner_email": "Lanny564.Huels583@example.com",
          //     "provider_contact_number": "508-228-1200",
          //     "Appointment_Status": "Pending",
          //     "Consent_form_choice": "True Partial",
          //     "Connected_Care_Status": false
          // });
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
            localStorage.removeItem('Patient_name')
            // ,'Patient_MRN','condition_name','condition_code','provider_name','provider_id','provider_contact_number','date','timeslot','practitioner_name','practitioner_id','practitioner_speciality','practitioner_email','consentValue','connectedCareValue');
        
     }
     useEffect(() => {
      localStorage.setItem('consentValue','Do not');
      localStorage.setItem('connectedCareValue', 'Do not');
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

