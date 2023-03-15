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
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { CCard, CCardBody, CCardGroup, CWidgetDropdown, CCol, CRow, CWidgetProgressIcon, CCardText } from '@coreui/react'
// import { Button } from 'antd';
import { useHistory, useLocation } from "react-router-dom";
import SignatureCanvas from 'react-signature-canvas';
import ReactDOM from 'react-dom';
import styles from './Consent.css'
import Signature from './signature'
import { _ } from 'core-js';
import { alignPropType } from 'react-bootstrap/esm/DropdownMenu';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { message } from 'antd';
export default function RadioButtonsGroup() {
   
    const history = useHistory();
    const [modal, setModal] = useState(false);
    const [consentValue, setConsentValue] = useState('Do not');
    const [connectedCareValue, setConnectedCareValue] = useState('No');
    const [deviceIdValue, setDeviceIdValue] = useState('No');
    const [deviceIdPromptOpen, setDeviceIdPromptOpen] = useState();
    const [deviceId, setDeviceId] = useState(0);
    const [showModal, setShowModal] = useState(false);
    
    const [submitted, setSubmitted] = useState(false);
    

    useEffect(() => {
      localStorage.setItem('consentValue','Do not');
      localStorage.setItem('connectedCareValue', 'False');
      localStorage.setItem('Appointment_Status','Booked');
      localStorage.setItem('deviceid','Not enrolled for tracking.')
      localStorage.setItem("Appointment_Statusvalue", "You will share your records with practitioner during the visit.")
     },[])

    const handleConnectedCareChange = (event) => {
      setConnectedCareValue(event.target.value);
      if (event.target.value === "No") {
        setDeviceIdValue("No"); 
        localStorage.setItem('deviceid',"Not enrolled for tracking.")
      }
    };
    const assignNewDeviceIdAndShare = () => {
      const newDeviceId = Math.floor(Math.random() * 1000000); // generate a random 6-digit number for the new device ID
      const message = `your new device ID is ${newDeviceId}. We will send this ID to you via email shortly.`;
      const value = localStorage.setItem('deviceid',newDeviceId)
      // const message = `Your new device ID is newDeviceId. We will send this ID to you via email shortly.`;
      return message;
    };

    const handleDeviceIdInputChange = (e) => {
      setDeviceId(e.target.value);
      if (e.target.value === "") {
        localStorage.setItem('deviceid',"Please enter a Valid ID")
      }
      else{
        localStorage.setItem('deviceid',e.target.value)
      }
    };


    const handleCloseModal = () => {
      if(connectedCareValue === "Yes" && deviceIdValue === "Yes" && deviceId.length !== 14){
            alert("please enter a valid device id");
            setDeviceId("");
        }
        else{setShowModal(!showModal);}
    };

    const handleSubmit = () => {
      handleCloseModal();
      setSubmitted(true);
 
    };
  
    const handleShowSubmittedModal = () => {
      setShowModal(false);
      setSubmitted(false); 
      redirecttoEmail();
    };

    const handleYesChange = () => {
      setDeviceIdValue('Yes')
      setDeviceIdPromptOpen(true);
      localStorage.setItem('deviceid',"No ID provided")
    };

    const handleNoChange = () => {
      setDeviceIdValue('No')
      setDeviceIdPromptOpen(false);
      assignNewDeviceIdAndShare();
      // console.log(newDeviceId);
    };
    // const handleGoBack = () => {
    //   const condition_name = localStorage.getItem('condition_name');
    //   var url = `/Practitionerbookings?condition=${condition_name}`;  
    //   history.push(`${url}`);
    // };

    // const handleGoAhead = () => {
    //   var url = `/bookAppointment`; //to Ope's end
    //   history.push(`${url}`);
    // };

    const handleConsentChange = (event) => {
      const value = event.target.value;
      localStorage.setItem('consentValue', value);
      setConsentValue(value);
      if(event.target.value == 'Do') { localStorage.setItem("Appointment_Status", "Pending");localStorage.setItem("Appointment_Statusvalue", "You agree and give your consent to share your EHR records with practitioner as well as provider .")}
      if(event.target.value == 'Do partial'){ localStorage.setItem("Appointment_Status", "Pending");localStorage.setItem("Appointment_Statusvalue", "You agree and give your consent to share your EHR records with practitioner as well as provider for a period of 15 days post completion of my appointment .")}
      if(event.target.value == 'Do not'){ localStorage.setItem("Appointment_Status","Booked");localStorage.setItem("Appointment_Statusvalue", "You will share your records with practitioner during the visit.")}
    };

    const senddata = () => {
    var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      
      var raw = {
        "Patient_id": localStorage.getItem('Patient_MRN'),
        "App_Date": localStorage.getItem('date'),
        "Provider_id": localStorage.getItem('provider_id'),
        "Provider_name": localStorage.getItem('provider_name'),
        "Time_9_AM_10_AM": localStorage.getItem('Time_9_AM_10_AM') == 'true' ? true : false,
        "Time_10_AM_11_AM": localStorage.getItem('Time_10_AM_11_AM') == 'true' ? true : false,
        "Time_11_AM_12_PM": localStorage.getItem('Time_11_AM_12_PM') == 'true' ? true : false,
        "Time_12_PM_1_PM": localStorage.getItem('Time_12_PM_1_PM') == 'true' ? true : false,
        "Time_1_PM_2_PM": localStorage.getItem('Time_1_PM_2_PM') == 'true' ? true : false,
        "Time_2_PM_3_PM": localStorage.getItem('Time_2_PM_3_PM') == 'true' ? true : false,
        "Time_3_PM_4_PM": localStorage.getItem('Time_3_PM_4_PM') == 'true' ? true : false,
        "Time_4_PM_5_PM": localStorage.getItem('Time_4_PM_5_PM') == 'true' ? true : false,
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
        "Patient_email": localStorage.getItem("Patient_email")
    };

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(raw)
      };

      console.log(raw)
      
      fetch("https://function-2-sh4iojyb3q-uc.a.run.app", requestOptions)
        .then(response => {
          response.json();
          
        })
        .then(result => {
            console.log(result);
        })
        .catch(error => console.log('error', error));
      }

    const redirecttoEmail= () => {
      senddata()
      var url = `/notifications/email`;
      // var url = `/bookAppointment`;
      history.push(`${url}`);
      localStorage.clear();
      // localStorage.removeItem('Patient_name');
     }
       
     
    return (
    <>
    <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title><b>Preview Appointment Details</b></Modal.Title>
        </Modal.Header>
        {/* message = consentstatus() */}
        <Modal.Body>
          <b>Patient Name :</b> {localStorage.getItem("Patient_name")}<br/><br/>
          <b>Medical Record Number :</b> {localStorage.getItem("Patient_MRN")}<br/><br/>
          <b>Condition Name:</b> {localStorage.getItem("condition_name")}<br/><br/>
          <b>Provider Name:</b> {localStorage.getItem("provider_name")}<br/><br/>
          <b>Practitioner Name:</b> {localStorage.getItem("practitioner_name")}<br/><br/>
          <b>Selected Date  :</b> {localStorage.getItem("date")}<br/><br/>
          <b>Selected Time :</b> {localStorage.getItem("timeslot")}<br/><br/>
          <b>Device ID information: </b> {localStorage.getItem("deviceid")}<br/><br/>
          <b>Consent :</b>  {localStorage.getItem("Appointment_Statusvalue")} <br/><br/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit data
          </Button>
        </Modal.Footer>
        </Modal>
          <Modal align= "center" show={submitted} onHide={handleShowSubmittedModal}>
            <Modal.Header closeButton>
              <Modal.Title>Appointment Request</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Your appointment has been booked successfully.</p>
              <CheckCircleIcon style={{color:'green', fontSize:'100px'}}/>
            </Modal.Body>
            <Modal.Footer>
              <Button alignItems="center" variant="primary" onClick={handleShowSubmittedModal}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
          
    <div> 
    
    <CRow>
      {/* <CCol sm="1" md="1" lg="1" onClick={handleGoBack}><ArrowCircleLeftIcon /></CCol>
      <CCol sm="10" md="10" lg="10"><h1 className="title"><strong>Consent Form</strong></h1></CCol> */}
      {/* <CCol sm="1" md="1" lg="1"onClick={handleGoAhead}>< ArrowCircleRightIcon/></CCol> */}
      <CCol><h1 className="title"><strong>Consent Form</strong></h1></CCol>
    </CRow>
    
    {/* <h1 id="demo-radio-buttons-group-label" align="center">Consent Form</h1>  */}
    
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <h4 style={{fontFamily:'sans-serif'}}>Are you interested in Connected Care?</h4>
      <Tooltip title="Remote care vital tracking">
        <IconButton aria-label="success"><InfoIcon/></IconButton>
      </Tooltip>
    </div>
    <FormControl>
    <RadioGroup aria-labelledby="demo-radio-buttons-group-label" name="radio-buttons-group" value={connectedCareValue} onChange={handleConnectedCareChange}>
      <CRow>
        <CCol></CCol>
        <CRow><CCol><FormControlLabel value="Yes" control={<Radio />} label="Yes" /></CCol></CRow><br/><br/>
        <CCol></CCol>
        <CRow><CCol><FormControlLabel value="No" control={<Radio />} label="No" /></CCol></CRow></CRow>
    </RadioGroup>
    <br/>
    {connectedCareValue == "Yes" && (
    <div>
      
    <h4 style={{fontFamily:'sans-serif'}}>Do you have a Medical device?</h4><br/>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="device-id-group"
        value={deviceIdValue}
        onChange={(e) => (e.target.value === 'Yes' ? handleYesChange() : handleNoChange())}
      >
        <CRow>
        <CCol></CCol>
        <CRow><CCol><FormControlLabel value="Yes" control={<Radio />} label="Yes" /></CCol></CRow><br/><br/>
        <CCol></CCol>
        <CRow><CCol><FormControlLabel value="No" control={<Radio />} label="No" /></CCol></CRow></CRow><br/>
      </RadioGroup>
      {deviceIdPromptOpen && (
        
          <CRow>
            <CCol></CCol>
            <CRow><CCol style={{color:"red"}}>Please enter your device ID : <input type="text" className="input-box" onChange={handleDeviceIdInputChange} value={deviceId} /></CCol></CRow>
            {/* <CCol></CCol>
            <CRow><CCol style={{color:"red"}}><button onClick={handleVerification}>Verify</button></CCol></CRow> */}
          </CRow>
        
      )}
      {!deviceIdPromptOpen && (
        <CRow>
          <CRow><CCol><h5 style={{fontFamily:'sans-serif', color:'red'}}>We are assigning you a new id and {assignNewDeviceIdAndShare()}</h5></CCol></CRow><br/>
        </CRow>
      )}
    </div>
    )}
    <br/>

    <h4 style={{fontFamily:'sans-serif'}}>Consent</h4>
    <RadioGroup
      aria-labelledby="demo-radio-buttons-group-label"
      name="radio-buttons-group"
      value={consentValue}
      onChange={handleConsentChange}
    > <CRow>
      <CCol></CCol><CRow><CCol><FormControlLabel value="Do" control={<Radio />} label="I give my consent to share my EHR records with practitioner as well as provider ." /></CCol></CRow><br/><br/>
      <CCol></CCol><CRow><CCol><FormControlLabel value="Do partial" control={<Radio />} label="I give my consent to share my EHR records with practitioner as well as provider for a period of 15 days post completion of my appointment . " /></CCol></CRow><br/><br/>
      <CCol></CCol><CRow><CCol><FormControlLabel value="Do not" control={<Radio defaultValue="true"/>} label="I will share my records with practitioner during the visit." /></CCol></CRow>
      </CRow>
      </RadioGroup>
      <br/>
      <form className="signature-pad-form">
      <h4 style={{fontFamily:'sans-serif'}}>Signature</h4>
      <CRow><CCol></CCol><CRow><CCol><Signature/></CCol></CRow></CRow>
      </form>  
      </FormControl><br/><br/>
      
      <div align="center">
      <button class="btn btn-primary" onClick={handleCloseModal}>Preview</button>
      </div>
  </div>
        </>
  )
}

