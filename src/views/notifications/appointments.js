import React, { useEffect, useRef, useState } from 'react'
import { Layout, Menu, Input } from 'antd';
import './PatientInfo.css';
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
import OutlinedInput from '@mui/material/OutlinedInput';



const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function EmailNotify() {
  const modalstyle = {
    position: 'absolute',
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
      width: '50%',
      [theme.breakpoints.up('sm')]: {
        width: '100ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));

  // function getStyles(name, personName, theme) {
  //   return {
  //     fontWeight:
  //       personName.indexOf(name) === -1
  //         ? theme.typography.fontWeightRegular
  //         : theme.typography.fontWeightMedium,
  //   };
  // }

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

  // const handleChange = (event) => {
  //   setPatientName(event.target.value);
  // };

  useEffect(() => {
    const res = fetch("https://applicationbooking-sh4iojyb3q-uc.a.run.app", {
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
      // const uniquePatientName = Array.from(new Set(final_data.map(item => JSON.stringify(item.Patient_name)))).map(item => JSON.parse(item));
      // const uniquePractitionerName = Array.from(new Set(final_data.map(item => JSON.stringify(item.Practitioner_name)))).map(item => JSON.parse(item));


      console.log(data)
      setisLoading(false)
    }).catch(error => {
      console.log(error)
    });
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
  var name="";
  const handleChange = (event) => {

    name=event.target.value;
    console.log(name);
    // const {
    //   target: { value },
    // } = event;
    // console.log(value);
    // setPersonName(
    //   // On autofill we get a stringified value.
    //   typeof value === 'string' ? value.split(',') : value,
    // );
    // console.log(value);
    // let {name, value} = event.target;
    // console.log(value);
  };

  const slots = [{ slot: '9 AM - 10 AM' }, { slot: '10 AM - 11 AM' }, { slot: '11 AM - 12 PM' }, { slot: '12 PM - 1 PM' }, { slot: '1 PM - 2 PM' }, { slot: '2 PM - 3 PM' }, { slot: '3 PM - 4 PM' }, { slot: '4 PM - 5 PM' }];
  const condition_name = [{condition:'Prediabetes - Insulin resistance'},{condition:'Diabetes'},{condition:'Viral sinusitis (disorder)'},{condition:'Acute viral pharyngitis (disorder)'},{condition:'Acute bronchitis (disorder)'},{condition:'Anemia (disorder)'},{condition:'Body mass index 30+ - obesity (finding)'},{condition:'Hypertension'},{condition:'Chronic sinusitis (disorder)'},{condition:'Miscarriage in first trimester'},{condition:'Normal pregnancy'},{condition:'Streptococcal sore throat (disorder)'},{condition:'Otitis media'},{condition:'Hyperlipidemia'},{condition:'Sprain of ankle'}]

  const redirecttoPractitionerbooking = (e, condition) => {
    if(name!=""){
      var url = `/Practitionerbookings?condition=${condition}`;
    history.push(`${url}`);
    }
    else{
      window.alert("Select a Name.")
    }
    
  
  }
  
  return (
    <div>  
        <h1 className="title" align="center"><strong>Book Appointment</strong></h1><br/>
        <CRow>
          <CCol >
        <span className="navbar justify-content-between">
        <p className="navbar-brand"><b>Select Patient Name: </b></p> 
        </span>
        </CCol>
        <CCol >
          <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="demo-simple-select-label">Patient Name</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Age"
            onChange={handleChange}
          >
            {uniquePatientName.map((row,index)=>{
              return(
                <MenuItem value={row.Patient_name}>{row.Patient_name}</MenuItem>
              )
            })} 
          </Select>
        </FormControl>
        </CCol>
        </CRow>
        
      <div sm="8" md="8" lg="8">
        <div className={classes.search}>
            <div className={classes.searchIcon}>
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
      </div>
        
        <span className="navbar justify-content-between">
          <p className="navbar-brand"><b>Select your Condition:</b></p> 
        </span>
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
              <CWidgetDropdown type='button' color="gradient-info" text={row.condition} onClick={(e)=>redirecttoPractitionerbooking(e, row.condition)} style={{padding:'5%', fontSize:'16px', cursor:'pointer'}}><ArrowForwardIosIcon/></CWidgetDropdown>
            </CCol>
            )
          })}
        </CRow>
      </div>
  )
}