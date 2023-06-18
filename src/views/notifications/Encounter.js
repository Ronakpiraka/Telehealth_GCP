import React, { useEffect, useState } from 'react'
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import { withStyles } from '@material-ui/core/styles';
import { CBadge } from "@coreui/react";
import EventIcon from '@mui/icons-material/Event';
import CallIcon from '@mui/icons-material/Call';

export default function Encounter(props) {
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

    const { row, data } = props;
    const [open, setopen] = React.useState(false);
    const [opepatientdata, setopepatientdata] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModal1Open, setIsModal1Open] = useState(false);
    const [isModal2Open, setIsModal2Open] = useState(false);
    const [modalData, setModalData] = useState({});
    var url;

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

    var pradet = data.filter(val => {
        if (val.Provider_id === row.Provider_id) {
            return val;
        }
    })

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

    const openopeModal = (rowData) => {
        // no upload and change
        setIsModalOpen(true);
        setModalData(rowData);
    };

    const closeopeModal = () => {
        setIsModalOpen(false);
    };

    const closencModal = () => {
        setIsModal1Open(false);
    };

    const openncModal = (rowData) => {
        //change consent modal
        setIsModal1Open(true);
        setModalData(rowData);
    };

    const openteleModal = (rowData) => {
        setIsModal2Open(true);
        setModalData(rowData);
      };
    
      const closeteleModal = () => {
        setIsModal2Open(false);
      };

    return (
    <React.Fragment>
        <StyledTableRow>
            <StyledTableCell>
                <IconButton aria-label="expand row" size="small" onClick={() => setopen(!open)}>
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
            </StyledTableCell>
            <StyledTableCell
              style={{ textAlign: "center", width: "15%" }}
            >
              {row.Patient_name}
            </StyledTableCell>
            <StyledTableCell
              style={{ textAlign: "center", width: "15%" }}
            >
              {row.MRN}<br />
              {checkpatientope(row.MRN) === 1 ? <b>(OPE Affiliated)</b> : ""}
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
              <br />
              {row.Timing}:00 hrs
            </StyledTableCell>
            <StyledTableCell
              style={{ textAlign: "center", width: "10%" }}
            >
              {riskscore(row.Appointment_Status)}
              {row.Apttype === "Appointment" ? <EventIcon /> : <CallIcon />}<br />
              {row.Connected_Care_Status === true ? "Continuous Care" : ""}
            </StyledTableCell>
            <StyledTableCell
              style={{ textAlign: "center", width: "10%" }}
            >
              {/* <b>Documents Awaited </b><br/> */}
              {row.Document_Status}<br />
              {handleConsentChange(row.Consent_form_choice)}
            </StyledTableCell>
            <StyledTableCell
              style={{ textAlign: "center", width: "15%" }}
            >
              {/* <button type="button" class="btn btn-primary" onClick={() => openncModal(row)}>Check status&nbsp;<TelegramIcon /></button> */}
              {checkpatientope(row.MRN) === 1 ? (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => openopeModal(row)}
                >
                  Check status 
                </button>
              ) : row.Consent_form_choice === 'Do not' ? (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => openncModal(row)}
                >
                  Check status 
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => openteleModal(row)}
                >
                  Check status 
                </button>)}
            </StyledTableCell>
            {/* <StyledTableCell style={{ textAlign: 'center'}} key={index}> <button key={index} type="button" class="btn btn-primary" onClick={() => sendemail(row.Patient_name, row.Practitioner_name,row.Guardian_Email,row.Provider_name,row.Provider_contact_number,row.practitioner_email)}>Send &nbsp;<TelegramIcon/></button></StyledTableCell> */}
        </StyledTableRow>
      <StyledTableRow>
        <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Table size="small" aria-label="provider">
                <TableHead style={{ fontWeight: 'bold', color: "blue", margin: "22px" }}>Encounter Details:  </TableHead>
                <StyledTableRow>
                  <StyledTableCell style={{ fontWeight: 'bold', width: '16%' }} />
                  <StyledTableCell style={{ fontWeight: 'bold', width: '28%' }}>Name</StyledTableCell>
                  <StyledTableCell style={{ fontWeight: 'bold', width: '28%' }}>Specialisation</StyledTableCell>
                  <StyledTableCell style={{ fontWeight: 'bold', width: '28%' }}>Email ID</StyledTableCell>
                </StyledTableRow>
                {pradet.map((item) =>
                  <StyledTableRow key={item.Practitioner_id} >

                    <StyledTableCell style={{ fontWeight: 'bold', width: '16%' }} />
                    <StyledTableCell style={{ width: '28%' }}>{item.Practitioner_name}</StyledTableCell>
                    <StyledTableCell style={{ width: '28%' }}>{item.Practitioner_Speciality_1}</StyledTableCell>
                    <StyledTableCell style={{ width: '28%' }}>{item.practitioner_email}</StyledTableCell>
                  </StyledTableRow>
                )}
              </Table>
            </Box>
          </Collapse>
        </StyledTableCell>
      </StyledTableRow>
    </React.Fragment >
  );
}
