import React, {useEffect, useRef, useState } from 'react'
import { Layout, Menu, Input} from 'antd';
import './PatientInfo.css';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import 'react-toastify/dist/ReactToastify.css'; 
import { alpha} from '@material-ui/core/styles';
import emailjs from '@emailjs/browser';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {toast} from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import {useHistory, useLocation} from "react-router-dom";
import LoadingOverlay from 'react-loading-overlay';
import {CBadge} from '@coreui/react';
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
          float : 'right',
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

        const [data, setdata]=React.useState([]);
        const [collapsed, setcollapsed]=React.useState(false);
        const [searchTerm, setsearchTerm]=React.useState('');
        const [page, setpage]=React.useState(0);
        const [rowsPerPage, setRowsPerPage] = React.useState(10);
        const [ordPlaced, setordPlaced]=React.useState(5);
        const classes = useStyles();
        const history = useHistory();
        const [isLoading, setisLoading] = useState(true);
        const [PatientName, setPatientName] = React.useState('');

        const handleChange = (event) => {
          setPatientName(event.target.value);
        };

        useEffect(() => { 
          const res= fetch("https://emailnotifications-sh4iojyb3q-uc.a.run.app", {
            method: 'GET',
          }).then(resp => resp.json()
          ).then(resp=>{
              setdata(resp)
              console.log(data)
              setisLoading(false)
          }).catch(error => {
              console.log(error)
              });
        },[])

        console.log(data)

        const handleChangePage = (event, newPage) => {
            setpage(newPage);
        };

        const handleChangeRowsPerPage = event => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setpage(0);
        };

        const senddata = (name, doctor,guardian_email) =>{
          var url =  `/notifications?Patient_name=${name}&doctor=${doctor}`;
          history.push(`${url}`);
        }

        const sendemail = (name, doctor,guardian_email) => {
              emailjs.send(
                "service_jo0oe0n",
                "template_bqrgux5",
                {to_name : name, Doctor:doctor,email:guardian_email}, 
                'l7yMNcNURVQaRrVQG')
                .then(function(response) {
                  console.log('SUCCESS!', response.status, response.text);
                  toast.success("Meeting with Patient "+ name+" is Scheduled");
                  senddata(name, doctor,guardian_email);
              }, function(error) {
                  console.log('FAILED...', error);
                  alert(error)
              });
            };

        const riskscore=(cluster_label)=>{
          if(cluster_label === 0)
          {
            return(
              <CBadge color="warning" className="mfs-auto" fontSize='22px' align='center' >Low Risk</CBadge>
            )
          }
          else if(cluster_label === 2)
          {
            return(
              <CBadge color="danger" className="mfs-auto" fontSize='22px' align='center'>Critical Condition</CBadge>
            )
          }
          else
          {
            return(
              <CBadge color="info" className="mfs-auto" fontSize='22px' align='center' >Non - Critical Condition</CBadge>
            )
          } 
        }

    return (
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
            <FormControl sx={{ minWidth: 200 }} size="medium">
                <InputLabel id="demo-select-small">Patient Name</InputLabel>
                <Select>
                    {data.map((row, index) => {
                        return <MenuItem value={row.Patient_name}>{row.Patient_name}</MenuItem>
                    })}
                 </Select>
            </FormControl>
                 
                 {/* <InputLabel id="demo-select-small">Practitioner Name</InputLabel>
                 <InputLabel id="demo-select-small">Availability</InputLabel> */}
                {/* <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    label="Age"
                    onChange={handleChange}
                >
                    {data.map((row, index) => {
                        <>
                        <MenuItem>{row.Patient_name}</MenuItem>
                        </>
                    })}
                </Select> */}
            
        </div>
    )
}