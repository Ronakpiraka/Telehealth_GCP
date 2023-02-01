import React, { useEffect, useState } from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableContainer from '@material-ui/core/TableContainer';
import {  UserOutlined } from '@ant-design/icons';
import {  Menu } from 'antd';
import { Link } from "react-router-dom";
import {useHistory} from "react-router-dom";
import { message } from 'antd';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import { alpha } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Modal from '@mui/material/Modal';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import "./patients.css"; 
import ShowModal from './showmodal';
import { CBadge } from '@coreui/react';
export default function PatientInform() {
  const StyledTableCell = withStyles((theme) => ({
    body: { fontSize: 14,},
  }))(TableCell);
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);
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
      width: '100%',
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
  const [data, setdata] = React.useState([]);
  const [collapsed, setcollapsed] = React.useState(false);
  const [searchTerm, setsearchTerm] = React.useState('');
  const [page, setpage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  // const [ordPlaced, setordPlaced] = React.useState(5);
  const classes = useStyles();
  // const [visits, setvisits] = React.useState([]);
  const [modalopen, setmodalopen] = useState(false);
  const [showMessage, setshowMessage] = useState(true);
  const [iframeurl, setiframeurl] = useState();
  // const { Search } = Input;
  var url;
  const history = useHistory();
  // const sendVisitsBack = (visitsRet) => {
  //   setvisits(visitsRet);
  // }
  const modalhandleOpen = (event) => {
    setmodalopen(true);
    setshowMessage(true);
    const patientId = event.target.dataset.patientId;
    console.log(patientId);
    setiframeurl(patientId);
  }
  const modalhandleClose = () => {
    setmodalopen(false);
  }
  // const displayfun = () => {
  //   return 
  // } 

  const handleChange = event => {
    setshowMessage(false);
    event.preventDefault();
  }

  // const setsorteddata = (data) => {
  //   const tempdata = data.sort((a, b) => {
  //     if (a.Patient_id.toLowerCase() > b.Patient_id.toLowerCase()) {
  //       return -1;
  //     }
  //     if (a.Patient_id.toLowerCase() < b.Patient_id.toLowerCase()) {
  //       return 1;
  //     }
  //     return 0;
  //   })
  //   let res_encounter_start = tempdata[0].Encounter_start;
  //   let res_object = tempdata[0];
  //   console.log(res_object);
  //   return tempdata;

  // };
  // const sortedData = setsorteddata(data)
  // const sortedData = data.sort((a, b) => {
  //   if (a.Patient_id.toLowerCase() > b.Patient_id.toLowerCase()) {
  //     return -1;
  //   }
  //   if (a.Patient_id.toLowerCase() < b.Patient_id.toLowerCase()) {
  //     return 1;
  //   }
  //   return 0;
  // });

  const fetchpatientdata = async () => {
   // console.log("check function")
    var requestOptions = {
      method: 'GET',
      // mode: 'no-cors',
      // headers: {
      //   'Authorization': 'Bearer ' + accessToken
      // }
    };
    var accessToken = sessionStorage.getItem("Accesstoken");
    await fetch("https://patientdata-1-sh4iojyb3q-uc.a.run.app", requestOptions)
      .then((resp) => resp.json())
      .then((response) => {
        let final_data = new Array();
        let Patient_id_list = new Array();
        let Patient_list_index = -1;

        for (var i=0; i<response.length; i++) {
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

        console.log("Data to be seen: ", final_data)

        setdata(final_data)
        
      })
      .catch(error => console.log('error', error));
    // var apikey1 = 'AIzaSyD5pmSe_wdcafJ9hmNU2eExYH1Oa4iA7fc' 
    // var fetchlink = 'https://bigquery.googleapis.com/bigquery/v2/projects/telehealth-365911/datasets/FHIR_Synthea/tables/Patient/data?key='+[apikey1];
      // fetch('fetchlink', 
      // {
      //       method: 'GET',
      //       headers: {
      //           'Authorization': 'Bearer '+[accessToken]
      //           // 'Accept': "application/json"
      //       }
      //     }).then(resp => resp.json()
      //   ).then(resp=>{
      //       setdata(resp)
      //       console.log(data)
      //   }).catch(error => {
      //       console.log(error)
      //       });
      // sortedData();
  }
  const RemoteStatus=(status)=>{
    if(status === "Vitals Tracked")
    {
      return(
        <CBadge color="danger" className="mfs-auto" fontSize='22px' align='center'>
          <div id="tooltip">
            <span id="tooltiptext">Patient Critical & Vitals Tracked</span>
            <span>{status}</span>
          </div>
        </CBadge>
      )
    }
    
    else if(status === "Not Tracked")
    {
      return(
        <CBadge color="warning" className="mfs-auto" fontSize='22px' align='center'>
          <div id="tooltip">
            <span id="tooltiptext">Patient Stable</span>
            <span>{status}</span>
          </div>
        </CBadge>
      )
    }
   else if(status === "Registered")
    {
      return(
        <CBadge color="info" className="mfs-auto" fontSize='22px' align='center'>
          <div id="tooltip">
            <span id="tooltiptext">Care Plan Suggested</span>
            <span>{status}</span>
          </div>
        </CBadge>
      )
    }
    else if(status === "Enrolled")
    {
      return(
        <CBadge color="success" className="mfs-auto" fontSize='22px' align='center'>
          <div id="tooltip">
            <span id="tooltiptext">Tenatative Patient</span>
            <span>{status}</span>
          </div>
        </CBadge>
      )
    }
    else{
      return(
        <CBadge color="success" className="mfs-auto" fontSize='22px' align='center'>
          <div id="tooltip">
            <span id="tooltiptext">Yet to Enroll</span>
            <span>{status}</span>
          </div>
        </CBadge>
      )
    }
  }
  useEffect(() => {
    console.log("hello useeffect")
    // this.setState({isLoading:true})
    // const response= fetch('https://tthvndwmkh.execute-api.us-east-1.amazonaws.com/rpm-api?bucket=rpm-aws-synthea&key=patientrecords.json', {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             // 'Access-Control-Allow-Methods': 'GET',
    //             // 'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
    //             // 'Access-Control-Allow-Origin' : '*'
    //         },
    //     }).then((constructordata) => data.json()).then((resp) => {
    //   setdata(resp)
    //   console.log(data)
    // })
    fetchpatientdata();
  },[])
  console.log(data)
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item icon={<UserOutlined />}>
        <Link to="/">Logout</Link>
      </Menu.Item>
    </Menu>
  );
    function handleMenuClick(e) {
      message.info('Logout Successful');
    }
    const handleChangePage = (event, newPage) => {
      setpage(newPage);
    };
    const handleChangeRowsPerPage = event => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setpage(0);
    };
    function toggle() {
      setcollapsed(!collapsed)
    };
  const redirectToPatientDetails = (e, Patient_id) => {
    url = `/records/patientdetails?Patient_id=${Patient_id}`;
    history.push(`${url}`);
  }
  return (
    <>
      <h2 style={{ textAlign:'center', color:'#4f5d73' }}><strong>Patient Information</strong></h2>
      <Modal
          open={modalopen}
          onClose={modalhandleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          onClick={handleChange}
        >
          <Box sx={modalstyle}>
          <Typography id="modal-modal-description" >
            {console.log(iframeurl)}
            {showMessage && <ShowModal patientId={iframeurl}/>}
          </Typography>
          </Box>
        </Modal>
      <Paper style={{ width: '100%', overflow: 'hidden' }}>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search by Name..."
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            onChange={(e) => { setsearchTerm(e.target.value) }}
            inputProps={{ 'aria-label': 'search' }}
          />
        </div>
        <TableContainer style={{ maxHeight: 300 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <StyledTableRow style={{ padding: '0px' }}>
                {/* <TableCell /> */}
                {/* <TableCell align="center" style={{ fontWeight: 'bold'}}>Id</TableCell> */}
                <StyledTableCell style={{ fontWeight: 'bold', width: '10%' }}>Patient Name</StyledTableCell>
                <StyledTableCell style={{ fontWeight: 'bold', width: '10%' }}>Practitioner Name</StyledTableCell>
                <StyledTableCell style={{ fontWeight: 'bold', width: '12%' }}>Provider Contact Number</StyledTableCell>
                <StyledTableCell style={{ fontWeight: 'bold', width: '10%' }}>Last Visit Date</StyledTableCell>
                <StyledTableCell style={{ fontWeight: 'bold', width: '22%' }}>Address</StyledTableCell>
                <StyledTableCell style={{ fontWeight: 'bold', width: '4%' }}>Age</StyledTableCell>
                <StyledTableCell style={{ fontWeight: 'bold', width: '12%' }}>Patient Contact Number</StyledTableCell>
                <StyledTableCell style={{ fontWeight: 'bold', width: '10%' }}>Status</StyledTableCell>
                <StyledTableCell style={{ fontWeight: 'bold', width: '10%' }}>Personal Info</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              <>
                {data.filter(val => {
                  if (searchTerm === "") {
                    return val;
                  }
                  else if ((val.Contact_number.toLowerCase().includes(searchTerm.toLowerCase())) ||
                    (val.Encounter_end.toLowerCase().includes(searchTerm.toLowerCase())) ||
                    (val.Encounter_start.toLowerCase().includes(searchTerm.toLowerCase())) ||
                    (val.Marital_Status.toLowerCase().includes(searchTerm.toLowerCase())) ||
                    (val.Medical_Record_Number.toLowerCase().includes(searchTerm.toLowerCase())) ||
                    (val.Patient_address.toLowerCase().includes(searchTerm.toLowerCase())) ||
                    (val.Patient_id.toLowerCase().includes(searchTerm.toLowerCase())) ||
                    (val.Patient_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
                    (val.Practitioner_email.toLowerCase().includes(searchTerm.toLowerCase())) ||
                    (val.Practitioner_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
                    (val.Provider_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
                    (val.Provider_number.toLowerCase().includes(searchTerm.toLowerCase())) ||
                    (val.Social_Security_Number.toLowerCase().includes(searchTerm.toLowerCase())) ||
                    (val.birthdate.toLowerCase().includes(searchTerm.toLowerCase())) ||
                    (val.gender.toLowerCase().includes(searchTerm.toLowerCase())) ||
                    (val.guardian_email.toLowerCase().includes(searchTerm.toLowerCase())) ||
                    (val.startdate.toLowerCase().includes(searchTerm.toLowerCase())) 
                    ) {
                    return val
                  }
                 }).sort(RemoteStatus)
                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                    <StyledTableRow key={row.Patient_id}>
                    <StyledTableCell align="left" component="th" scope="row" > <a data-patient-id={row.Patient_id} onClick={modalhandleOpen} target="_blank"
                          style={{ padding: '0px 0px 0px 0px', color: "#0d6efd" }}
                          onMouseOver={function (event) { let target = event.target; target.style.color = '#0d6efd'; target.style.cursor = 'pointer'; }}
                          onMouseOut={function (event) { let target = event.target; target.style.color = '#0d6efd'; }}>{row.Patient_name}</a>
                    </StyledTableCell>
                    <StyledTableCell align="left" >{row.Practitioner_name}</StyledTableCell>
                    <StyledTableCell align="left" >{row.Provider_number}</StyledTableCell>
                    <StyledTableCell align="left" >{row.startdate}</StyledTableCell>
                    <StyledTableCell align="left" >{row.Patient_address}</StyledTableCell>
                    <StyledTableCell align="left" >{row.Patient_Age}</StyledTableCell>
                    <StyledTableCell align="left" >{row.Contact_number}</StyledTableCell>
                    <StyledTableCell align="left" >{RemoteStatus(row.RemoteCareText)}</StyledTableCell>
                    <StyledTableCell align="left" ><button type="button"  className="btn btn-primary btn-sm" onClick={(e) => { redirectToPatientDetails(e, row.Patient_id)}}>View Details</button></StyledTableCell>
                    </StyledTableRow>
                    );
                  })}
                  </>
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
      {/*  </Content> */}
    </>
    // </Layout>
  )
}