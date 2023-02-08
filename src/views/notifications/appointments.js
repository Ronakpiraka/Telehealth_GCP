
import React, { useEffect, useRef, useState } from 'react';
import axios from "axios";
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
import LoadingOverlay from 'react-loading-overlay';
import { CBadge } from '@coreui/react';
import "../records/patients.css";

export default function EmailNotify() {
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
  const [bucketName, setBucketName] = useState("");
  const [status, setStatus] = useState("");
  const [collapsed, setcollapsed] = React.useState(false);
  const [searchTerm, setsearchTerm] = React.useState('');
  const [page, setpage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [ordPlaced, setordPlaced] = React.useState(5);
  const classes = useStyles();
  const history = useHistory();
  const [isLoading, setisLoading] = useState(true);
  const [PatientName, setPatientName] = React.useState('');
  const [result, setresult] = React.useState('');
  const handleChange = (event) => {
    setPatientName(event.target.value);
  };

  useEffect(() => {
    const res = fetch("https://patientpractitionerdata-sh4iojyb3q-uc.a.run.app", {
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
  }, [])

  console.log(data)

  // const uniquePatientName = Array.from(new Set(final_data.map(item => JSON.stringify(item.Patient_name)))).map(item => JSON.parse(item));
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

  var bucket_name = 'helloworld'
  const fetchAPI = ()=> {
    return fetch(`https://function-2-sh4iojyb3q-uc.a.run.app${bucket_name}`)
    .then((response) => response.json())
    .then((result) => {
    }
    )

    console.log(result);
  };

  const checkBucketExists = async (bucketName) => {
    try {
      const response = await axios.get(`/check-gcs-bucket/${bucketName}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

    const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("Checking if bucket exists...");
    const bucketExists = await checkBucketExists(bucketName);
    if (bucketExists) {
      setStatus(`Bucket "${bucketName}" already exists.`);
    } else {
      setStatus("Creating bucket...");
      try {
        await axios.post("/create-gcs-bucket", { bucketName });
        setStatus(`Bucket "${bucketName}" created.`);
      } catch (error) {
        setStatus("An error occurred while creating the bucket.");
        console.error(error);
      }
    }
  };
  const sendemail = (name, doctor, guardian_email) => {
    emailjs.send(
      "service_pgn5fn9",
      "template_03mdlrh",
      { name: name, doctor: doctor, email: guardian_email },
      'xQEzOVKLaHBEVtXtA')
      .then(function (response) {
        console.log('SUCCESS!', response.status, response.text);
        toast.success("Appointment is for " + name + " is scheduled with " + doctor +" =and mail for collecting the document has been sent.");
        senddata(name, doctor, guardian_email);
      }, function (error) {
        console.log('FAILED...', error);
        alert(error)
      });
  };

  const riskscore = (cluster_label) => {
    if (cluster_label === 0) {
      return (
        <CBadge color="warning" className="mfs-auto" fontSize='22px' align='center' >Low Risk</CBadge>
      )
    }
    else if (cluster_label === 2) {
      return (
        <CBadge color="danger" className="mfs-auto" fontSize='22px' align='center'>Critical Condition</CBadge>
      )
    }
    else {
      return (
        <CBadge color="info" className="mfs-auto" fontSize='22px' align='center' >Non - Critical Condition</CBadge>
      )
    }
  }
  const slots=[{slot:'9 AM - 10 AM'},{slot:'10 AM - 11 AM'},{slot:'11 AM - 12 PM'},{slot:'12 PM - 1 PM'},{slot:'1 PM - 2 PM'},{slot:'2 PM - 3 PM'},{slot:'3 PM - 4 PM'},{slot:'4 PM - 5 PM'}];

  // const submitappointment = async () =>{
  //   const mydata= {}
  //   var requestOptions = {
  //     method: 'POST',
  //     headers:{
  //       'Content-Type':'Json'
  //     },
  //     body: json.stringify(mydata)
  //   };

  //   const result = await fetch('apilink', requestOptions)
  //   const resultInJson = await result.json();

  // }

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <label htmlFor="bucket-name">Bucket name:</label>
      <input
        type="text"
        id="bucket-name"
        value={bucket_name}
        onChange={(event) => setBucketName(event.target.value)}
      />
      <button type="submit" onClick={fetchAPI}>Check and Create Bucket</button>
      <p>{status}</p>
    </form>
    
    <div>
      <h1 className="title"><strong>Book Appointment</strong></h1>

      <span className="navbar justify-content-between">
        <p className="navbar-brand"><b>Patient Details :</b></p>
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
      <div>
      <div style={{marginLeft:'5%'}}>
      <FormControl  sx={{ minWidth: 400 }} size="medium">
        <InputLabel id="demo-select-small">Condition</InputLabel>
        <Select>
          {data.map((row, index) => {
            return <MenuItem value={row.Condition_Name}>{row.Condition_Name}</MenuItem>
          })}
        </Select>
      </FormControl>
      <FormControl style={{position:'absolute', marginLeft:'40px'}} sx={{ minWidth: 400 }} size="medium">
        <InputLabel id="demo-select-small">Patient Name</InputLabel>
        <Select>
          {data.map((row, index) => {
            return <MenuItem value={row.Patient_name}>{row.Patient_name}</MenuItem>
          })}
        </Select>
      </FormControl>
      
      </div>
      <div style={{margin:'3% 5%'}}>
      <FormControl sx={{ minWidth: 830 }} size="medium">
        <InputLabel id="demo-select-small">Practitioner Name</InputLabel>
        <Select>
          {data.map((row, index) => {
            return <MenuItem value={row.Practitioner_name}>{row.Practitioner_name} ({row.Practitioner_Speciality})</MenuItem>
          })}
        </Select>
      </FormControl>
      </div>
      <div style={{marginLeft:'5%'}}>
      <FormControl sx={{ minWidth: 830 }} size="medium">
        <InputLabel id="demo-select-small">Slot Availability</InputLabel>
        <Select>
          {slots.map((row, index) => {
            return <MenuItem value={row.slot}>{row.slot}</MenuItem>
          })}
        </Select>
      </FormControl>
      </div>   
       <div style={{margin:'3% 20%'}}><button type="button"  className="btn btn-primary btn-lg" >Book Appointment</button></div> 
</div>
  

    </div>
  </div>
  )
} 