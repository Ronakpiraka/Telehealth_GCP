import React, { useEffect, useRef, useState } from 'react'
import { Layout, Menu, Input } from 'antd';
import './PatientInfo.css';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CIcon from '@coreui/icons-react';
import 'react-toastify/dist/ReactToastify.css';
import { alpha } from '@material-ui/core/styles';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory, useLocation } from "react-router-dom";
import LoadingOverlay from 'react-loading-overlay';
import "../records/patients.css";
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
  const history = useHistory();
  const [isLoading, setisLoading] = useState(true);
  var stat, flags;
  const location = useLocation();

  // const handleChange = (event) => {
  //   setPatientName(event.target.value);
  // };

  useEffect(() => {
    flags = location.search.split('^')[1];
    let conditionName = location.search.split('=')[1].split('%')[0];
    console.log(conditionName)
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
  const uniquePractitionerName = Array.from(new Set(data.map(item => JSON.stringify(item.Practitioner_name)))).map(item => JSON.parse(item));
  // const handleChangePage = (event, newPage) => {
  //   setpage(newPage);
  // };

  // const handleChangeRowsPerPage = event => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setpage(0);
  // };

  const senddata = (name, doctor, guardian_email) => {
    var url = `/notifications?Patient_name=${name}&doctor=${doctor}`;
    history.push(`${url}`);
  }

  const sendemail = (name, doctor, email) => {
    // emailjs.send(
    //   "service_jo0oe0n",
    //   "template_bqrgux5",
    //   { to_name: name, Doctor: doctor, email: guardian_email },
    //   'l7yMNcNURVQaRrVQG')
    //   .then(function (response) {
    //     console.log('SUCCESS!', response.status, response.text);
    //     toast.success("Meeting with Patient " + name + " is Scheduled");
    //     senddata(name, doctor, email);
    //   }, function (error) {
    //     console.log('FAILED...', error);
    //     alert(error)
    //   });
  };


  const slots = [{ slot: '9 AM - 10 AM' }, { slot: '10 AM - 11 AM' }, { slot: '11 AM - 12 PM' }, { slot: '12 PM - 1 PM' }, { slot: '1 PM - 2 PM' }, { slot: '2 PM - 3 PM' }, { slot: '3 PM - 4 PM' }, { slot: '4 PM - 5 PM' }];
    
  return (
    <div>
      <h1 className="title"><strong>Practitioner Information</strong></h1>

      <span className="navbar justify-content-between">
        <p className="navbar-brand"><b>Practitioner Details :</b></p>
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

     {data.map((row, index) => {
      return(
        <CCardGroup className="mb-4">
        <CWidgetProgressIcon
            color="gradient-success"
            inverse
            text={row.Practitioner_name}
            style={{color:'white'}}
        >
        <CIcon name="cil-userFollow" style={{float:'left'}} height="36" />
        <span><button type="button" className="btn btn-secondary btn-sm" style={{cursor:'pointer', padding:'1%', fontWeight:'bolder'}} onClick={sendemail(row.Patient_name, row.Practitioner_name, row.guardian_email)}>Book Appointment</button></span>
        </CWidgetProgressIcon>
      </CCardGroup>
      )
      
    })}
    </div>
  )
}
