import React, { useEffect, useRef, useState } from 'react'
import { Layout, Menu, Input } from 'antd';
import './PatientInfo.css';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import MenuItem from '@mui/material/MenuItem';
import CIcon from '@coreui/icons-react';
import 'react-toastify/dist/ReactToastify.css';
import { alpha } from '@material-ui/core/styles';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import emailjs from '@emailjs/browser';
import FormControl from '@mui/material/FormControl';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory, useLocation } from "react-router-dom";
import LoadingOverlay from 'react-loading-overlay';
import "../records/patients.css";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import TextField from '@mui/material/TextField';
import { CModal } from '@coreui/react';
import { CModalFooter } from '@coreui/react';
import { CModalHeader } from '@coreui/react';
import { CModalTitle } from '@coreui/react';
import { CModalBody } from '@coreui/react';
import { CButton } from '@coreui/react';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
import {
  CCard,
  CCardBody,
  CCardGroup,
  CWidgetDropdown,
  CCol,
  CRow,
  CWidgetProgressIcon,
  CCardText,
} from '@coreui/react'


export default function PractitionerBooking() {
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
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
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.35),
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.5),
      },
      margin: '10px',
      float: 'right',
      boxShadow: '-4px 8px 20px 0px grey',
      width: '50%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: '98%',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '100ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));
  const StyledTableCell = withStyles((theme) => ({
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

  const [data, setdata] = React.useState([]);
  const [finaldata, setfinaldata] = React.useState([]);
  const [finalprac, setpracdata] = React.useState([]);
  const history = useHistory();
  const [isLoading, setisLoading] = useState(true);
  const [providername, setProvidername] = useState();
  const [selectedDate, setDate] = React.useState('');
  const [selectedTime, setTime] = React.useState('');
  const [modal, setModal] = useState(false);

  const toggle = ()=>{
    setModal(!modal);
  }
  var stat, flags, Pname, conditionName;
  const location = useLocation();

  const [selectedProvider, setselectedprovider] = React.useState("");
  const [selectedSlot, setselectedslot] = React.useState("");
  var provider = "";

  useEffect(() => {
    flags = location.search.split('^')[1];
    conditionName = location.search.split('=')[1].split('%')[0];
    console.log("condition",conditionName)
    
    Pname = sessionStorage.getItem('Patient');
    console.log(Pname, conditionName)
    // setval({name:Pname, condition:conditionName})
    //setCName(conditionName)
    // console.log("state",val)
    
    const res = fetch("https://appointmentbook-sh4iojyb3q-uc.a.run.app ", {
      method: 'GET',
    }).then(resp => resp.json()
    ).then(response => {


      let Provider_id_list = new Array();
      let Provider_list_index = -1;
      let Patient_condition = "";
      var final_data = new Array();
      console.log(response);
      for (var i = 0; i < response.length; i++) {
        // console.log(response[i]);
        Provider_list_index = Provider_id_list.indexOf(response[i].Provider_id)
        if (Provider_list_index == -1 && response[i].Condition_name == conditionName) {
          final_data.push(response[i])
          // console.log(response[i]) 
          Provider_id_list.push(response[i].Provider_id)
        }
      }

      console.log(final_data)
      setfinaldata(final_data);
      setpracdata(final_data);
      setisLoading(false)

    }).catch(error => {
      console.log(error)
    });
  }, [])

  console.log(finaldata);
  const uniqueProviderName = Array.from(new Set(finaldata.map(item => JSON.stringify(item.Provider_name)))).map(item => JSON.parse(item));
  console.log(uniqueProviderName);
  // const uniquePatientName = Array.from(new Set(final_data.map(item => JSON.stringify(item.Patient_name)))).map(item => JSON.parse(item));
  // const uniquePractitionerName = final_prac.map(item => JSON.stringify(item.Practitioner_name)).map(item => JSON.parse(item));

  // const handleChangePage = (event, newPage) => {
  //   setpage(newPage);
  // };

  // const handleChangeRowsPerPage = event => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setpage(0);
  // };

  const senddata = async() => {
    var myHeaders = new Headers();
    var accessToken = localStorage.getItem('Accesstoken')
      myHeaders.append("Authorization", "Bearer "+ accessToken);
      myHeaders.append("Content-Type", "application/json");
      
      var raw = JSON.stringify({
        "App_Date": "0001-01-01",
        "Provider_id": "80e919cc-df1a-3838-b75e-541564a286e5",
        "Provider_name": providername,
        "Time_9_AM_10_AM": false,
        "Time_10_AM_11_AM": false,
        "Time_11_AM_12_PM": false,
        "Time_12_PM_1_PM": false,
        "Time_1_PM_2_PM": false,
        "Time_2_PM_3_PM": false,
        "Time_3_PM_4_PM": false,
        "Time_4_PM_5_PM": false,
        "Condition_code": "44465007",
        "Condition_name": conditionName,
        "Patient_name": Pname,
        "Patient_id": "003abc72-a814-4a81-bff1-ce6a54b0ce39",
        "Practitioner_id": "0000016d-3a85-4cca-0000-000000000226",
        "Practitioner_Speciality": "Orthopedic Specialist",
        "Practitioner_name": "Dr. Lanny Huels",
        "MRN": "003abc72-a814-4a81-bff1-ce6a54b0ce39"        
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
        body: raw,
        redirect: 'follow'
      };
      
      fetch("https://function-2-sh4iojyb3q-uc.a.run.app", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
  }

  const redirecttoConsent= () => {
    if (selectedProvider != "" && selectedDate != "" && selectedTime != "") {

    senddata()
      
    var url = `/notifications/Consent`;
    history.push(`${url}`);
    // console.log(selectedProvider);
    // console.log(selectedSlot);

    //   emailjs.send(
    //     "service_pgn5fn9",
    //     "template_03mdlrh",
    //     { name: name, doctor: doctor, email: guardian_email },
    //     'xQEzOVKLaHBEVtXtA')
    //     .then(function (response) {
    //       console.log('SUCCESS!', response.status, response.text);
    //       toast.success("Appointment is for " + name + " is scheduled with " + doctor + " = and mail for collecting the document has been sent.");
    //       senddata(name, doctor, guardian_email);
    //     }, function (error) {
    //       console.log('FAILED...', error);
    //       // alert(error)
    //     });
    }
    else {
      setModal(!modal);
      console.log(modal);  
    }
  };

  const handleChangeSlot = (event) => {
    console.log(event.target.value);
    setselectedslot(event.target.value);
    var final_prac = new Array();
    let Prac_id_list = new Array();
    let Prac_list_index = -1;
    for (var i = 0; i < finalprac.length; i++) {
      // console.log(response[i]);
      Prac_list_index = Prac_id_list.indexOf(finalprac[i].Practitioner_id)
      console.log(finalprac[i][event.target.value]);
      if (Prac_list_index == -1 && finalprac[i][event.target.value] == false) {
        final_prac.push(finalprac[i])
        // console.log(response[i]) 
        Prac_id_list.push(finalprac[i].Practitioner_id)
      }
    }
    setpracdata(final_prac);

  }

  const handleChange = (event) => {
    setselectedprovider(event.target.value);
    provider = event.target.value;
    console.log(provider);
    setProvidername(provider)
    var final_prac = new Array();
    let Prac_id_list = new Array();
    let Prac_list_index = -1;
    for (var i = 0; i < finaldata.length; i++) {
      // console.log(response[i]);
      Prac_list_index = Prac_id_list.indexOf(finaldata[i].Practitioner_id)
      if (Prac_list_index == -1 && finaldata[i].Provider_name == provider) {
        final_prac.push(finaldata[i])
        // console.log(response[i]) 
        Prac_id_list.push(finaldata[i].Practitioner_id)
      }
    }
    setpracdata(final_prac);
  };

  // const minTime = (new Date('9:00 AM'));
  // const maxTime = (new Date('05:00 PM'));
  const slots = [{ colname: 'Time_9_AM_10_AM', slot: '9 AM - 10 AM' }, { colname: 'Time_10_AM_11_AM', slot: '10 AM - 11 AM' }, { colname: 'Time_11_AM_12_PM', slot: '11 AM - 12 PM' }, { colname: 'Time_12_PM_1_PM', slot: '12 PM - 1 PM' }, { colname: 'Time_1_PM_2_PM', slot: '1 PM - 2 PM' }, { colname: 'Time_2_PM_3_PM', slot: '2 PM - 3 PM' }, { colname: 'Time_3_PM_4_PM', slot: '3 PM - 4 PM' }, { colname: 'Time_4_PM_5_PM', slot: '4 PM - 5 PM' }];
  return (
    <div>
       <CModal
        show={modal}
        onClose={toggle}
      >
        <CModalHeader closeButton>Please select the Provider and Available slots</CModalHeader>
        <CModalBody>
          Choose the Hospital and Available slots before selecting the practitioner...
        </CModalBody>
        <CModalFooter>
          {/* <CButton color="primary">Do Something</CButton>{' '} */}
          <CButton
            color="primary"
            onClick={toggle}
          >Ok</CButton>
        </CModalFooter>
      </CModal>
      <h1 className="title"><strong>Practitioner Information</strong></h1><br/><br/>
      <CRow>
        <CCol>
          <FormControl sx={{ minWidth: 300 }}>
            <InputLabel id="demo-simple-select-label">Provider Name</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Age"
              onChange={handleChange}
            >
              {uniqueProviderName.map((row, index) => {
                return (
                  <MenuItem value={row}>{row}</MenuItem>
                )
              })}
            </Select>
          </FormControl>
        </CCol>
        
        <CCol style={{marginLeft: '37%'}}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            label="Available Date"
            inputFormat="DD/MM/YYYY"
            value={selectedDate}
            disablePast={true}
            onChange={(newDate) => {
              console.log(newDate);
              setDate(newDate);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        </CCol>

        <CCol>
          <LocalizationProvider dateAdapter={AdapterDayjs}> 
            <TimePicker
            label="Available Time"
            value={selectedTime}
            
            onChange={(newTime) => {
              console.log(newTime);
              setTime(newTime);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
          {/* <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            label="Availability slots"
            value={value}
            disablePast={true}
            onChange={(newValue) => {
              console.log(newValue);
              setValue(newValue);
            }}
          /> */}
        </LocalizationProvider>
        </CCol>
      </CRow>
      <span className="navbar justify-content-between">
        <p className="navbar-brand"><b>Select Practitioner</b></p>
      </span>

      <LoadingOverlay
        active={isLoading}
        spinner
        text='Loading the content...'
        styles={{
          height: "100%",
          spinner: (base) => ({
            ...base,
            width: '50px',
            '& svg circle': {
              stroke: 'rgba(255, 0, 0, 0.5)'
            }
          })
        }}
      >
      </LoadingOverlay>

      {finalprac.map((row, index) => {
        return (

          <CCardGroup className="mb-4 ">
            <CWidgetProgressIcon
              color="gradient-success"
              inverse
              text={row.practitioner_email}
              style={{ color: 'white' }}
            >

              <CIcon name="cil-userFollow" style={{ float: 'left' }} height="36" />
              <p style={{ fontSize: '75%', textAlign: 'left', marginLeft: "50px" }}>{row.Practitioner_name}</p>

              <p style={{ fontSize: '50%', textAlign: 'left' }}>{row.Practitioner_Speciality}</p>
              <span><button type="button" className="btn btn-secondary btn-sm" style={{ cursor: 'pointer', padding: '1%', fontWeight: 'bolder' }} onClick={(e) => { redirecttoConsent(e,row.Patient_name, row.Practitioner_name, row.guardian_email) }}>Select</button></span>
            </CWidgetProgressIcon>
          </CCardGroup>
        )
      })}
    </div>
  )
}
