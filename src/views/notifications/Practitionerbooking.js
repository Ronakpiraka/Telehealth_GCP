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
  // const [slot, setslot] = React.useState([]);
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
  
  const redirecttoConsent= () => {
    if (selectedProvider != "" && selectedDate != "" && selectedSlot != "") {
      var url = `/notifications/Consent`;
      history.push(`${url}`);
    }
    else {
      setModal(!modal);
      console.log(modal);  
    }
  };
  const handleChangeSlot = (event) => {
    console.log(event.target.value);
    setselectedslot(event.target.value);
    if(event.target.value == '9 AM - 10 AM') { localStorage.setItem("Time_9_AM_10_AM", true)}
    if(event.target.value == '10 AM - 11 AM'){ localStorage.setItem("Time_10_AM_11_AM", true)}
    if(event.target.value == '11 AM - 12 PM'){ localStorage.setItem("Time_11_AM_12_PM", true)}
    if(event.target.value == '12 PM - 1 PM') { localStorage.setItem("Time_12_PM_1_PM", true)}
    if(event.target.value == '1 PM - 2 PM')  { localStorage.setItem("Time_1_PM_2_PM", true)}
    if(event.target.value == '2 PM - 3 PM')  { localStorage.setItem("Time_2_PM_3_PM", true)}
    if(event.target.value == '3 PM - 4 PM')  { localStorage.setItem("Time_3_PM_4_PM", true)}
    if(event.target.value == '4 PM - 5 PM')  { localStorage.setItem("Time_4_PM_5_PM", true)}
  }

  const handleChange = (event) => {
    setselectedprovider(event.target.value);
    provider = event.target.value;
    console.log(provider);
    setProvidername(provider)
    localStorage.setItem('provider_name', provider);
    var final_prac = new Array();
    let Prac_id_list = new Array();
    let Prac_list_index = -1;
    for (var i = 0; i < finaldata.length; i++) {
      // console.log(response[i]);
      Prac_list_index = Prac_id_list.indexOf(finaldata[i].Practitioner_id)
      if (Prac_list_index == -1 && finaldata[i].Provider_name == provider) {
        final_prac.push(finaldata[i])
        Prac_id_list.push(finaldata[i].Practitioner_id) 
        localStorage.setItem('provider_id',finaldata[i].Provider_id);
        localStorage.setItem('provider_contact_number',finaldata[i].Provider_contact_number);
      }
    }
    setpracdata(final_prac);
  };
  // useEffect(() => {
       
  //  },[])

  const slots = [{  slot: '9 AM - 10 AM' }, 
  { slot: '10 AM - 11 AM' }, 
  {  slot: '11 AM - 12 PM' }, 
  {  slot: '12 PM - 1 PM' }, 
  {  slot: '1 PM - 2 PM' }, 
  {  slot: '2 PM - 3 PM' }, 
  {  slot: '3 PM - 4 PM' }, 
  {  slot: '4 PM - 5 PM' }];

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
              localStorage.setItem('date', newDate);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        </CCol>
        <CCol>
        <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="demo-simple-select-label">Choose Time:</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Age"
              onChange={handleChangeSlot}
              // value={selectedTime}
            >
              {slots.map((row, index) => {
                return (
                  <MenuItem value={row.slot}>{row.slot}</MenuItem>
                )
              })}
            </Select>
          </FormControl>  
          
        </CCol>      
        {/* <CCol>
          <LocalizationProvider dateAdapter={AdapterDayjs}> 
            <TimePicker
            label="Available Time"
            value={selectedTime}
            
            onChange={(newTime) => {
              console.log(newTime);
              setTime(newTime);
              localStorage.setItem('timeslot', newTime);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        </CCol> */}

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
              <span><button type="button" className="btn btn-secondary btn-sm" style={{ cursor: 'pointer', padding: '1%', fontWeight: 'bolder' }} onClick={(e) => { 
                localStorage.setItem('practitioner_name', row.Practitioner_name);
                localStorage.setItem('practitioner_id',row.Practitioner_id);
                localStorage.setItem('practitioner_name',row.Practitioner_name);
                localStorage.setItem('practitioner_speciality',row.Practitioner_Speciality);
                localStorage.setItem('practitioner_email',row.practitioner_email);
                redirecttoConsent(e,row.Patient_name, row.Practitioner_name, row.guardian_email) }
                }>Select</button></span>
            </CWidgetProgressIcon>
          </CCardGroup>
        )
      })}
    </div>
  )
}
