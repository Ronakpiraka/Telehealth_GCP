import React, { useEffect, useRef, useState } from "react";
import { Layout, Menu, Input, Calendar } from "antd";
import "./PatientInfo.css";
import "antd/dist/antd.css";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import CallIcon from '@mui/icons-material/Call';
import EventIcon from '@mui/icons-material/Event';
import "react-toastify/dist/ReactToastify.css";
import { alpha } from "@material-ui/core/styles";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from "@material-ui/icons/Search";
import TelegramIcon from "@mui/icons-material/Telegram";
import emailjs from "@emailjs/browser";
import { CSpinner } from '@coreui/react'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RefreshIcon from '@mui/icons-material/Refresh';
import { useHistory, useLocation } from "react-router-dom";
import { CBadge } from "@coreui/react";
import "../records/patients.css";
import LoadingOverlay from "react-loading-overlay";
import Encounter from './Encounter'
import { Modal, Button } from "react-bootstrap";
// import { Modal, ModalHeader, Body, ModalFooter, Button } from 'react-bootstrap';

import { CCol, CRow } from "@coreui/react";

export default function EmailNotify() {
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      "& > *": {
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
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.35),
      "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.5),
      },
      margin: "10px",
      float: "right",
      boxShadow: "-4px 8px 20px 0px grey",
      width: "50%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "98%",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "100ch",
        "&:focus": {
          width: "20ch",
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
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModal1Open, setIsModal1Open] = useState(false);
  const [isModal2Open, setIsModal2Open] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [appointmentType, setAppointmentType] = useState("");
  const [modalData, setModalData] = useState({});
  const [data, setdata] = React.useState([]);
  const [tabledata, settabledata] = React.useState([]);
  const [opepatientdata, setopepatientdata] = useState([]);
  const [filter, setFilter] = useState('');
  const [collapsed, setcollapsed] = React.useState(false);
  const [searchTerm, setsearchTerm] = React.useState("");
  const [page, setpage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [ordPlaced, setordPlaced] = React.useState(5);
  const classes = useStyles();
  const history = useHistory();
  const [isLoading, setisLoading] = useState(true);
  const form = useRef();
  const { Header, Sider, Content } = Layout;
  const { Search } = Input;

  // useEffect(() => {
  //   const res = fetch("https://emailnotifications-sh4iojyb3q-uc.a.run.app", {

  //   // const res = fetch("https://appointmentbook-sh4iojyb3q-uc.a.run.app", {
  //     method: "GET",
  //   })
  //     .then((resp) => resp.json())
  //     .then((resp) => {
  //       setdata(resp);
  //       console.log(data);
  //       setisLoading(false);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://emailnotifications-sh4iojyb3q-uc.a.run.app");
        const data = await response.json();

        const sortedData = data.sort((a, b) => {
          const dateA = new Date(a.App_Date);
          const dateB = new Date(b.App_Date);

          if (dateB - dateA === 0) {
            // If App_Date is the same, sort based on Timing (descending order)
            return b.Timing - a.Timing;
          } else {
            // Sort based on App_Date (ascending order)
            return dateB - dateA;
          }
        });

        setdata(sortedData);
        // setdata(data);
        console.log(data);
        setisLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    patientope();
  }, []);

  // const handleFilterChange = (event) => {
  //   setFilter(event.target.value);
  // };

  const handleChangePage = (event, newPage) => {
    setpage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setpage(0);
  };

  const handleFileChange = (e) => {
    setSelectedFiles([...e.target.files]);
  };
  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      alert('Please select files first');
      return;
    }
    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append('files', file);
    });
    try {
      // Replace this URL with your server-side endpoint for handling file uploads
      const response = await fetch('https://your-upload-endpoint.com/upload', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        alert('Files uploaded successfully');
      } else {
        alert('Failed to upload the files');
      }
    } catch (error) {
      console.error('Error while uploading the files:', error);
      alert('Error occurred while uploading the files');
    }
  };

  const patientope = () => {
    fetch("https://opepatientdata-sh4iojyb3q-uc.a.run.app")
      .then((response) => response.json())
      .then((opedata) => {
        setopepatientdata(opedata);
        console.log("ope wala data", opedata);
      })
      .catch((error) => {
        console.error(error);
        setopepatientdata([]);
      });
  };

  const checkpatientope = (MRN) => {
    let opepatient = 0;
    for (let i = 0; i < opepatientdata.length; i++) {
      if (opepatientdata[i].MRN_number === MRN) {
        opepatient = 1;
        break;
      }
    }
    return opepatient;
  }
  // const senddata = (name, doctor, guardian_email) => {
  //   var url = `/notifications?Patient_name=${name}&doctor=${doctor}`;
  //   history.push(`${url}`);
  // };

  const riskscore = (Appointment_Status) => {
    if (Appointment_Status === "Pending") {
      return (
        <CBadge
          color="primary"
          className="mfs-auto"
          fontSize="22px"
          align="center"
        >
          Booked
        </CBadge>
      );
    }
    if (Appointment_Status === "No show") {
      return (
        <CBadge
          color="warning"
          className="mfs-auto"
          fontSize="22px"
          align="center"
        >
          No-Show
        </CBadge>
      );
    }
    if (Appointment_Status === "Fulfilled") {
      return (
        <CBadge
          color="success"
          className="mfs-auto"
          fontSize="22px"
          align="center"
        >
          Fulfilled
        </CBadge>
      );
    }
    if (Appointment_Status == "No-show") {
      return (
        <CBadge
          color="Danger" // red
          className="mfs-auto"
          fontSize="22px"
          align="center"
        >
          No Show
        </CBadge>
      );
    }
    if (Appointment_Status === null) {
      return (
        <CBadge
          color="secondary"
          className="mfs-auto"
          fontSize="22px"
          align="center"
        >
          No return
        </CBadge>
      );
    }
    if (Appointment_Status === "Booked") {
      return (
        <CBadge
          color="primary"
          className="mfs-auto"
          fontSize="22px"
          align="center"
        >
          Booked
        </CBadge>
      );
    }
    //info, light are available
    else {
      return (
        <CBadge
          color="secondary"
          className="mfs-auto"
          fontSize="22px"
          align="center"
        >
          error
        </CBadge>
      );
    }
  };

  // const handleButtonClick1 = () => {
  //   history.push("/notifications/past");
  // };

  // const handleButtonClick2 = () => {
  //   history.push("/notifications/today");
  // };

  // const handleButtonClick3 = () => {
  //   history.push("/notifications/upcoming");
  // };

  // const redirecttodocumentspage = (MRN) => {
  //   var url = `/notifications/documents?MRN=${MRN}`;
  //   history.push(`${url}`);
  // };

  const handleConsentChange = (consent) => {
    let conval = ''
    if (consent === "Do") {
      conval = 'Full Consent';
    }
    if (consent === "Do partial") {
      conval = 'Partial Consent';
    }
    if (consent === "Do not") {
      conval = 'No Consent';
    }
    return conval;
  };
  // const handleConsentCareChange = (consent) => {
  //   let conval = ''
  //   if (consent === "Do") {
  //     conval = 'You have Full Consent';
  //   }
  //   if (consent === "Do partial") {
  //     conval = 'Partial Consent';
  //   }
  //   if (consent === "Do not") {
  //     conval = 'No Consent';
  //   }
  //   return conval;
  // };

  const handlerefresh = () => {
    window.location.reload();
  }

  const openopeModal = (rowData) => {
    // no upload and change
    setIsModalOpen(true);
    setModalData(rowData);
  };

  const closeopeModal = () => {
    setIsModalOpen(false);
  };

  const openncModal = (rowData) => {
    //change consent modal
    setIsModal1Open(true);
    setModalData(rowData);
  };

  const closencModal = () => {
    setIsModal1Open(false);
  };

  const openteleModal = (rowData) => {
    setIsModal2Open(true);
    setModalData(rowData);
  };

  const closeteleModal = () => {
    setIsModal2Open(false);
  };

  // const handleAppointmentChange = () => {
  //   // setAppointmentType(newValue);
  //   if (appointmentType === 'All') {
  //     countAppointmentsTotal();
  //     settabledata()
  //   }
  //   if (appointmentType === 'Past') {
  //     countAppointmentsPast();
  //     settabledata(filteredPastData)
  //   }
  //   if (appointmentType === 'Today') {
  //     countAppointmentsToday();
  //     settabledata(filteredtodayData)
  //   }
  //   if (appointmentType === 'Upcoming') {
  //     countAppointmentsUpcoming();
  //     settabledata(filteredUpcomingData)
  //   }

  // };

  const today = new Date();

  const filteredPastData = data.filter((row) => {
    const appDate = row.App_Date;
    console.log(appDate, appDate < today)
    return appDate < (today) ; // only include appointments with today's date or later
  });

  
  const countAppointmentsPast = () => {
    const countTotal = filteredPastData.length;
    sessionStorage.setItem("appointmentpast", countTotal);
    return countTotal;
  };

  const filteredtodayData = data.filter((row) => {
    const appDate = new Date(row.App_Date);
    return appDate == today || appDate.toDateString() === today.toDateString(); // only include appointments with today's date or later
  });

  const countAppointmentsToday = () => {
    const today = new Date().toISOString().substr(0, 10); // get today's date in YYYY-MM-DD format
    // const appointmentsToday = data.filter((row) => row.App_Date === today);
    const countToday = filteredtodayData.length;
    sessionStorage.setItem("appointmentsToday", countToday);
    return countToday;
  };

  const filteredUpcomingData = data.filter((row) => {
    const appDate = new Date(row.App_Date);
    return appDate > today; // only include appointments with today's date or later
  });

  const countAppointmentsUpcoming = () => {
    const countTotal = filteredUpcomingData.length;
    sessionStorage.setItem("appointmentsupcoming", countTotal);
    return countTotal;
  };

  const countAppointmentsTotal = () => {
    const today = new Date().toISOString().substr(0, 10); // get today's date in YYYY-MM-DD format

    const countTotal = data.length;
    sessionStorage.setItem("appointmentsTotal", countTotal);
    return countTotal;
  };

  return (
    <div>
      <h1 className="title" alignItems="center">
        <strong>Appointments</strong>
      </h1>

      {/* <Tabs value={appointmentType} onChange={handleAppointmentChange} centered>
        <Tab value = "All" label="All" />
        <Tab value = "Past" label="Past" />
        <Tab value = "Today" label="Today" />
        <Tab value = "Upcoming" label="Upcoming" />
      </Tabs> */}

      <Modal show={isModalOpen} toggle={closeopeModal}>
        <Modal.Header style={{ display: "flex", alignItems: "center", justifyContent: "center" }} toggle={closeopeModal}>OPE Patient Document Status</Modal.Header>
        <Modal.Body>
          {/* Render modal content using the modalData */}
          This is ope patient.
        </Modal.Body>
        <Modal.Footer>
          <Button color="primary" onClick={closeopeModal}>Close</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={isModal1Open} toggle={closencModal}>
        <Modal.Header style={{ display: "flex", alignItems: "center", justifyContent: "center" }} toggle={closencModal}>Telehealth Patient Document Status</Modal.Header>
        <Modal.Body>
          this patient have no consent
        </Modal.Body>
        <Modal.Footer>
          <Button color="primary" onClick={closencModal}>Close</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={isModal2Open} toggle={closeteleModal}>
        <Modal.Header style={{ display: "flex", alignItems: "center", justifyContent: "center" }} toggle={closeteleModal}>Telehealth Patient Document Status(Upload Docs)</Modal.Header>
        <Modal.Body>
          {/* this patient gave full/partial consent */}
          <h5 align="center">Upload Documents</h5>
          <div align="center">
            <input type="file" multiple onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button></div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="primary" onClick={closeteleModal}>Close</Button>
        </Modal.Footer>
      </Modal>

      <CRow>
        <CCol>
          <h4>
            <b>Total Appointments: {countAppointmentsTotal()}</b>
          </h4>
        </CCol>
        <CCol xs="4" className="text-right">
          <button type="button" class="btn btn-info" onClick={handlerefresh}> Refresh <RefreshIcon /> </button>
        </CCol>
      </CRow>

      <Paper style={{ width: "100%", overflow: "hidden" }}>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search..."
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            onChange={(e) => {
              setsearchTerm(e.target.value);
            }}
            inputProps={{ "aria-label": "search" }}
          />
        </div>
        <TableContainer style={{ maxHeight: 300, marginLeft: "10px" }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell style={{ width: "15%", textAlign: "center" }}>
                </TableCell>
                <TableCell style={{ width: "15%", textAlign: "center" }}>
                  <b>Patient Name</b>
                </TableCell>
                <TableCell style={{ width: "15%", textAlign: "center" }}>
                  <b>MRN</b>
                </TableCell>
                <TableCell style={{ width: "15%", textAlign: "center" }}>
                  <b>Condition Name</b>
                </TableCell>
                <TableCell style={{ width: "30%", textAlign: "center" }}>
                  <b>Provider Name</b>
                </TableCell>
                <TableCell style={{ width: "15%", textAlign: "center" }}>
                  <b>Practitioner Name</b>
                </TableCell>
                <TableCell style={{ width: "15%", textAlign: "center" }}>
                  <b>Appointment Date and Time</b>
                </TableCell>
                <TableCell style={{ width: "10%", textAlign: "center" }}>
                  <b>Appointment Status & Type</b>
                </TableCell>
                <TableCell style={{ width: "10%", textAlign: "center" }}>
                  <b>Documents Status & Consent</b>
                </TableCell>
                <TableCell style={{ width: "10%", textAlign: "center" }}>
                  <b>View Documents</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                .filter((val) => {
                  if (searchTerm === "") {
                    return val;
                  } else if (
                    (val.App_Date.toLowerCase().includes(searchTerm.toLowerCase()))
                    || (val.Provider_id.toLowerCase().includes(searchTerm.toLowerCase()))
                    || (val.Provider_name.toLowerCase().includes(searchTerm.toLowerCase()))
                    || (val.Condition_code.toLowerCase().includes(searchTerm.toLowerCase()))
                    || (val.Condition_name.toLowerCase().includes(searchTerm.toLowerCase()))
                    || (val.Patient_name.toLowerCase().includes(searchTerm.toLowerCase()))
                    || (val.Practitioner_id.toLowerCase().includes(searchTerm.toLowerCase()))
                    || (val.Practitioner_name.toLowerCase().includes(searchTerm.toLowerCase()))
                    //  || (val.Practitioner_Speciality.toLowerCase().includes(searchTerm.toLowerCase()))
                    || (val.MRN.toLowerCase().includes(searchTerm.toLowerCase()))
                    || (val.practitioner_email.toLowerCase().includes(searchTerm.toLowerCase()))
                    || (val.Appointment_Status.toLowerCase().includes(searchTerm.toLowerCase()))
                    || (val.Consent_form_choice.toLowerCase().includes(searchTerm.toLowerCase()))
                    || (val.Patient_email.toLowerCase().includes(searchTerm.toLowerCase()))
                    || (val.Apttype.toLowerCase().includes(searchTerm.toLowerCase()))
                    || (val.Timing.toLowerCase().includes(searchTerm.toLowerCase()))
                    // (val.Slot.toLowerCase().includes(searchTerm.toLowerCase()))
                  ) {
                    return val;
                  }
                })
                .map((row, index) => {
                  return (
                    <React.Fragment>
                      <Encounter key={row.Patient_id} row={row} data={data} />
                    </React.Fragment>
                  );
                })
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
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
        text="Loading the content..."
        styles={{
          height: "100%",
          spinner: (base) => ({
            ...base,
            width: "50px",
            "& svg circle": {
              stroke: "rgba(255, 0, 0, 1)",
            },
          }),
        }}
      ></LoadingOverlay>
      {/* {isLoading &&
        <div style={{ textAlign: 'center' }}>
          <CSpinner color="primary" variant="grow" />
          <CSpinner color="secondary" variant="grow" />
          <CSpinner color="success" variant="grow" />
          <CSpinner color="danger" variant="grow" />
          <CSpinner color="warning" variant="grow" />
          <CSpinner color="info" variant="grow" />
          <CSpinner color="primary" variant="grow" />
          <CSpinner color="dark" variant="grow" />
        </div>
      } */}

    </div>
  );
}
