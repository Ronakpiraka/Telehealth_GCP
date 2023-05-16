import React, { useEffect, useRef, useState } from "react";
import { Layout, Menu, Input, Calendar } from "antd";
import "./PatientInfo.css";
import "antd/dist/antd.css";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@material-ui/core/Paper";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import "react-toastify/dist/ReactToastify.css";
import { alpha } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import TelegramIcon from "@mui/icons-material/Telegram";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory, useLocation } from "react-router-dom";
import { CBadge } from "@coreui/react";
import "../records/patients.css";
import LoadingOverlay from "react-loading-overlay";
import { CCol, CRow } from "@coreui/react";

export default function EmailNotify(props) {
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

  const data = props.data;
  console.log("PA Data", data);

  // const [data, setdata] = React.useState([]);
  // const [collapsed, setcollapsed] = React.useState(false);
  const [searchTerm, setsearchTerm] = React.useState("");
  const [page, setpage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  // const [ordPlaced, setordPlaced] = React.useState(5);
  const classes = useStyles();
  // const history = useHistory();
  // const [isLoading, setisLoading] = useState(true);
  // const { Header, Sider, Content } = Layout;
  // const { Search } = Input;

  // useEffect(() => {
  //   const res = fetch("https://emailnotifications-sh4iojyb3q-uc.a.run.app", {
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

  const handleChangePage = (event, newPage) => {
    setpage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setpage(0);
  };


  // const slottiming = (
  //   Time_9_AM_10_AM,
  //   Time_10_AM_11_AM,
  //   Time_11_AM_12_PM,
  //   Time_12_PM_1_PM,
  //   Time_1_PM_2_PM,
  //   Time_2_PM_3_PM,
  //   Time_3_PM_4_PM,
  //   Time_4_PM_5_PM
  // ) => {
  //   if (Time_9_AM_10_AM === "true") {
  //     return "9 AM - 10 AM";
  //   } else if (Time_10_AM_11_AM === "true") {
  //     return "10 AM - 11 AM";
  //   } else if (Time_11_AM_12_PM === "true") {
  //     return "11 AM - 12 PM";
  //   } else if (Time_12_PM_1_PM === "true") {
  //     return "12 PM - 1 PM";
  //   } else if (Time_1_PM_2_PM === "true") {
  //     return "1 PM - 2 PM";
  //   } else if (Time_2_PM_3_PM === "true") {
  //     return "2 PM - 3 PM";
  //   } else if (Time_3_PM_4_PM === "true") {
  //     return "3 PM - 4 PM";
  //   } else if (Time_4_PM_5_PM === "true") {
  //     return "4 PM - 5 PM";
  //   }
  // };

  // const sortedData = data.sort((a, b) => {
  //   const dateA = new Date(a.App_Date);
  //   const dateB = new Date(b.App_Date);
  //   if (dateA < dateB) {
  //     return 1;
  //   }
  //   if (dateA > dateB) {
  //     return -1;
  //   }

  //   const slotA = slottiming(
  //     a.Timing,
  //     a.App
  //   );
  //   const slotB = slottiming(
  //     b.Timing,
  //     b.App_Date
  //   );
  //   if (slotA < slotB) {
  //     return 1;
  //   }
  //   if (slotA > slotB) {
  //     return 1;
  //   }
  //   return 0;
  // });

  // const today = new Date();
  const filteredData = data.filter((row) => {
    const mrnNo = localStorage.getItem('Patient_MRN');
    const condition = localStorage.getItem('condition_name');
    // console.log(row['MRN'],row['Condition_name'],mrnNo,condition,'hiiiiiiiiiiiiiiiiiiiiiiiiiiii')
    // const appDate = new Date(row.App_Date);
    // return appDate >= today || appDate.toDateString() === today.toDateString(); // only include appointments with today's date or later
    return row['MRN'] === mrnNo && row['Condition_name'] === condition ;
  });

  const riskscore = (Appointment_Status) => {
    if (Appointment_Status === "Pending") {
      return (
        <CBadge
          color="warning"
          className="mfs-auto"
          fontSize="22px"
          align="center"
        >
          Pending
        </CBadge>
      );
    }
    if (Appointment_Status == null) {
      return (
        <CBadge
          color="info"
          className="mfs-auto"
          fontSize="22px"
          align="center"
        >
          No return
        </CBadge>
      );
    } else {
      return (
        <CBadge
          color="success"
          className="mfs-auto"
          fontSize="22px"
          align="center"
        >
          Booked
        </CBadge>
      );
    }
  };

  if (filteredData.length === 0) {
    return null;
  } else {
  return (
    <div>
    <CRow>
        <CCol className="navbar justify-content-between">
          <p className="navbar-brand">
            <b>Patients other appointments</b>
          </p>
        </CCol>
      </CRow>
    {/* <div> */}
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
                  <b>Patient Name</b>
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
                  <b>Status</b>
                </TableCell>
                
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData
                .filter((val) => {
                  if (searchTerm === "") {
                    return val;
                  } else if (
                    val.App_Date.toLowerCase().includes(
                      searchTerm.toLowerCase()
                    ) ||
                    val.Provider_id.toLowerCase().includes(
                      searchTerm.toLowerCase()
                    ) ||
                    val.Provider_name.toLowerCase().includes(
                      searchTerm.toLowerCase()
                    ) ||
                    val.Condition_code.toLowerCase().includes(
                      searchTerm.toLowerCase()
                    ) ||
                    val.Condition_name.toLowerCase().includes(
                      searchTerm.toLowerCase()
                    ) ||
                    val.Patient_name.toLowerCase().includes(
                      searchTerm.toLowerCase()
                    ) ||
                    val.Practitioner_name.toLowerCase().includes(
                      searchTerm.toLowerCase()
                    ) ||
                    val.Practitioner_Speciality.toLowerCase().includes(
                      searchTerm.toLowerCase()
                    ) ||
                    val.MRN.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    val.practitioner_email
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    val.provider_contact_number
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    val.Consent_form_choice.toLowerCase().includes(
                      searchTerm.toLowerCase()
                    ) ||
                    val.Patient_email.toLowerCase().includes(
                      searchTerm.toLowerCase()
                    ) ||
                    val.Practitioner_id.toLowerCase().includes(
                      searchTerm.toLowerCase()
                    )
                  ) {
                    return val;
                  }
                })
                .map((row, index) => {
                  return (
                    <StyledTableRow>
                      <StyledTableCell
                        style={{ textAlign: "center", width: "15%" }}
                      >
                        {row.Patient_name}
                      </StyledTableCell>
                      <StyledTableCell
                        style={{ textAlign: "center", width: "15%" }}
                      >
                        {row.Condition_name}
                      </StyledTableCell>
                      <StyledTableCell
                        style={{ textAlign: "center", width: "30%" }}
                      >
                        {row.Provider_name}
                      </StyledTableCell>
                      <StyledTableCell
                        style={{ textAlign: "center", width: "15%" }}
                      >
                        {row.Practitioner_name}
                      </StyledTableCell>
                      <StyledTableCell
                        style={{ textAlign: "center", width: "15%" }}
                      >
                        <b>{row.App_Date}</b>
                        <br />{row.Timing}:00 hrs
                      </StyledTableCell>
                      <StyledTableCell
                        style={{ textAlign: "center", width: "10%" }}
                      >
                        {riskscore(row.Appointment_Status)}
                      </StyledTableCell>
                      </StyledTableRow>
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
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />      

      {/* <LoadingOverlay
        active={isLoading}
        spinner
        text="Loading the content..."
        styles={{
          height: "100%",
          spinner: (base) => ({
            ...base,
            width: "50px",
            "& svg circle": {
              stroke: "rgba(255, 0, 0, 0.5)",
            },
          }),
        }}
      ></LoadingOverlay> */}
      
    </div>
    // </Layout>
  );
}}
