import React, { lazy, useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardGroup,
  CWidgetDropdown,
  CCol,
  CRow,
  CWidgetProgressIcon,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import Iframe from 'react-iframe'
import ChartLineSimple from '../charts/ChartLineSimple'
import ChartBarSimple from '../charts/ChartBarSimple'
import { useHistory, useLocation } from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableContainer from '@material-ui/core/TableContainer';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Typography from '@material-ui/core/Typography';
import Modal from '@mui/material/Modal';
import Box from '@material-ui/core/Box';
import ShowModal1 from '../records/showmodal1';
import InputBase from '@material-ui/core/InputBase';
import { alpha } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import { CBadge } from '@coreui/react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { array } from 'prop-types'

const WidgetsDropdown = lazy(() => import('../widgets/WidgetsDropdown.js'))
// const WidgetsBrand = lazy(() => import('../widgets/WidgetsBrand.js'))

const Dashboard = () => {
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
  const [dashdetails, setdashdetails] = React.useState([]);
  const [page, setpage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchTerm, setsearchTerm] = React.useState('');
  const history = useHistory();
  const classes = useStyles();
  const [modalopen, setmodalopen] = useState(false);
  const [showMessage, setshowMessage] = useState(true);
  const [iframeurl, setiframeurl] = useState();
  var url;
  const modalhandleOpen = (event) => {
    setmodalopen(true);
    setshowMessage(true);
    const patientId = event.target.dataset.patientId;
    setiframeurl(patientId);
  }

  const modalhandleClose = () => {
    setmodalopen(false);
  }
  const redirectToPatientDetails = (e, Patient_id) => {
    url = `/records/patientdetails?Patient_id=${Patient_id}`;
    history.push(`${url}`);
  }
  const handleChange = event => {
    setshowMessage(false);
    event.preventDefault();
  }
  async function fetchdashdetails() {
    var requestOptions = {
      method: 'GET'
    };
    // var accessToken = sessionStorage.getItem("Accesstoken");
    await fetch("https://dashboarddata-sh4iojyb3q-uc.a.run.app", requestOptions)
      .then((resp) => resp.json())
      .then((response) => {
        setdashdetails(response[0])
      })
      .catch(error => console.log('error', error));
  }

  // const fetchpatientdata = async () => {
  //   var requestOptions = {
  //     method: 'GET',
  //     mode: 'no-cors',
  //   };
  //   var accessToken = sessionStorage.getItem("Accesstoken");
  //   await fetch("https://patientdata-sh4iojyb3q-uc.a.run.app", requestOptions)
  //     .then((resp) => resp.json())
  //     .then((response) => {
  //       if (response && response.length > 0) {
  //         let final_data = [];
  //         let critical_data = [];
  //         let Patient_id_list = [];
  //         let Patient_list_index = -1;
  //         for (var i = 0; i < response.length; i++) {
  //           Patient_list_index = Patient_id_list.indexOf(response[i].Patient_id);
  //           if (Patient_list_index === -1) {
  //             final_data.push(response[i]);
  //             Patient_id_list.push(response[i].Patient_id);
  //           } else {
  //             let lst_encounter = new Date(final_data[Patient_list_index].Encounter_start);
  //             let new_encounter = new Date(response[i].Encounter_start);
  //             if (new_encounter > lst_encounter) {
  //               final_data[Patient_list_index] = response[i];
  //             }
  //           }
  //         }
  //         setdata(final_data);
  //         console.log("Data to be seen: ", final_data);
  //       }
  //     })
  //     .catch(error => console.log('error', error));
  // };

  useEffect(() => {
    console.log("hello useeffect")
    fetchpatientdata();
  }, []);

  const fetchpatientdata = async () => {
    const requestOptions = {
      method: 'GET',
      mode:'no-cors',
    };
    const accessToken = sessionStorage.getItem("Accesstoken");
    const response = await fetch("https://patientdata-sh4iojyb3q-uc.a.run.app", requestOptions)
      .then((resp) => resp.json())
      .catch(error => console.log('error', error));

    if (response) {
      const patientIdSet = new Set();
      const finalData = response.reduce((acc, obj) => {
        if (!patientIdSet.has(obj.Patient_id)) {
          patientIdSet.add(obj.Patient_id);
          return [...acc, obj];
        } else {
          const index = acc.findIndex(item => item.Patient_id === obj.Patient_id);
          const lstEncounter = new Date(acc[index].Encounter_start);
          const newEncounter = new Date(obj.Encounter_start);
          if (newEncounter > lstEncounter) {
            acc[index] = obj;
          }
          return acc;
        }
      }, []);

      // Sort the data based on status and patient name
      finalData.sort((a, b) => {
        const nameA = a.Patient_name || '';
        const nameB = b.Patient_name || '';
        return nameA.localeCompare(nameB);
      });

      setdata(finalData);
      // setisLoading(false);
    }
    
  };

  const handleChangePage = (event, newPage) => {
    setpage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setpage(0);
  };


  useEffect(() => {
    fetchdashdetails();
    fetchpatientdata();
  }, [])

  // console.log(dashdetails)
  return (
    <>
      <CRow>
        <CCol sm="6" lg="3">
          <CWidgetDropdown
            color="gradient-primary"
            header={dashdetails.Patient_count}
            text="Total Patients"
            footerSlot={
              <ChartLineSimple
                pointed
                className="c-chart-wrapper mt-3 mx-3"
                style={{ height: '70px' }}
                dataPoints={[65, 59, 84, 84, 51, 55, 40]}
                pointHoverBackgroundColor="primary"
                label="Members"
                labels="months"
              />
            }
          >
          </CWidgetDropdown>
        </CCol>
        <CCol sm="6" lg="3">
          <CWidgetDropdown
            color="gradient-danger"
            header={dashdetails.Critical_Patients}
            text="Critical Patients"
            footerSlot={
              <ChartBarSimple
                className="mt-3 mx-3"
                style={{ height: '70px' }}
                backgroundColor="rgb(250, 152, 152)"
                label="Members"
                labels="months"
              />
            }
          >
          </CWidgetDropdown>
        </CCol>

        <CCol sm="6" lg="3">
          <CWidgetDropdown
            color="gradient-warning"
            header={dashdetails.Non_Critical_Patients}
            text="Non - Critical Patients"
            footerSlot={
              <ChartLineSimple
                className="mt-3"
                style={{ height: '70px' }}
                backgroundColor="rgba(255,255,255,.2)"
                dataPoints={[78, 81, 80, 45, 34, 12, 40]}
                options={{ elements: { line: { borderWidth: 2.5 } } }}
                pointHoverBackgroundColor="warning"
                label="Members"
                labels="months"
              />
            }
          >
          </CWidgetDropdown>
        </CCol>

        <CCol sm="6" lg="3">
          <CWidgetDropdown
            color="gradient-info"
            header={dashdetails.Low_Risk_Patients}
            text="Low Risk Patients"
            footerSlot={
              <ChartLineSimple
                pointed
                className="mt-3 mx-3"
                style={{ height: '70px' }}
                dataPoints={[1, 18, 9, 17, 34, 22, 11]}
                pointHoverBackgroundColor="info"
                options={{ elements: { line: { tension: 0.00001 } } }}
                label="Members"
                labels="months"
              />
            }
          >
          </CWidgetDropdown>
        </CCol>
      </CRow>



      <CCardGroup className="mb-4">
        <CWidgetProgressIcon
          header={dashdetails.Provider_count}
          text="Providers"
          color="gradient-info"
          inverse
        >
          <CIcon name="cil-people" height="36" />
        </CWidgetProgressIcon>

        <CWidgetProgressIcon
          header={dashdetails.Practitioner_count}
          text="Practitioners"
          color="gradient-success"
          inverse
        >
          <CIcon name="cil-userFollow" height="36" />
        </CWidgetProgressIcon>

        <CWidgetProgressIcon
          header={dashdetails.Condition_count}
          text="Condition"
          color="gradient-warning"
          inverse
        >
          <CIcon name="cil-basket" height="36" />
        </CWidgetProgressIcon>

        <CWidgetProgressIcon
          header={dashdetails.Procedure_count}
          text="Procedures"
          color="gradient-primary"
          inverse
        >
          <CIcon name="cil-chartPie" height="36" />
        </CWidgetProgressIcon>

        <CWidgetProgressIcon
          header={dashdetails.Vaccines_count}
          text="Vaccines"
          color="gradient-danger"
          inverse
        >
          <CIcon name="cil-speedometer" height="36" />
        </CWidgetProgressIcon>
      </CCardGroup>


      <CCard>
        <CCardBody>
          <CRow>
            <h2 id="title" className="title" align="center"><strong>Continuous Care</strong></h2>
            {/* <div className="small text-muted">September 2021</div> */}
          </CRow>
          {/* <MainChartExample style={{height: '300px', marginTop: '40px'}}/> */}
          <Iframe width="100%" height="550px" src="https://datastudio.google.com/embed/reporting/c6041d77-a0b2-42dd-86da-6489602b5870/page/tEnnC" frameborder="0" style="border:0" allowfullscreen />
        </CCardBody>
      </CCard>
      <CCard>
        <CCardBody>
          <CRow>
            <h2 id="title" className="title" align="center"><strong>Critical Patients</strong></h2>
            {/* <div className="small text-muted">September 2021</div> */}
          </CRow>
          <CRow>
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
                  {showMessage && <ShowModal1 patientId={iframeurl} />}
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
                      <StyledTableCell style={{ fontWeight: 'bold', width: '10%' }}>Patient Name</StyledTableCell>
                      <StyledTableCell style={{ fontWeight: 'bold', width: '10%', textAlign: 'center' }}>Practitioner Name</StyledTableCell>
                      <StyledTableCell style={{ fontWeight: 'bold', width: '12%', textAlign: 'center' }}>Provider Contact Number</StyledTableCell>
                      <StyledTableCell style={{ fontWeight: 'bold', width: '10%' }}>Last Visit Date</StyledTableCell>
                      <StyledTableCell style={{ fontWeight: 'bold', width: '22%', textAlign: 'center' }}>Address</StyledTableCell>
                      <StyledTableCell style={{ fontWeight: 'bold', width: '4%', textAlign: 'center' }}>Age</StyledTableCell>
                      <StyledTableCell style={{ fontWeight: 'bold', width: '12%', textAlign: 'center' }}>Patient Contact Number</StyledTableCell>
                      <StyledTableCell style={{ fontWeight: 'bold', width: '10%', textAlign: 'center' }}>Personal Info</StyledTableCell>
                    </StyledTableRow>
                  </TableHead>
                  <TableBody>
                    <>
                      {data.filter(val => {
                        if (searchTerm === "") {
                          return val;
                        }
                        else if ((val.Active_Status.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          (val.Condition_code.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          (val.Condition_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          (val.Consent_Form_Text.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          (val.Contact_number.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          (val.Encounter_end_date.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          (val.Encounter_start.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          (val.Encounter_start_date.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          (val.Language.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          (val.Marital_Status.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          (val.Medical_Record_Number.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          (val.Mothers_maiden_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          (val.Patient_Age.toString().toLowerCase().includes(searchTerm.toLowerCase())) ||
                          (val.Patient_address.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          (val.Patient_id.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          (val.Patient_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          (val.Practitioner_email.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          (val.Practitioner_id.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          (val.Practitioner_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          // (val.Provider_number.toLowerCase().includes(searchTerm.toLowerCase())) || 
                          (val.Remote_Care_Text.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          (val.Social_Security_Number.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          (val.birthdate.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          (val.gender.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          (val.guardian_email.toLowerCase().includes(searchTerm.toLowerCase()))
                        ) {
                          return val
                        }
                      }).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row, index) => {
                          return (
                            <StyledTableRow key={row.Patient_id}>
                              <StyledTableCell align="left" component="th" scope="row" > <a data-patient-id={row.Patient_id} onClick={modalhandleOpen} target="_blank"
                                style={{ padding: '0px 0px 0px 0px', color: "#0d6efd", width: '10%' }}
                                onMouseOver={function (event) { let target = event.target; target.style.color = '#0d6efd'; target.style.cursor = 'pointer'; }}
                                onMouseOut={function (event) { let target = event.target; target.style.color = '#0d6efd'; }}>{row.Patient_name}</a>
                              </StyledTableCell>
                              <StyledTableCell align="left" style={{ width: '10%' }}>{row.Practitioner_name}</StyledTableCell>
                              <StyledTableCell align="center" style={{ width: '14%' }}>{row.Provider_number}</StyledTableCell>
                              <StyledTableCell align="center" style={{ width: '14%' }}>{row.Encounter_end_date}</StyledTableCell>
                              <StyledTableCell align="left" style={{ width: '8%' }}>{row.startdate}</StyledTableCell>
                              <StyledTableCell align="center" style={{ width: '22%' }}>{row.Patient_address}</StyledTableCell>
                              <StyledTableCell align="center" style={{ width: '4%' }}>{row.Patient_Age}</StyledTableCell>
                              <StyledTableCell align="center" style={{ width: '14%' }}>{row.Contact_number}</StyledTableCell>
                              <StyledTableCell align="center" style={{ width: '10%' }}><button type="button" className="btn btn-primary btn-sm" onClick={(e) => { redirectToPatientDetails(e, row.Patient_id) }}>View Details</button></StyledTableCell>
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
          </CRow>
        </CCardBody>
      </CCard>

    </>
  )
}

export default Dashboard;