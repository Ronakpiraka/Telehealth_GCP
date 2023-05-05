import React, { useEffect, useRef, useState } from "react";
import "./PatientInfo.css";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import MenuItem from "@mui/material/MenuItem";
import CIcon from "@coreui/icons-react";
import "react-toastify/dist/ReactToastify.css";
import { alpha } from "@material-ui/core/styles";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { useHistory, useLocation } from "react-router-dom";
import LoadingOverlay from "react-loading-overlay";
import "../records/patients.css";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import TextField from "@mui/material/TextField";
import { CModal } from "@coreui/react";
import { CModalFooter } from "@coreui/react";
import { CModalHeader } from "@coreui/react";
import { CModalBody } from "@coreui/react";
import { CButton } from "@coreui/react";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import PatientAppointment from "../notifications/PatientAppointments";
import Consent from "../notifications/Consent.js";
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import Map from './Markers'
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
// import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
// import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
// import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";


import {
  Modal,
  CCard,
  CCardBody,
  CCardGroup,
  CWidgetDropdown,
  CCol,
  CRow,
  CWidgetProgressIcon,
  CCardText,
} from "@coreui/react";
import DatePicker from 'react-datepicker/dist/react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Day } from "@syncfusion/ej2-schedule";

export default function PractitionerBooking() {
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    large: {
      width: theme.spacing(6),
      height: theme.spacing(6),
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.35),
      "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.5),
      },
      margin: "10px",
      float: "right",
      boxShadow: "-4px 8px 20px 0px grey",
      width: "50%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "98%",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "100ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));
  // const StyledTableCell = withStyles((theme) => ({
  //   body: {
  //     fontSize: 14,
  //   },
  // }))(TableCell);
  // const StyledTableRow = withStyles((theme) => ({
  //   root: {
  //     "&:nth-of-type(odd)": {
  //       backgroundColor: theme.palette.action.hover,
  //     },
  //   },
  // }))(TableRow);
  // const StyledTableCell = withStyles((theme) => ({
  //   body: {
  //     fontSize: 14,
  //   },
  // }))(TableCell);
  // const StyledTableRow = withStyles((theme) => ({
  //   root: {
  //     "&:nth-of-type(odd)": {
  //       backgroundColor: theme.palette.action.hover,
  //     },
  //   },
  // }))(TableRow);

  // dayjs.extend(utc);
  // dayjs.extend(timezone);
  // dayjs.extend(localizedFormat);
  // dayjs.extend(utc);
  // dayjs.extend(timezone);
  // dayjs.extend(localizedFormat);

  const [data, setdata] = React.useState([]);
  
  const [isLoad, setisLoad] = useState(true);
  const [isLoading, setisLoading] = useState(true);
  const [finaldata, setfinaldata] = React.useState([]);
  const [finalprac, setpracdata] = React.useState([]);
  const [modal, setModal] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = React.useState();
  const [newDateTime, setnewDateTime] = React.useState();
  const [selectedDate, setSelectedDate] = React.useState();
  const [selectedTime, setSelectedTime] = React.useState();
  const [timeslot, settimeslot] = React.useState([]);
  const [pincode, setPincode] = useState('');
  // const [selectedCard, setSelectedCard] = useState(null);
  // const history = useHistory();
  const [providername, setProvidername] = useState();
  // const [selectedTime, setTime] = React.useState("");
  const [selectedProvider, setselectedprovider] = React.useState("");
  const [selectedSlot, setSelectedSlot] = React.useState("");
  const [showModal, setShowModal] = useState(false);
  const [availableSlots, setavailableSlots] = React.useState("");
  const [matchedSlot, setMatchedSlot] = useState("");
  const [locations, setlocations] = useState("");
  const [enteredTime, setEnteredTime] = useState("");


  var stat, flags, Pname, conditionName;
  const location = useLocation();
  var provider = "";

  const toggle = () => {
    setModal(!modal);
  };


  useEffect(() => {
    fetch("https://emailnotifications-sh4iojyb3q-uc.a.run.app", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        response.sort((a, b) => {
          // Sorted the response array by condition name and then by practitioner name
          if (a.App_Date < b.App_Date) return -1;
          if (a.App_Date > b.App_Date) return 1;
          return 0;
        });

        setdata(response);
        console.log("data", response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log('ayaya', data)

  useEffect(() => {
    if (checkccfunction() === 1 && isLoad == false) {
      console.log("this is activated", isLoad)
      handleDateTimeChange(dayjs().add(1, 'hour').startOf('hour'));
      // selectpractitioner();
    }
  }, []);

  useEffect(() => {
    fetch("https://appointmentbook-sh4iojyb3q-uc.a.run.app")
      .then((response) => response.json())
      .then((data) => {
        // Create an object to store the unique data
        const uniqueData = {};

        // Loop through the data and add the first entry for each unique practitioner ID
        data.forEach((row) => {
          if (!uniqueData[row.Practitioner_id]) {
            uniqueData[row.Practitioner_id] = row;
          }
        });

        const newFinalData = Object.values(uniqueData);

        setfinaldata(newFinalData);
        setisLoad(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log("here is finaldata", finaldata);

  const redirecttoConsent = () => { };

  const checkccfunction = () => {
    if (localStorage.getItem('connectedCareValue') === 'Yes') {
      console.log('ayeayeayeaye',localStorage.getItem('connectedCareValue'))
      return 1;
    }
    else {
      return 0;
    }
  };

  const handleDateTimeChange = (newDateTime) => {
    setSelectedDateTime(""); // reset the selected slot state

    if (!newDateTime) {
      setSelectedDateTime(null);
      localStorage.removeItem("selectedDateTime");
      return;
    }
    console.log('newdatetime', newDateTime);  
    // console.log('selected date time', selectedDateTime);

    const today = dayjs().startOf("day");
    const dateTime = newDateTime; // convert the selected date-time to the Indian time zone
    console.log('dateTime', dateTime);
    
    if (dateTime.isBefore(today) || dateTime.isAfter(today.add(2, "month"))) {
      // if the selected date-time is not within the range of today and the next two months
      alert(
        "Please select a date that is greater than today and not more than 2 months from today."
      );
      setSelectedDateTime(""); // reset the selected date-time state to null
      localStorage.removeItem("selectedDateTime");
      return;
    }

    const selectedDate = dateTime.startOf("day").format("YYYY-MM-DD");
    setSelectedDate(selectedDate); // set the selected date state to the formatted date string
    localStorage.setItem("selectedDate", selectedDate); // store the selected date in local storage

    setSelectedTime(dateTime.toISOString()); // set the selected date-time state
    // localStorage.setItem("selectedTime", selectedTime ); // store the selected date-time in local storage

    const [selectedHour, selectedMinute] = dateTime.format("HH:mm").split(":"); // get the selected hour and minute
    localStorage.setItem("selectedHour", selectedHour);
    const slabhour = parseInt(selectedHour)
    let slab;
    if ([9, 10, 11, 12, 13, 14, 15, 16].includes(slabhour)) {
      slab = "A";
    } else if ([17, 18, 19, 20, 21, 22, 23, 0].includes(slabhour)) {
      slab = "B";
    } else if ([1, 2, 3, 4, 5, 6, 7, 8].includes(slabhour)) {
      slab = "C";
    }
    localStorage.setItem("selectedSlab", slab)
    selectpractitioner(selectedDate, selectedHour, slab);
  };


  const selectpractitioner = (date, hour, slab) => {
    const condition = localStorage.getItem("condition_name");
    // const date = localStorage.getItem("selectedDate");
    // const hour = localStorage.getItem("selectedHour");
    // const slab = localStorage.getItem("selectedSlab");
    console.log('justcheck', condition, date, hour, slab);
    let array1 = [];
    let array2 = [];
    let array3 = [];

    array1 = finaldata.filter(row => row.Condition_name === condition && row.Practitioner_Slot === slab);

    array2 = data.filter(item => item.Condition_name === condition && item.App_Date === date && item.Timing === hour && item.slot === slab);

    // Loop through each element in array1 and check if it exists in array2
    for (let i = 0; i < array1.length; i++) {
      const found = array2.find(item => item.Practitioner_id === array1[i].Practitioner_id);
      if (!found) {
        array3.push(array1[i]);
      }
    }

    console.log("1st array", array1);
    console.log("2nd array", array2);
    console.log("3rd array", array3);
    setpracdata(array3);
    localStorage.setItem("prac_map",finalprac)
    setisLoading(false);
    return array3;
  }

  console.log('final prac data', finalprac);

  // const handlezipSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(pincode); // replace with your desired action, e.g. submit to server
  // }

  // const handleTimePickerChange = (newValue) => {
  //   setSelectedSlot(newValue);
  //   localStorage.setItem('selectedSlot', newValue);
  // }

  return (
    <div>
      <CModal show={modal} onClose={toggle}>
        <CModalHeader closeButton>
          Please select the Provider and Practitioner
        </CModalHeader>
        <CModalBody>
          Choose the Hospital before selecting the Practitioner...
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={toggle}>
            Ok
          </CButton>
        </CModalFooter>
      </CModal>

      <CRow>
        <CCol>
          <h1 className="title">
            <strong>Practitioner Information</strong>
          </h1>
        </CCol>
      </CRow>
      <br />
      <h4 style={{ color: "indigo" }}>Condition Name : {localStorage.getItem("condition_name")} , Practitioner Speciality : {localStorage.getItem("condition_speciality")}</h4>
      {/* localStorage.setItem("practitioner_speciality", row.Practitioner_Speciality); */}

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['MobileDateTimePicker', 'MobileDateTimePicker']}>
          <MobileDateTimePicker
            label={'Date & Time'}
            openTo="hours"
            ampm={false}
            minutesStep={60}
            value={checkccfunction() === 1 ? dayjs().add(1, 'hour').startOf('hour') : newDateTime}
            disablePast={true}
            disableFuture = {checkccfunction() === 1}
            disabled =  {checkccfunction() === 1}
            onChange={handleDateTimeChange}
          />
        </DemoContainer>
      </LocalizationProvider>

      <br />
      <div>
        <Map
          containerElement={<div style={{ height: `500px`, width: "100%" }} />}
          mapElement={<div style={{ height: `100%` }} />}
          markers={finalprac}
        />
      </div>


      <CRow>
        <CCol className="navbar justify-content-between">
          <p className="navbar-brand">
            <b>Select Practitioner</b>
          </p>
        </CCol>
        <LoadingOverlay
          active={isLoading}
          spinner
          text="Loading the content..."
          styles={{
            height: "100%",
            spinner: (base) => ({
              ...base,
              width: "50px",
              "& svg circle": {
                stroke: "rgba(255, 0, 0, 0.5)",
              },
            }),
          }}
        ></LoadingOverlay>

        {finalprac.map((row, index) => {
          return (
            <CCol sm="6" md="6" lg="4">
              <CCardGroup
                className="mb-4"
                style={{
                  cursor: "pointer",
                }}
                onClick={(e) => {
                  redirecttoConsent(
                    e,
                    // row.Patient_name,
                    // row.guardian_email,
                    row.Practitioner_id,
                    row.Practitioner_name,
                    row.Practitioner_Slot,
                    row.practitioner_email,
                    row.Provider_id,
                    row.Provider_name,
                    row.Provider_address,
                    row.Provider_lat,
                    row.Provider_long,
                    row.Provider_contact_number,

                  );
                  localStorage.setItem("practitioner_id", row.Practitioner_id);
                  localStorage.setItem("practitioner_name", row.Practitioner_name);
                  localStorage.setItem("practitioner_speciality", row.Practitioner_Speciality);
                  localStorage.setItem("practitioner_email", row.practitioner_email);
                  localStorage.setItem("prac_slab", row.Practitioner_Slot);
                  localStorage.setItem("provider_id", row.Provider_id);
                  localStorage.setItem("provider_name", row.Provider_name);
                  localStorage.setItem("provider_lat", row.Provider_lat);
                  localStorage.setItem("provider_long", row.Provider_long);
                  localStorage.setItem("provider_contact", row.Provider_contact_number);
                }}
              >
                <CWidgetProgressIcon
                  color="gradient-success"
                  inverse
                  style={{ color: "black" }}
                >
                  <CIcon
                    name="cil-userFollow"
                    style={{ float: "left" }}
                    height="24"
                  />
                  <p style={{ fontSize: "50%", textAlign: "left", marginLeft: "25px", color: "indigo" }} > Practitioner Name: {row.Practitioner_name} </p>
                  <p style={{ fontSize: "35%", textAlign: "left", marginLeft: "25px", }} > Provider Name: {row.Provider_name} </p>
                  <p style={{ fontSize: "35%", textAlign: "left", marginLeft: "25px", }} > Address: {row.Provider_address} </p>
                  <p sx={{ minWidth: "10 rem", display: "flex", justifyContent: "space-between", marginLeft: "25px" }}
                    style={{ fontSize: "30%", textAlign: "left" }}>
                    {/* Speciality: {row.Practitioner_Speciality}  <br/> */}
                    <button type="button" className="btn btn-secondary btn-sm" style={{ cursor: "pointer", padding: "1%", fontWeight: "bolder", float: "right", }}>
                      Select
                    </button>
                    Practitioner email: {row.practitioner_email}
                  </p>
                </CWidgetProgressIcon>
              </CCardGroup>
            </CCol>
          );
        })}
      </CRow>

      <CRow>
        <CCol>
          <PatientAppointment />
        </CCol>
      </CRow>
      <CRow>
        <CCol>
          <Consent />
        </CCol>
      </CRow>
    </div>
  );
}

