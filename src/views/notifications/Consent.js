import React, { useEffect, useRef, useState } from 'react'
import Radio from '@mui/material/Radio';
// import "./Consent.css"
import "../records/patients.css";
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Button } from 'antd';
import { useHistory, useLocation } from "react-router-dom";
import { CModal } from '@coreui/react';
import { CModalFooter } from '@coreui/react';
import { CModalHeader } from '@coreui/react';
import { CModalTitle } from '@coreui/react';
import { CModalBody } from '@coreui/react';
import { CButton } from '@coreui/react';

export default function RadioButtonsGroup() {
    const history = useHistory();
    const [modal, setModal] = useState(false);

    const toggle = ()=>{
      setModal(!modal);
    }

    const senddata = () => {
        var myHeaders = new Headers();
        var accessToken = sessionStorage.getItem('Accesstoken')
        console.log(accessToken)
        alert(accessToken)
          myHeaders.append("Authorization", "Bearer "+ accessToken);
          myHeaders.append("Content-Type", "application/json");
          
          var raw = JSON.stringify({
            "App_Date": "0001-01-01",
            "Provider_id": "80e919cc-df1a-3838-b75e-541564a286e5",
            "Provider_name": "providername",
            "Time_9_AM_10_AM": false,
            "Time_10_AM_11_AM": false,
            "Time_11_AM_12_PM": false,
            "Time_12_PM_1_PM": false,
            "Time_1_PM_2_PM": true,
            "Time_2_PM_3_PM": false,
            "Time_3_PM_4_PM": false,
            "Time_4_PM_5_PM": false,
            "Condition_code": "44465007",
            "Condition_name": "conditionName",
            "Patient_name": "Pname",
            "Patient_id": "003abc72-a814-4a81-bff1-ce6a54b0ce39",
            "Practitioner_id": "0000016d-3a85-4cca-0000-000000000226",
            "Practitioner_Speciality": "Orthopedic Specialist",
            "Practitioner_name": "Dr. Lanny Huels",
            "MRN": "003abc72-a814-4a81-bff1-ce6a54b0ce39",
            "practitioner_email":"abc@gmail.com",
            "provider_contact_number":"1234567890",
            "Consent_form_choice":"false",
            "Vitals_tracking_status":"true"
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

    

    //  const canvas = document.querySelector('canvas');
    //  const form = document.querySelector('.signature-pad-form');
    //  const clearButton = document.querySelector('.clear-button');
    //  const ctx = canvas.getContext('2d');
    //  let writingMode = false;
    //  canvas.addEventListener('pointerdown', handlePointerDown, {passive: true});
    //  canvas.addEventListener('pointerup', handlePointerUp, {passive: true});
    //  canvas.addEventListener('pointermove', handlePointerMove, {passive: true});

    //  const handlePointerDown = (event) => {
    //     writingMode = true;
    //     ctx.beginPath();
    //     const [positionX, positionY] = getCursorPosition(event);
    //     ctx.moveTo(positionX, positionY);
    //   }

    //   const handlePointerUp = () => {
    //     writingMode = false;
    //   }

    //   const handlePointerMove = (event) => {
    //     if (!writingMode) return
    //     const [positionX, positionY] = getCursorPosition(event);
    //     ctx.lineTo(positionX, positionY);
    //     ctx.stroke();
    //   }

    //   const getCursorPosition = (event) => {
    //      const [positionX, positionY] = getCursorPosition(event);
    //     positionX = event.clientX - event.target.getBoundingClientRect().x;
    //     positionY = event.clientY - event.target.getBoundingClientRect().y;
    //     return [positionX, positionY];
    //   }

    //   ctx.lineWidth = 3;
    //   ctx.lineJoin = ctx.lineCap = 'round';
    //   form.addEventListener('submit', (event) => {
    //     event.preventDefault();
    //     const imageURL = canvas.toDataURL();
    //     const image = document.createElement('img');
    //     image.src = imageURL;
    //     image.height = canvas.height;
    //     image.width = canvas.width;
    //     image.style.display = 'block';
    //     form.appendChild(image);
    //     clearPad();
    //   })

    //   const clearPad = () => {
    //     ctx.clearRect(0, 0, canvas.width, canvas.height);
    //   }
    //   clearButton.addEventListener('click', (event) => {
    //     event.preventDefault();
    //     clearPad();
    //   })

    return (
    <>
      <FormControl>
        <CModal
            show={modal}
            onClose={toggle}
        >
            <CModalHeader closeButton>Confirmation</CModalHeader>
            <CModalBody>
            Your Appointment is booked successfully....
            </CModalBody>
            <CModalFooter>
            {/* <CButton color="primary">Do Something</CButton>{' '} */}
            <CButton
                color="primary"
                onClick={toggle}>Ok</CButton>
            </CModalFooter>
        </CModal>
            <FormLabel id="demo-radio-buttons-group-label"><b>Consent Form</b></FormLabel>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="I dont"
                name="radio-buttons-group"
            >
                <FormControlLabel value="I do" control={<Radio />} label="I give my consent to share my EHR records with practitioner as well as provider ." />
                <FormControlLabel value="I do for limited limited" control={<Radio />} label="I give my consent to share my EHR records with practitioner as well as provider for a period of 15 days prior to the completion of my appointment . " />
                <FormControlLabel value="I dont" control={<Radio />} label="I would not like my records to be disclosed." />
            </RadioGroup>
            <br></br>
            <FormLabel id="demo-radio-buttons-group-label"><b>Connected Care</b></FormLabel>
            <p><b>Are you interested for vital tracking?</b></p>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="Yes"
                name="radio-buttons-group">
            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="No" control={<Radio />} label="No" />
               
            </RadioGroup>
            {/* <title>Signature Pad</title>
            <form class="signature-pad-form" action="#" method="POST">
            <p><b>Signature</b></p>
            <canvas height="100" width="300" class="signature-pad"></canvas>
            <p><a href="#" class="clear-button">Clear</a></p>
           
            </form> */}
        </FormControl>
        <button type="button" className="btn btn-secondary btn-sm" style={{ cursor: 'pointer', padding: '1%', fontWeight: 'bolder' }} onClick={(e) => { redirecttoEmail(e); } }>Submit</button>
        </>
        
  )
}
