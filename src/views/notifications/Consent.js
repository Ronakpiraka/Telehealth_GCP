import React, { useEffect, useRef, useState } from 'react'
import Radio from '@mui/material/Radio';
import { Modal, Button } from 'react-bootstrap';
import "../records/patients.css";
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Tooltip, IconButton } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import FormControl from '@mui/material/FormControl';
import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CButton} from '@coreui/react';
// import Modal from './Modal';
import FormLabel from '@mui/material/FormLabel';
// import { Button } from 'antd';
import { useHistory, useLocation } from "react-router-dom";
import SignatureCanvas from 'react-signature-canvas';
import ReactDOM from 'react-dom';
import styles from './Consent.css'
import Signature from './signature'
import { _ } from 'core-js';
import { alignPropType } from 'react-bootstrap/esm/DropdownMenu';


export default function RadioButtonsGroup() {
   
    const history = useHistory();
    const [modal, setModal] = useState(false);
    const [consentValue, setConsentValue] = useState('Do not');
    const [connectedCareValue, setConnectedCareValue] = useState('No');
    const [deviceIdValue, setDeviceIdValue] = useState("No");
    const [deviceIdPromptOpen, setDeviceIdPromptOpen] = useState(false);
    const [deviceId, setDeviceId] = useState('');
    const [showModal, setShowModal] = useState(false);
    // const [showModal1, setShowModal1] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const toggle = ()=>{
      setModal(!modal);
    }

    const handleConnectedCareChange = (event) => {
      setConnectedCareValue(event.target.value);
      if (event.target.value === "No") {
        setDeviceIdValue("No"); // reset device ID value if "No" is selected for "Connected Care"
      }
    };
    
    // const handleOpenModal = () => {
    //   setShowModal(!showModal);
    // };
    // const handleCloseModal = () => {
    //   setShowModal(false);
    // };

    const handleCloseModal = () => {
      setShowModal(!showModal);
      console.log(showModal)
      // call the function to be triggered when the modal is closed
      // senddata();
    };
    const handleSubmit = () => {
      handleCloseModal();
      // Submit the data here using fetch or any other library
      setSubmitted(true);
    };
  
    const handleShowSubmittedModal = () => {
      setShowModal(false);
      setSubmitted(false); 
      redirecttoEmail();// Reset the submitted state
      // Show another modal here to showcase that the response has been submitted
    };

    const handleYesChange = () => {
      setDeviceIdPromptOpen(true);
      handleDeviceIdChange('Yes');
    };

    const handleNoChange = () => {
      setDeviceIdPromptOpen(false);
      handleDeviceIdChange('No');
      const newDeviceId = assignNewDeviceIdAndShare();
      console.log(newDeviceId);
    };

    const assignNewDeviceIdAndShare = () => {
      const newDeviceId = Math.floor(Math.random() * 1000000); // generate a random 6-digit number for the new device ID
      const message = `Your new device ID is ${newDeviceId}. We will send this ID to you via email shortly.`;
      console.log(message);
      return message;
    };
    const handleDeviceIdInputChange = (e) => {
      setDeviceId(e.target.value);
    };

    const handleDeviceIdChange = (event) => {
      setDeviceIdValue(event.target.value);
    };
    const handleConsentChange = (event) => {
      const value = event.target.value;
      localStorage.setItem('consentValue', value);
      setConsentValue(value);
      if(event.target.value == 'Do') { localStorage.setItem("Appointment_Status", "Pending")}
      if(event.target.value == 'Do partial'){ localStorage.setItem("Appointment_Status", "Pending")}
      if(event.target.value == 'Do not'){ localStorage.setItem("Appointment_Status","Booked")}
      
    };
  
    // const Submit = () =>{
    //     <CModal show={showModal1} onClose={handleOpenModal}>
    //       <CModalHeader closeButton onClose={handleOpenModal}>
    //         <CModalTitle>Preview Window</CModalTitle>
    //       </CModalHeader>
    //       <CModalBody>
    //         HI HELLO
    //       </CModalBody>
    //       <CModalFooter>
            
    //         <CButton color="primary" onClick={redirecttoEmail}>
    //           Submit data
    //         </CButton>
            
    //       </CModalFooter>
          
    //     </CModal>
    // };

    const senddata = () => {
    var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      
      var raw = JSON.stringify({
        "Patient_id": localStorage.getItem('Patient_MRN'),
        "App_Date": localStorage.getItem('date'),
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
      // var url = `/notifications/email`;
      var url = `/bookAppointment`;
      history.push(`${url}`);

      localStorage.removeItem('Patient_name');
      localStorage.removeItem('Patient_MRN');
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
      localStorage.removeItem("Time_9_AM_10_AM" );
      localStorage.removeItem("Time_10_AM_11_AM");
      localStorage.removeItem("Time_11_AM_12_PM");
      localStorage.removeItem("Time_12_PM_1_PM");
      localStorage.removeItem("Time_1_PM_2_PM");
      localStorage.removeItem("Time_2_PM_3_PM");
      localStorage.removeItem("Time_3_PM_4_PM");
      localStorage.removeItem("Time_4_PM_5_PM");
     }
     useEffect(() => {
      localStorage.setItem('consentValue','Do not');
      localStorage.setItem('connectedCareValue', 'False');
     },[])

    
     
    return (
    <>
    {/* <Modal showModal={true} handleCloseModal={handleCloseModal} /> */}
    <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Preview Appointment Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <b>You have selected :</b> <br/>
          <b>Patient_name:</b> {localStorage.getItem("Patient_name")}<br/>
          <b>Patient_MRN :</b> {localStorage.getItem("Patient_MRN")}<br/>
          <b>condition :</b> {localStorage.getItem("condition_name")}<br/>
          <b>provider :</b> {localStorage.getItem("provider_name")}<br/>
          <b>practitioner :</b> {localStorage.getItem("practitioner_name")}<br/>
          <b>date  :</b> {localStorage.getItem("date")}<br/>
          <b>time :</b> {localStorage.getItem("Patient_MRN")}<br/>
          <b>consent :</b> {localStorage.getItem("consentValue")}<br/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit data
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal align= "center" show={submitted} onHide={handleShowSubmittedModal}>
        <Modal.Header closeButton>
          <Modal.Title>Submit Appointment Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Your response has been submitted successfully.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button alignItems="center" variant="primary" onClick={handleShowSubmittedModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    
    <div> 
      <h1 id="demo-radio-buttons-group-label" align="center">Consent Form</h1> 
    <FormControl>
   
    <RadioGroup
      aria-labelledby="demo-radio-buttons-group-label"
      name="radio-buttons-group"
      value={connectedCareValue}
      onChange={handleConnectedCareChange}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h4>Are you interested in Connected Care?</h4>
        <Tooltip title="Remote care vital tracking">
          <IconButton aria-label="success">
            <InfoIcon />
          </IconButton>
        </Tooltip>
      </div>
      <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
      <FormControlLabel value="No" control={<Radio />} label="No" />
    </RadioGroup>
      <br/>
    {connectedCareValue === "Yes" && (
      <div>
      <h4>Do you have a Medical device?</h4>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="device-id-group"
        value={deviceIdValue}
        onChange={(e) => (e.target.value === 'Yes' ? handleYesChange() : handleNoChange())}
      >
        <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
        <FormControlLabel value="No" control={<Radio />} label="No" />
      </RadioGroup>
      {deviceIdPromptOpen && (
        <div>
          <p>Please enter your device ID:</p>
          <input type="text" onChange={handleDeviceIdInputChange} />
        </div>
      )}
    </div>
    )}

    <h4>Consent</h4>
    <RadioGroup
      aria-labelledby="demo-radio-buttons-group-label"
      // defaultValue="false"
      name="radio-buttons-group"
      value={consentValue}
      onChange={handleConsentChange}
    >          
      <FormControlLabel value="Do" control={<Radio />} label="I give my consent to share my EHR records with practitioner as well as provider ." />
      <FormControlLabel value="Do partial" control={<Radio />} label="I give my consent to share my EHR records with practitioner as well as provider for a period of 15 days post completion of my appointment . " />
      <FormControlLabel value="Do not" control={<Radio defaultValue="true"/>} label="I will share my records with practitioner during the visit." />
      </RadioGroup>
      <form class="signature-pad-form">
      <h4>Signature</h4>
      <Signature/>
    </form>  
    </FormControl><br/><br/>
      
      <div> 
      <button onClick={handleCloseModal}>Preview</button>
      </div>
    </div>
        </>
  )
}
