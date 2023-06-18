import React, { useEffect, useRef, useState } from "react";
import Radio from "@mui/material/Radio";
import { Modal, Button } from "react-bootstrap";
import "../records/patients.css";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Tooltip, IconButton } from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import FormControl from "@mui/material/FormControl";
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
} from "@coreui/react";
// import Modal from './Modal';
import axios from "axios";
import FormLabel from "@mui/material/FormLabel";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import {
  CCard,
  CCardBody,
  CCardGroup,
  CWidgetDropdown,
  CCol,
  CRow,
  CWidgetProgressIcon,
  CCardText,
} from "@coreui/react";
// import { Button } from 'antd';
import { useHistory, useLocation } from "react-router-dom";
// import SignatureCanvas from "react-signature-canvas";
// import ReactDOM from "react-dom";
// import styles from "./Consent.css";
// import Signature from "./signature";
import { _ } from "core-js";
// import { alignPropType } from "react-bootstrap/esm/DropdownMenu";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import HighlightOffIcon from "@mui/icons-material/HighlightOff";
// import { message } from "antd";

export default function Consent(props) {

  const data = props.data;
  const history = useHistory();
  const [modal, setModal] = useState(false);
  const [consentValue, setConsentValue] = useState("Do not");
  // const [connectedCareValue, setConnectedCareValue] = useState("No");
  // const [deviceIdValue, setDeviceIdValue] = useState("No");
  // const [deviceIdPromptOpen, setDeviceIdPromptOpen] = useState();
  // const [deviceId, setDeviceId] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // handleplatform();
    localStorage.setItem("consentValue", "Do not");
    // localStorage.setItem("connectedCareValue", "False");
    localStorage.setItem("Appointment_Status", "Booked");
    // localStorage.setItem("deviceid", "Not enrolled for tracking.");
    localStorage.setItem(
      "Appointment_Statusvalue",
      "You will share your records with practitioner during the visit."
    );
  }, []);

  // const handleConnectedCareChange = (event) => {
  //   setConnectedCareValue(event.target.value);
  //   if (event.target.value === "No") {
  //     setDeviceIdValue("No");
  //     localStorage.setItem("deviceid", "Not enrolled for tracking.");
  //   }
  // };

  // const assignNewDeviceIdAndShare = () => {
  //   const newDeviceId = Math.floor(Math.random() * 1000000); // generate a random 6-digit number for the new device ID
  //   const message = `your new device ID is ${newDeviceId}. We will send this ID to you via email shortly.`;
  //   const value = localStorage.setItem("deviceid", newDeviceId);
  //   // const message = `Your new device ID is newDeviceId. We will send this ID to you via email shortly.`;
  //   return message;
  // };

  // const handleDeviceIdInputChange = (e) => {
  //   setDeviceId(e.target.value);
  //   if (e.target.value === "") {
  //     localStorage.setItem("deviceid", "Please enter a Valid ID");
  //   } else {
  //     localStorage.setItem("deviceid", e.target.value);
  //   }
  // };

  const handlepreview = () => {
    const providername = localStorage.getItem("provider_name");
    const pracname = localStorage.getItem("practitioner_name");
    const date = localStorage.getItem("selectedDate");
    const time = localStorage.getItem("selectedHour");
    const patientname = localStorage.getItem("Patient_name");

    if (!providername || !pracname || !date || !time) {
      alert(
        "Please select a provider, practitioner, appointment date, and time before proceeding."
      );
    } else {
      try {
        // const response = fetch("https://emailnotifications-sh4iojyb3q-uc.a.run.app");
        console.log('data',data)
        const appointments = data;
        const busyPrac = appointments.find((a) =>
            a.Practitioner_name === pracname &&
            a.App_Date === date &&
            a.Timing === time
        );
        console.log('busyprac',busyPrac)
        const busyPatient = appointments.find(
          (a) =>
            a.Patient_name === patientname &&
            a.App_Date === date &&
            a.Timing === time
        );
        console.log('busypatient',busyPatient)

        if (busyPrac) {
          alert("Sorry, the practitioner is already busy at that time.");
          // console.log('Sorry, the practitioner is already busy at that time.');
        } else if (busyPatient) {
          alert("Sorry, the patient already has an appointment at that time.");
          // console.log('Sorry, the patient already has an appointment at that time.');
        } else {
          setShowModal(!showModal);
        }
      } catch (error) {
        console.error("Error fetching appointments data:", error);
        alert(
          "An error occurred while checking for appointment availability. Please try again later."
        );
      }
    }
  };

  const handleclosemodal = () => {
    setShowModal(false);
  };
  const handleSubmit = () => {
    // handlepreview();
    setShowModal(false);
    setSubmitted(true);
    senddata();
  };

  const handleShowSubmittedModal = () => {
    // setShowModal(!modal);
    setSubmitted(false);
    redirect();
  };

  // const handleYesChange = () => {
  //   setDeviceIdValue("Yes");
  //   setDeviceIdPromptOpen(true);
  //   localStorage.setItem("deviceid", "No ID provided");
  // };

  // const handleNoChange = () => {
  //   setDeviceIdValue("No");
  //   setDeviceIdPromptOpen(false);
  //   assignNewDeviceIdAndShare();
  //   // console.log(newDeviceId);
  // };
  // const handleplatform = () => {
  //   if (sessionStorage.getItem("Patient_name") == null)
  //   {
  //     localStorage.setItem('platform', 'TELE')
  //   }
  //   if (sessionStorage.getItem("Patient_name") != null)
  //   {
  //     localStorage.setItem('platform', 'OPE')
  //   }
    
  // }

  const handleConsentChange = (event) => {
    const value = event.target.value;
    localStorage.setItem("consentValue", value);
    setConsentValue(value);
    if (event.target.value === "Do") {
      localStorage.setItem("Appointment_Status", "Pending");
      localStorage.setItem(
        "Appointment_Statusvalue",
        "You agree and give your consent to share your EHR records with practitioner as well as provider ."
      );
    }
    if (event.target.value === "Do partial") {
      localStorage.setItem("Appointment_Status", "Pending");
      localStorage.setItem(
        "Appointment_Statusvalue",
        "You agree and give your consent to share your EHR records with practitioner as well as provider for a period of 15 days post completion of my appointment ."
      );
    }
    if (event.target.value === "Do not") {
      localStorage.setItem("Appointment_Status", "Booked");
      localStorage.setItem(
        "Appointment_Statusvalue",
        "You will share your records with practitioner during the visit."
      );
    }
  };

  const senddata = () => {
    // const accessToken = fetch(
    //   "https://generate-access-token-sh4iojyb3q-uc.a.run.app"
    // );
    // console.log(accessToken);
    // const accessToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjFhYWU4ZDdjOTIwNThiNWVlYTQ1Njg5NWJmODkwODQ1NzFlMzA2ZjMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNjE4MTA0NzA4MDU0LTlyOXMxYzRhbGczNmVybGl1Y2hvOXQ1Mm4zMm42ZGdxLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNjE4MTA0NzA4MDU0LTlyOXMxYzRhbGczNmVybGl1Y2hvOXQ1Mm4zMm42ZGdxLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTEwMDU3NzI0Mzc5NjAzNjM2NzU0IiwiaGQiOiJicmlsbGlvLmNvbSIsImVtYWlsIjoicm9uYWsucGlyYWthQGJyaWxsaW8uY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJHLTFadGFia09LSnl4WE9USTZEQVpRIiwiaWF0IjoxNjgwNDk4ODk5LCJleHAiOjE2ODA1MDI0OTksImp0aSI6IjE5MjRjYWI3MmFhMzMxY2I0ZWVjOGM2MWQ2YzA1MjNjOGVkZDIxYWUifQ.STpi8n4b0YvoGiJVu7IEkpX7Q_gfbM7w2VL5l_E10-OJA_-nZTMASI569_0YsYG1fFfxfXZrny2JAecPSCFwD2GK2CkfXkj9HxoEgTXLWS_9pcppan1Qdv1phP63PdlI0gIWHRKp7S2DCNBXBqhfuqtdZw0r3FFMyvyHCeaKzkdI78p5XdXFR0fh0p-FeK2rmRSy0kP-o4M8oH_IvzhYTS5ZY3TpCYgWPsmnIzdCAERuN9AtRyu72Dlosb_vYqG6dbqDBlRRmJYIQ3kNTU0CsG6TY3y-3eqqg6U6c_74UeRfVN5kv_zZCKo76nqhk7wdF04rWjqWaSFYgLe_2CBpbg';

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    // myHeaders.append("Authorization", `Bearer ${accessToken}`);  
    var raw = {
      Patient_id: localStorage.getItem("Patient_id"),
      App_Date: localStorage.getItem("selectedDate"),
      Provider_id: localStorage.getItem("provider_id"),
      Provider_name: localStorage.getItem("provider_name"),
      Condition_code: localStorage.getItem("condition_code"),
      Condition_name: localStorage.getItem("condition_name"),
      Patient_name: localStorage.getItem("Patient_name"),
      Practitioner_id: localStorage.getItem("practitioner_id"),
      Practitioner_name: localStorage.getItem("practitioner_name"),
      Practitioner_Speciality: localStorage.getItem("practitioner_speciality"),
      // practitioner_email: localStorage.getItem("practitioner_email"),
      practitioner_email: 'telehealthgcppractitioner@gmail.com',
      MRN: localStorage.getItem("Patient_MRN"),
      provider_contact_number: localStorage.getItem("provider_contact"),
      Appointment_Status: localStorage.getItem("Appointment_Status"),
      Consent_form_choice: localStorage.getItem("consentValue"),
      Connected_Care_Status: localStorage.getItem("connectedCareValue") == "Yes" ? true : false,
      Patient_email: localStorage.getItem("Patient_email"), 
      Timing: localStorage.getItem("selectedHour"),
      Devices: localStorage.getItem("devices"),
      Slot:localStorage.getItem("selectedSlab"),
      New_closure_date : localStorage.getItem("Enddate"),
      Platform : localStorage.getItem("platform"),
      Apttype : "Appointment",
    };

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(raw),
      mode: "cors",
    };

    console.log(raw);

    fetch("https://function-2-sh4iojyb3q-uc.a.run.app", requestOptions)
      .then((response) => {
        response.json();
      })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => console.log("error", error));
  };

 
  // const bucketurl = () => {
  //   const patientMrn = localStorage.getItem("Patient_MRN");
  //   const date = localStorage.getItem("date");
  //   const time = localStorage.getItem("timeslot");
  //   const practitionerid = localStorage.getItem("practitioner_id");
  //   const timeslot = "";
  //   if (time == "9 AM - 10 AM") {
  //     timeslot = "Time_9_AM_10_AM";
  //   }
  //   if (time == "10 AM - 11 AM") {
  //     timeslot = "Time_10_AM_11_AM";
  //   }
  //   if (time == "11 AM - 12 PM") {
  //     timeslot = "Time_11_AM_12_PM";
  //   }
  //   if (time == "12 PM - 1 PM") {
  //     timeslot = "Time_12_PM_1_PM";
  //   }
  //   if (time == "1 PM - 2 PM") {
  //     timeslot = "Time_1_PM_2_PM";
  //   }
  //   if (time == "2 PM - 3 PM") {
  //     timeslot = "Time_2_PM_3_PM";
  //   }
  //   if (time == "3 PM - 4 PM") {
  //     timeslot = "Time_3_PM_4_PM";
  //   }
  //   if (time == "4 PM - 5 PM") {
  //     timeslot = "Time_4_PM_5_PM";
  //   }

    // url = 'gs://telehealth_ope_patient/patient_patientMRN/appdate_timing_pracid/FHIR.'
  //   var bucket =
  //     "gs://telehealth_ope_patient/patient_" +
  //     patientMrn +
  //     "/" +
  //     date +
  //     "_" +
  //     timeslot +
  //     "_" +
  //     practitionerid;

  //   const OPElink = "";
  //   //yet to be given;
  //   var url = OPElink + "?url=" + bucket;
  //   // var url1 = bucket+ OPElink;
  //   console.log(url);
  //   return url;
  // };

  const redirect = () => {
    if (sessionStorage.getItem("Patient_name") === null) {
      var url = `/notifications/allappointments`;
    } else {
      window.location.href = `https://patientengagement-373605.uc.r.appspot.com/`;
    }
    history.push(`${url}`);
    localStorage.clear();
    sessionStorage.removeItem('Patient_name');
  };

  return (
    <>
      <Modal show={showModal} onHide={handleclosemodal}>
        <Modal.Header closeButton>
          <Modal.Title>
            <b>Preview Appointment Details</b>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <b>Patient Name :</b> {localStorage.getItem("Patient_name")}
          <br />
          <br />
          <b>Medical Record Number :</b> {localStorage.getItem("Patient_MRN")}
          <br />
          <br />
          <b>Condition Name:</b> {localStorage.getItem("condition_name")}
          <br />
          <br />
          <b>Provider Name:</b> {localStorage.getItem("provider_name")}
          <br />
          <br />
          <b>Practitioner Name:</b> {localStorage.getItem("practitioner_name")}
          <br />
          <br />
          <b>Selected Date:</b> {localStorage.getItem("selectedDate")}
          <br />
          <br />
          <b>Selected Time:</b> {localStorage.getItem("selectedHour")}:00 hrs
          <br />
          <br />
          <b>Device ID information:</b> {localStorage.getItem("devices")}
          <br />
          <br />
          <b>Consent :</b> {localStorage.getItem("Appointment_Statusvalue")}
          <br />
          <br />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleclosemodal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Send
          </Button>
        </Modal.Footer>
      </Modal>
      
      <Modal align="center" show={submitted} onHide={handleShowSubmittedModal}>
        <Modal.Header closeButton>
          <Modal.Title>Appointment Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Your appointment request has been sent successfully. <br />
            Please check your email for the confirmation.
          </p>
          <CheckCircleIcon style={{ color: "green", fontSize: "100px" }} />
        </Modal.Body>
        <Modal.Footer>
          <Button
            alignItems="center"
            variant="primary"
            onClick={handleShowSubmittedModal}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <div>
        {/* <CRow> */}
        {/* <CCol sm="1" md="1" lg="1" onClick={handleGoBack}><ArrowCircleLeftIcon /></CCol>
      <CCol sm="10" md="10" lg="10"><h1 className="title"><strong>Consent Form</strong></h1></CCol> */}
        {/* <CCol sm="1" md="1" lg="1"onClick={handleGoAhead}>< ArrowCircleRightIcon/></CCol> */}
        {/* <CCol><h1 className="title"><strong>Consent Form</strong></h1></CCol> */}
        {/* </CRow> */}

        {/* <h1 id="demo-radio-buttons-group-label" align="center">Consent Form</h1>  */}

        {/* <div style={{ display: 'flex', alignItems: 'center' }}>
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
    {connectedCareValue === "Yes" && (
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
        {/* </CRow>
        
      )}
      {!deviceIdPromptOpen && (
        <CRow>
          <CRow><CCol><h5 style={{fontFamily:'sans-serif', color:'red'}}>We are assigning you a new id and {assignNewDeviceIdAndShare()}</h5></CCol></CRow><br/>
        </CRow>
      )}
    </div>
    )}
    <br/>  */}
        {/* <h4 style={{fontFamily:'sans-serif'}}>Consent</h4> */}
        {(sessionStorage.getItem("Patient_name") !== null) && (
          <div>
        <CRow>
          <CCol className="navbar justify-content-between">
            <p className="navbar-brand">
              <b>Provide your consent</b>
            </p>
          </CCol>
        </CRow>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
          value={consentValue}
          onChange={handleConsentChange}
        >
          {" "}
          <CRow>
            <CCol></CCol>
            <CRow>
              <CCol>
                <FormControlLabel
                  value="Do"
                  control={<Radio />}
                  // disabled={sessionStorage.getItem('Patient_name') === null}
                  label="I give my consent to share my EHR records with practitioner as well as provider ."
                />
              </CCol>
            </CRow>
            <br />
            <br />
            <CCol></CCol>
            <CRow>
              <CCol>
                <FormControlLabel
                  value="Do partial"
                  control={<Radio />}
                  // disabled={sessionStorage.getItem('Patient_name') === null}
                  label="I give my consent to share my EHR records with practitioner as well as provider for a period of 15 days post completion of my appointment . "
                />
              </CCol>
            </CRow>
            <br />
            <br />
            <CCol></CCol>
            <CRow>
              <CCol>
                <FormControlLabel
                  value="Do not"
                  control={<Radio defaultValue="true" />}
                  label="I will share my records with practitioner during the visit."
                />
              </CCol>
            </CRow>
          </CRow>
        </RadioGroup>
        <br />
        </div> )}
        {/* <form className="signature-pad-form">
      <h4 style={{fontFamily:'sans-serif'}}>Signature</h4>
      <CRow><CCol></CCol><CRow><CCol><Signature/></CCol></CRow></CRow>
      </form>   */}

        <div align="center">
          <button class="btn btn-primary" onClick={handlepreview}>
            Preview
          </button>
        </div>
      </div>
    </>
  );
}
