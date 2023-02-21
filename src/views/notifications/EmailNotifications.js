import React, {useEffect, useRef, useState } from 'react'
import { Layout, Menu, Input, Calendar  } from 'antd';
import './PatientInfo.css';
import 'antd/dist/antd.css';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import 'react-toastify/dist/ReactToastify.css'; 
import { alpha} from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import TelegramIcon from '@mui/icons-material/Telegram';
import emailjs from '@emailjs/browser';
import {toast} from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import {useHistory, useLocation} from "react-router-dom";
import {CBadge} from '@coreui/react';
import "../records/patients.css";
import LoadingOverlay from 'react-loading-overlay';

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
        const form = useRef();
        const { Header, Sider, Content } = Layout;
        const { Search } = Input;

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
        <h2 className="title"><strong>Patient Appointments</strong></h2>
          <Paper style={{ width: '100%', overflow: 'hidden' }}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search by Code..."
                classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
                onChange={(e)=>{setsearchTerm(e.target.value)}}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
          <TableContainer style={{ maxHeight: 300 }}>
          
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                <TableCell>Patient Name</TableCell>
                <TableCell>Condition Name</TableCell>
                <TableCell>Patient/Guardian Email</TableCell>
                <TableCell>Provider Name</TableCell>
                <TableCell>Booked Slot</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.reverse(data.Risk_Category).filter(val=>{
                  if(searchTerm === "")
                  {
                    return val;
                  }
                  else if((val.Patient_id.toLowerCase().includes(searchTerm.toLowerCase())) ||
                  (val.Patient_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
                  (val.Guardian_Email.toLowerCase().includes(searchTerm.toLowerCase())) ||
                  (val.Practitioner.toLowerCase().includes(searchTerm.toLowerCase())) ||
                  (val.Risk_Category.toString().toLowerCase().includes(searchTerm.toLowerCase()))
                  ){
                     return val  
                  }
                })
                  .map((row, index) => {
                    return(
                      <StyledTableRow>
                        <StyledTableCell>{row.Patient_name}</StyledTableCell>
                        <StyledTableCell>{row.Condition_name}</StyledTableCell>
                        <StyledTableCell>{row.Guardian_Email}</StyledTableCell>
                        <StyledTableCell>{row.Provider_name}</StyledTableCell>
                        <StyledTableCell>{row.Practitioner}</StyledTableCell>
                        <StyledTableCell>{riskscore(row.Risk_Category)}</StyledTableCell>
                        <StyledTableCell key={index}> <button key={index} type="button" class="btn btn-primary" onClick={() => sendemail(row.Patient_name, row.Practitioner,row.Guardian_Email)}>Send &nbsp;<TelegramIcon/></button></StyledTableCell>
                      </StyledTableRow>
                    )
                  }).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                 }
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50, 100]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
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
         {/* </Content> */}
         </div>
        // </Layout>
    )
}