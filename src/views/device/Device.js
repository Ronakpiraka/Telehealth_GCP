import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import { Layout, Menu, Input } from "antd";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import { makeStyles, alpha, withStyles } from "@material-ui/core/styles";
import LoadingOverlay from "react-loading-overlay";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import localizedFormat from "dayjs/plugin/localizedFormat";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { Modal, Button } from "react-bootstrap";
// import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import "../records/patients.css";
import { OneKPlusOutlined } from "@mui/icons-material";
import { CSpinner } from '@coreui/react'
import { CBadge } from "@coreui/react";

export default function Device() {
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
      width: "100%",
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

  const handleChangePage = (event, newPage) => {
    setpage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setpage(0);
  };
  // const classes = useStyles();
  const [data, setdata] = React.useState([]);
  const [searchTerm, setsearchTerm] = React.useState("");
  const [isLoading, setisLoading] = useState(true);
  const [page, setpage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [openExtendModal, setOpenExtendModal] = useState(false);
  const [extendDate, setExtendDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [openClosureModal, setOpenClosureModal] = useState(false);
  const [closureDate, setClosureDate] = useState(null);

  const classes = useStyles();

  const fetchpatientdata = () => {
    console.log("check function");

    var requestOptions = {
      method: "GET",
    };

    fetch("https://device-data-sh4iojyb3q-uc.a.run.app", requestOptions)
      .then((resp) => resp.json())
      .then((response) => {
        // const data = response.reduce((acc, cur) => {
        //   if (
        //     !acc[cur.Device_id] ||
        //     new Date(cur.s.timestamp) >
        //       new Date(acc[cur.Device_id].s.timestamp)
        //   ) {
        //     acc[cur.Device_id] = cur;
        //   }
        //   return acc;
        // }, {});
        // setdata(Object.values(data));
        setdata(response);
        setisLoading(false);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    fetchpatientdata();
  }, []);

  const riskscore = (Appointment_Status) => {
    if (Appointment_Status === "Active") {
      return (
        <CBadge
          color="success"
          className="mfs-auto"
          fontSize="22px"
          align="center"
        >
          Active
        </CBadge>
      );
    }
    else{
      return (
        <CBadge
          color="warning"
          className="mfs-auto"
          fontSize="22px"
          align="center"
        >
          Inactive
        </CBadge>
      );
    }
  };

  const handleOpenExtendModal = (endDate) => {
    console.log("inside of Extend modal ", endDate)
    setExtendDate(null); // Reset previous selected date
    setOpenExtendModal(true);
    setEndDate(endDate); // Store the End_Date in state
  };

  const handleExtendModalClose = () => {
    setOpenExtendModal(false);
    setEndDate(null);
  };

  const handleOpenClosureModal = (endDate) => {
    console.log("inside of Closure modal ", endDate)
    setClosureDate(null); // Reset previous selected date
    setOpenClosureModal(true);
    setEndDate(endDate); // Store the End_Date in state
  };



  const displayCheckedBox = (row) => {
    console.log("--------------row");
    console.log(row);
    if (row.RemoteCareStatus) {
      //change the logic here
      // if(row)
      return (
        <>
          <FormControlLabel
            disabled
            control={
              <Checkbox
                checked
                name="checkedEvent"
                style={{ color: "#1890ff" }}
              />
            }
          />
        </>
      );
    } else {
      return (
        <FormControlLabel disabled control={<Checkbox name="checkedEvent" />} />
      );
    }
  };


  return (
    <>
      <h2 className="title">
        <strong>Device Information</strong>
      </h2>
      <Modal open={openExtendModal} onClose={() => setOpenExtendModal(false)}>
        {/* <Modal.Header closeButton>
          <Modal.Title>
            <b>Closure Date</b>
          </Modal.Title>
        </Modal.Header> */}
        <Modal.Body>
          hi hello
          {/* <MobileDateTimePicker
            selected={extendDate}
            onChange={(date) => setExtendDate(date)}
            minDate={new Date(endDate)}
            maxDate={new Date(endDate).setMonth(new Date(endDate).getMonth() + 3)}
          /> */}
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={setOpenExtendModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit new Date
          </Button>
        </Modal.Footer> */}
      </Modal>

      <Modal open={openClosureModal} onClose={() => setOpenClosureModal(false)}>
        {/* <Modal.Header closeButton>
          <Modal.Title>
            <b>Closure Date</b>
          </Modal.Title>
        </Modal.Header> */}
        <Modal.Body>
          hi hello closure
          
          {/* <MobileDateTimePicker
            selected={closureDate}
            onChange={(date) => setClosureDate(date)}
            minDate={new Date()}
            maxDate={new Date(endDate)}
          /> */}
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={setOpenClosureModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit new Date
          </Button>
        </Modal.Footer> */}
      </Modal>

      <Paper style={{ width: "100%", overflow: "hidden" }}>
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
            onChange={(e) => {
              setsearchTerm(e.target.value);
            }}
            inputProps={{ "aria-label": "search" }}
          />
        </div>
        <TableContainer style={{ maxHeight: 300 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow style={{ padding: "0px" }}>
                {/* <TableCell align="center" style={{ fontWeight: 'bold'}}>Id</TableCell> */}
                <TableCell style={{ fontWeight: "bold", textAlign: "center" }}>
                  Device ID
                </TableCell>
                <TableCell style={{ fontWeight: "bold", textAlign: "center" }}>
                  Patient_MRN
                </TableCell>
                <TableCell style={{ fontWeight: "bold", textAlign: "center" }}>
                  Patient Name
                </TableCell>
                <TableCell style={{ fontWeight: "bold", textAlign: "center" }}>
                  Device Status
                </TableCell>
                <TableCell style={{ fontWeight: "bold", textAlign: "center" }}>
                  Start Date
                </TableCell>
                <TableCell style={{ fontWeight: "bold", textAlign: "center" }}>
                  End Date
                </TableCell>
                {/* <TableCell style={{ fontWeight: "bold", textAlign: "center" }}>
                  Change End Date
                </TableCell> */}
              </TableRow>
            </TableHead>

            <TableBody>
              {Object.values(
                data.reduce((acc, cur) => {
                  if (
                    // cur.Status === "Active" &&
                    (!acc[cur.Patient_id] ||
                      new Date(cur.End_Date) > new Date(acc[cur.Patient_id].End_Date))
                  ) {
                    acc[cur.Patient_id] = cur;
                  }
                  return acc;
                }, {})
              ).filter((val) => {
                if (searchTerm === "") {
                  return val;
                } else if (
                  val.Device_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  val.Patient_name.toLowerCase().includes(searchTerm.toLowerCase())) {
                  return val;
                }
              })
                .sort((a, b) => new Date(b.End_Date) - new Date(a.End_Date))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow key={row.Patient_id}>
                    <StyledTableCell style={{ textAlign: "center" }}>
                      {row.Device_id}
                    </StyledTableCell>
                    <StyledTableCell style={{ textAlign: "center" }}>
                      {row.Patient_MRN}
                    </StyledTableCell>
                    <StyledTableCell style={{ textAlign: "center" }}>
                      {row.Patient_name}
                    </StyledTableCell>
                    <StyledTableCell style={{ textAlign: "center" }}>
                      {riskscore(row.Status)}
                    </StyledTableCell>
                    <StyledTableCell style={{ textAlign: "center" }}>
                      {row.Start_Date}
                    </StyledTableCell>
                    <StyledTableCell style={{ textAlign: "center" }}>
                      {row.End_Date}
                    </StyledTableCell>
                    {/* <StyledTableCell style={{ textAlign: "center" }}>
                      <button onClick={() => handleOpenExtendModal(row.End_Date)}>Extend</button>
                      <button onClick={() => handleOpenClosureModal(row.End_Date)}>Closure</button>
                    </StyledTableCell> */}
                     {openExtendModal && (
                      <div>
                        {/* Place your modal code here
                        <MobileDateTimePicker value={endDate} onChange={handleExtendModalClose} /> */}
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={['MobileDateTimePicker', 'MobileDateTimePicker']}>
                            <MobileDateTimePicker
                              label={'Date & Time'}
                              openTo="hours"
                              ampm={false}
                              minutesStep={60}
                              value={endDate}
                              // value={(localStorage.getItem('connectedCareValue') === 'Yes') ? dayjs().add(1, 'hour').startOf('hour') : newDateTime}
                              // disablePast={true}
                              // disableFuture={localStorage.getItem('connectedCareValue') === 'Yes'}
                              // disabled={localStorage.getItem('connectedCareValue') === 'Yes'}
                              // onChange={handleDateTimeChange}
                              onChange={handleExtendModalClose}
                            />
                          </DemoContainer>
                        </LocalizationProvider>
                      </div>
                    )} 
                  </TableRow>
                ))}
            </TableBody>

          </Table>
        </TableContainer>
      </Paper>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50, 100, 200]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
       {isLoading && 
      <div style={{textAlign:'center'}}>
        <CSpinner color="primary" variant="grow"/>
        <CSpinner color="secondary" variant="grow"/>
        <CSpinner color="success" variant="grow"/>
        <CSpinner color="danger" variant="grow"/>
        <CSpinner color="warning" variant="grow"/>
        <CSpinner color="info" variant="grow"/>
        <CSpinner color="primary" variant="grow"/>
        <CSpinner color="dark" variant="grow"/>
      </div>
      }
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
    </>
    // {/* </Layout> */}
  );
}
