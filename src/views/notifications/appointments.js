import React, { useEffect, useRef, useState } from 'react'
import { Layout, Menu, Input } from 'antd';
// import './PatientInfo.css';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import 'react-toastify/dist/ReactToastify.css';
import { alpha } from '@material-ui/core/styles';
import emailjs from '@emailjs/browser';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory, useLocation } from "react-router-dom";
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import LoadingOverlay from 'react-loading-overlay';
import { CBadge, CButton } from '@coreui/react';
import "../records/patients.css";
import { CModal } from '@coreui/react';
import { CModalFooter } from '@coreui/react';
import { CModalHeader } from '@coreui/react';
import { CModalTitle } from '@coreui/react';
import { CModalBody } from '@coreui/react';
import CryptoJS from 'crypto-js'
import {
  CCard,
  CCardBody,
  CCardGroup,
  CWidgetDropdown,
  CCol,
  CRow,
  CWidgetProgressIcon,
} from '@coreui/react'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import OutlinedInput from '@mui/material/OutlinedInput';
// import ForwardIcon from '@mui/icons-material/Forward';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
export default function Appointment() {
  const modalstyle = {
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    };
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        // height: 50,
        margin: theme.spacing(1),
      },
    },
    small: {
      width: theme.spacing(4),
      height: theme.spacing(4),
    },
    large: {
      width: theme.spacing(8),
      height: theme.spacing(8),
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.35),
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.5),
      },
      margin: '5px',
      float: 'right',
      boxShadow: '-4px 8px 20px 0px grey',
      width: '80%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: '50%',
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
      width: '60%',
      [theme.breakpoints.up('sm')]: {
        width: '100ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));

  const [data, setdata] = React.useState([]);
  const [collapsed, setcollapsed] = React.useState(false);
  const [searchTerm, setsearchTerm] = React.useState('');
  const [page, setpage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [ordPlaced, setordPlaced] = React.useState(5);
  const classes = useStyles();
  const history = useHistory();
  const [isLoading, setisLoading] = useState(true);
  const [PatientName, setPatientName] = React.useState('');
  const [personName, setPersonName] = React.useState([]);
  const [conditionName, setConditionName] = React.useState([]);
  const [modal, setModal] = useState(false);
  const [MRN, setMRN] = useState('');
  const [patientMrn, setpatientMrn] = useState('');
  const [decryptedMRN, setdecryptedMRN] = useState('');
  const [decryptedName, setdecryptedName] = useState('');
  const [decryptedEmail, setdecryptedEmail] = useState('');
  const [patientemail, setPatientEmail] = useState('');
  const [selectedOptions, setSelectedOptions] = useState();
  const [singlepatientid, setsinglepatientid] = useState('');
	// const [isLoading, setisLoading] = useState(true);
  const location = useLocation();
  const [orderDetails, setOrderDetails] = useState('');
  const [allPurchaseOrderDetails, setAllPurchaseOrderDetails] = useState('');
  const [posts, setPosts] = useState([]);
  const toggle = ()=>{
    setModal(!modal);
  }      

  let paramString = location.search.split('?')[1];
  console.log(paramString)

  useEffect(() => {
    
    if(paramString != undefined)
    {
      try{
        const secretKey = "hellotelehealth";
    
        var mrn = location.search.split('mabc=')[1].split('&')[0];
        setpatientMrn(mrn);
        
        let patientname = location.search.split('pabc=')[1].split('&')[0];
        setPatientName(patientname)
    
        let patientEmail = location.search.split('exyz=')[1].split('&')[0];
        setPatientEmail(patientEmail)
        
        setdecryptedMRN(CryptoJS.AES.decrypt(patientMrn, secretKey).toString(CryptoJS.enc.Utf8));
        setdecryptedName(CryptoJS.AES.decrypt(PatientName, secretKey).toString(CryptoJS.enc.Utf8));
        setdecryptedEmail(CryptoJS.AES.decrypt(patientemail, secretKey).toString(CryptoJS.enc.Utf8)); 
  
        localStorage.setItem("Patient_name",decryptedName)
        sessionStorage.setItem("Patient_name",decryptedName)
        localStorage.setItem("Patient_MRN",decryptedMRN)
        localStorage.setItem("Patient_email",decryptedEmail)
        }
        catch(err) {
          console.log(err)
        }	  
    }
	});
  

  useEffect(() => {
    if(paramString == undefined)
    {
    const res = fetch("https://appointmentbook-sh4iojyb3q-uc.a.run.app", {
      method: 'GET',
    }).then(resp => resp.json()
    ).then(response => {

      let final_data = new Array();
      let Patient_id_list = new Array();
      let Patient_list_index = -1;

      for (var i = 0; i < response.length; i++) {
        Patient_list_index = Patient_id_list.indexOf(response[i].Patient_id)
        if (Patient_list_index == -1) {
          final_data.push(response[i])
          Patient_id_list.push(response[i].Patient_id)
        } else {

          let lst_encounter = new Date(final_data[Patient_list_index].Encounter_start)
          let new_encounter = new Date(response[i].Encounter_start)

          if (new_encounter > lst_encounter) {
            final_data[Patient_list_index] = response[i]
          }
        }
      }
      setdata(final_data)
     
      console.log(data)
      setisLoading(false)
    }).catch(error => {
      console.log(error)
    });
  }
  }, [])

  console.log(data)

  const uniquePatientName = Array.from(new Set(data.map(item => JSON.stringify(item)))).map(item => JSON.parse(item));
  console.log(uniquePatientName)
  // const uniquePractitionerName = Array.from(new Set(final_data.map(item => JSON.stringify(item.Practitioner_name)))).map(item => JSON.parse(item));
  const handleChangePage = (event, newPage) => {
    setpage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setpage(0);
  };

  const senddata = (name, doctor, guardian_email) => {
    var url = `/notifications?Patient_name=${name}&doctor=${doctor}`;
    history.push(`${url}`);
  }
  

  const handleGoBack = () => {
    var url = `/notifications/Consent`;
    history.push(`${url}`); //url from OPE team
  };

  const handleGoAhead = () => {
    var url = `/Practitionerbookings`;
    history.push(`${url}`);
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(value)
    // localStorage.setItem("Patient_name",value)
    console.log("selected patient", value)
    let selectedPatientData= data.filter(temp => temp.Patient_name==value);
    // console.log(selectedPatientData.);
    setMRN(selectedPatientData[0].Medical_Record_Number);
    // setpatientemail(selectedPatientData[0].)
    localStorage.setItem("Patient_name",selectedPatientData[0].Patient_name);
    localStorage.setItem("Patient_MRN",selectedPatientData[0].Medical_Record_Number);
    localStorage.setItem("Patient_email","telehealthgcp@gmail.com")
  };

  // const slots = [{ slot: '9 AM - 10 AM' }, { slot: '10 AM - 11 AM' }, { slot: '11 AM - 12 PM' }, { slot: '12 PM - 1 PM' }, { slot: '1 PM - 2 PM' }, { slot: '2 PM - 3 PM' }, { slot: '3 PM - 4 PM' }, { slot: '4 PM - 5 PM' }];
  
  const condition_name = [
    {condition:'Prediabetes', code:'15777000'},
    {condition:'Diabetes',code:'44054006'},
    {condition:'Viral sinusitis (disorder)',code:'444814009'},
    {condition:'Acute viral pharyngitis (disorder)',code:'195662009'},
    {condition:'Acute bronchitis (disorder)',code:'10509002'},
    {condition:'Anemia (disorder)',code:'271737000'},
    {condition:'Body mass index 30+ - obesity (finding)',code:'162864005'},
    {condition:'Hypertension',code:'59621000'},
    {condition:'Chronic sinusitis (disorder)',code:'40055000'},
    {condition:'Miscarriage in first trimester',code:'19169002'},
    {condition:'Normal pregnancy',code:'72892002'},
    {condition:'Streptococcal sore throat (disorder)',code:'43878008'},
    {condition:'Otitis media',code:'65363002'},
    {condition:'Hyperlipidemia',code:'55822004'},
    {condition:'Sprain of ankle',code:'44465007'}
    ]
  
    const redirecttoPractitionerbooking = (e, condition,code) => {
    localStorage.setItem('condition_name', condition);
    localStorage.setItem('condition_code', code);

    if(personName!="" || decryptedName!=""){
      var url = `/Practitionerbookings?condition=${condition}`;
      history.push(`${url}`);
    }
    else{
      setModal(!modal);
      console.log(modal);  
    }
  }
 
  return (
    <div> 
      <CModal
        show={modal}
        onClose={toggle}>
        <CModalHeader closeButton>Please select a Patient</CModalHeader>
        <CModalBody>
          Choose the Patient before selecting the condition...
        </CModalBody>
        <CModalFooter>
          {/* <CButton color="primary">Do Something</CButton>{' '} */}
          <CButton
            color="primary"
            onClick={toggle}
          >Ok</CButton>
        </CModalFooter>
      </CModal>

        <CRow>
        <CCol sm="1" md="1" lg="1" onClick={handleGoBack}><b><ArrowCircleLeftIcon/></b></CCol>
        <CCol sm="10" md="10" lg="10" ><h2 className="title"><strong>Book Appointment</strong></h2><br/></CCol>
        <CCol sm="1" md="1" lg="1" onClick={handleGoAhead}><b><ArrowCircleRightIcon/></b></CCol>
        </CRow>
        <CRow>
        {decryptedName && (
          <>
          <CCol sm="4" md="6" lg="4" sx={{ minWidth: 250 }}>
            <div className="navbar justify-content-between">
              <p className="navbar-brand"><b>Patient Name: </b></p> 
            </div>
          </CCol>:
            <CCol sm="8" md="6" lg="8" >
               <FormControl >
               <InputLabel id="demo-simple-select-label"><b>{decryptedName}</b></InputLabel>
               </FormControl>  
            </CCol>
          </>
          )} 
           {!decryptedName && (
            <>
             <CCol sm="4" md="6" lg="4" sx={{ minWidth: 250 }}>
             <div className="navbar justify-content-between">
               <p className="navbar-brand"><b>Select Patient Name: </b></p> 
               </div>
           </CCol>
            <CCol sm="8" md="6" lg="6" >
                <FormControl sx={{ minWidth: 400}}>
                <InputLabel labelid="demo-simple-select-label">Patient Name</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Patient Name" onChange={handleChange}>
                {uniquePatientName.map((row,index)=>{
                  return( <MenuItem value={row.Patient_name}>{row.Patient_name}</MenuItem>)
                })} 
                </Select>
                </FormControl>  
            </CCol>
            </>
          )} 
          <CCol sm="4" md="6" lg="4" sx={{ minWidth: 250 }}>
            <span className="navbar justify-content-between">
              <p className="navbar-brand"><b>Medical Record Number: </b></p>
              </span>
          </CCol>
          <CCol sm="8" md="6" lg="6">
            <span className="navbar justify-content-between">
              <p className="navbar-brand"> 
              {MRN && (
              <b>{MRN}</b>
              )}</p>
            </span>
          </CCol>
          
          {decryptedMRN && (
          <CCol sm="4" md="6" lg="6">
            <span className="navbar justify-content-between">
              <p className="navbar-brand">{decryptedMRN}</p> 
            </span>
          </CCol>
          )}

          
        </CRow>
        <CRow>
          <CCol  >
            <span className="navbar justify-content-between">
              <div sm="4" md="4" lg="3" className="navbar-brand" sx={{ minWidth: 230 }}><b>Select your Condition:</b></div> 
            {/* </span> 
          </CCol>
          <CCol > 
            <span> */}
              <div sm="1" md="1" lg="1" className={classes.search}>
                <div sm="7" md="7" lg="8" className={classes.searchIcon}>
                  <SearchIcon />
                </div>
              <InputBase
                placeholder="Search by Condition Name..."
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                onChange={(e) => { setsearchTerm(e.target.value) }}
                inputProps={{ 'aria-label': 'search' }}
              />
              </div>
            </span>
            </CCol>
        </CRow>
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
        <CRow>
          {condition_name.filter(val=>{
            if(searchTerm === "")
            {
              return val;
            }
            else if((val.condition.toLowerCase().includes(searchTerm.toLowerCase())))
            {
              return val
            }})
            .map((row,index)=>{
            return(
            <CCol sm="12" md="8" lg="4">
              <CWidgetDropdown type='button' color="gradient-info" text={row.condition} onClick={(e)=>{
                redirecttoPractitionerbooking(e, row.condition, row.code)
                }} style={{minHeight:'80px', fontSize:'16px', cursor:'pointer'}}>
                  <ArrowForwardIosIcon/>
              </CWidgetDropdown>
            </CCol>
            )
          })}
        </CRow>
        
			</LoadingOverlay>
    </div>
    )
}