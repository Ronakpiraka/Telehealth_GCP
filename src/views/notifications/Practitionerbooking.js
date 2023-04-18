import React, { useEffect, useRef, useState } from "react";
import "./PatientInfo.css";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import MenuItem from "@mui/material/MenuItem";
import CIcon from "@coreui/icons-react";
import "react-toastify/dist/ReactToastify.css";
import { alpha } from "@material-ui/core/styles";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { useHistory, useLocation } from "react-router-dom";
import LoadingOverlay from "react-loading-overlay";
import "../records/patients.css";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import TextField from "@mui/material/TextField";
import { CModal } from "@coreui/react";
import { CModalFooter } from "@coreui/react";
import { CModalHeader } from "@coreui/react";
import { CModalBody } from "@coreui/react";
import { CButton } from "@coreui/react";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import PatientAppointment from "../notifications/PatientAppointments";
import Consent from "../notifications/Consent.js";
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

// import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
// import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import {
  Modal,
  CCard,
  CCardBody,
  CCardGroup,
  CWidgetDropdown,
  CCol,
  CRow,
  CWidgetProgressIcon,
  CCardText,
} from "@coreui/react";
// import { style } from "@mui/system";
export default function PractitionerBooking() {
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

  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.extend(localizedFormat);

  const [data, setdata] = React.useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [finaldata, setfinaldata] = React.useState([]);
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [finalprac, setpracdata] = React.useState([]);
  const [modal, setModal] = useState(false);
  const [timeslot, settimeslot] = React.useState([]);
  // const [selectedCard, setSelectedCard] = useState(null);
  // const history = useHistory();
  const [providername, setProvidername] = useState();
  // const [selectedTime, setTime] = React.useState("");
  const [selectedProvider, setselectedprovider] = React.useState("");
  const [selectedSlot, setSelectedSlot] = React.useState("");
  const [showModal, setShowModal] = useState(false);
  const [availableSlots, setavailableSlots] = React.useState("");

  const toggle = () => {
    setModal(!modal);
  };
  var stat, flags, Pname, conditionName;
  const location = useLocation();
  var provider = "";

  useEffect(() => {
    fetch("https://emailnotifications-sh4iojyb3q-uc.a.run.app", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        response.sort((a, b) => {
          // Sorted the response array by condition name and then by practitioner name
          if (a.App_Date < b.App_Date) return -1;
          if (a.App_Date > b.App_Date) return 1;
          return 0;
        });

        setdata(response);
        console.log("Sorted appointment data", response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    flags = location.search.split("^")[1];
    // conditionName = location.search.split("=")[1].split("%")[0];
    conditionName = localStorage.getItem('condition_name')
    console.log("condition", conditionName);

    Pname = sessionStorage.getItem("Patient");
    console.log(Pname, conditionName);

    const res = fetch("https://appointmentbook-sh4iojyb3q-uc.a.run.app ", {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((response) => {
        let Provider_id_list = new Array();
        let Provider_list_index = -1;
        // let Patient_condition = "";
        var final_data = new Array();
        console.log(response);
        for (var i = 0; i < response.length; i++) {
          // console.log(response[i]);
          Provider_list_index = Provider_id_list.indexOf(
            response[i].Provider_id
          );
          if (
            Provider_list_index == -1 &&
            response[i].Condition_name === conditionName
          ) {
            final_data.push(response[i]);
            Provider_id_list.push(response[i].Provider_id);
          }
        }
        console.log(final_data);
        setfinaldata(final_data);
        setpracdata(final_data);
        setisLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(finaldata);

  const uniqueProviderName = Array.from(
    new Set(finaldata.map((item) => JSON.stringify(item.Provider_name)))
  ).map((item) => JSON.parse(item));

  uniqueProviderName.sort((a, b) => {
    if (a < b) {
      return -1;
    } else if (a > b) {
      return 1;
    } else {
      return 0;
    }
  });
  console.log(uniqueProviderName);

  const redirecttoConsent = () => {
    //   if (selectedProvider != "" && selectedDate != "" && selectedSlot != "") {
    //     var url = `/notifications/Consent`;
    //     history.push(`${url}`);
    //   }
    //   else {
    //     setModal(!modal);
    //     console.log(modal);
    //   }
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleChangeSlot = (event) => {
    const date = localStorage.getItem("date");
    if (!date) {
      alert("Please select a date first");
      setSelectedDate("");
      // setSelectedSlot("");
      return;
    } else {
      console.log(event.target.value);
      setSelectedSlot(event.target.value);
      // onSelectedSlotChange(event.target.value);
      if (event.target.value == "9 AM - 10 AM") {
        localStorage.setItem("timeslot", event.target.value);
        localStorage.setItem("Time_9_AM_10_AM", true);
        localStorage.setItem("Time_10_AM_11_AM", false);
        localStorage.setItem("Time_11_AM_12_PM", false);
        localStorage.setItem("Time_12_PM_1_PM", false);
        localStorage.setItem("Time_1_PM_2_PM", false);
        localStorage.setItem("Time_2_PM_3_PM", false);
        localStorage.setItem("Time_3_PM_4_PM", false);
        localStorage.setItem("Time_4_PM_5_PM", false);
      }
      if (event.target.value == "10 AM - 11 AM") {
        localStorage.setItem("timeslot", event.target.value);
        localStorage.setItem("Time_9_AM_10_AM", false);
        localStorage.setItem("Time_10_AM_11_AM", true);
        localStorage.setItem("Time_11_AM_12_PM", false);
        localStorage.setItem("Time_12_PM_1_PM", false);
        localStorage.setItem("Time_1_PM_2_PM", false);
        localStorage.setItem("Time_2_PM_3_PM", false);
        localStorage.setItem("Time_3_PM_4_PM", false);
        localStorage.setItem("Time_4_PM_5_PM", false);
      }
      if (event.target.value == "11 AM - 12 PM") {
        localStorage.setItem("timeslot", event.target.value);
        localStorage.setItem("Time_9_AM_10_AM", false);
        localStorage.setItem("Time_10_AM_11_AM", false);
        localStorage.setItem("Time_11_AM_12_PM", true);
        localStorage.setItem("Time_12_PM_1_PM", false);
        localStorage.setItem("Time_1_PM_2_PM", false);
        localStorage.setItem("Time_2_PM_3_PM", false);
        localStorage.setItem("Time_3_PM_4_PM", false);
        localStorage.setItem("Time_4_PM_5_PM", false);
      }
      if (event.target.value == "12 PM - 1 PM") {
        localStorage.setItem("timeslot", event.target.value);
        localStorage.setItem("Time_9_AM_10_AM", false);
        localStorage.setItem("Time_10_AM_11_AM", false);
        localStorage.setItem("Time_11_AM_12_PM", false);
        localStorage.setItem("Time_12_PM_1_PM", true);
        localStorage.setItem("Time_1_PM_2_PM", false);
        localStorage.setItem("Time_2_PM_3_PM", false);
        localStorage.setItem("Time_3_PM_4_PM", false);
        localStorage.setItem("Time_4_PM_5_PM", false);
      }
      if (event.target.value == "1 PM - 2 PM") {
        localStorage.setItem("timeslot", event.target.value);
        localStorage.setItem("Time_9_AM_10_AM", false);
        localStorage.setItem("Time_10_AM_11_AM", false);
        localStorage.setItem("Time_11_AM_12_PM", false);
        localStorage.setItem("Time_12_PM_1_PM", false);
        localStorage.setItem("Time_1_PM_2_PM", true);
        localStorage.setItem("Time_2_PM_3_PM", false);
        localStorage.setItem("Time_3_PM_4_PM", false);
        localStorage.setItem("Time_4_PM_5_PM", false);
      }
      if (event.target.value == "2 PM - 3 PM") {
        localStorage.setItem("timeslot", event.target.value);
        localStorage.setItem("Time_9_AM_10_AM", false);
        localStorage.setItem("Time_10_AM_11_AM", false);
        localStorage.setItem("Time_11_AM_12_PM", false);
        localStorage.setItem("Time_12_PM_1_PM", false);
        localStorage.setItem("Time_1_PM_2_PM", false);
        localStorage.setItem("Time_2_PM_3_PM", true);
        localStorage.setItem("Time_3_PM_4_PM", false);
        localStorage.setItem("Time_4_PM_5_PM", false);
      }
      if (event.target.value == "3 PM - 4 PM") {
        localStorage.setItem("timeslot", event.target.value);
        localStorage.setItem("Time_9_AM_10_AM", false);
        localStorage.setItem("Time_10_AM_11_AM", false);
        localStorage.setItem("Time_11_AM_12_PM", false);
        localStorage.setItem("Time_12_PM_1_PM", false);
        localStorage.setItem("Time_1_PM_2_PM", false);
        localStorage.setItem("Time_2_PM_3_PM", false);
        localStorage.setItem("Time_3_PM_4_PM", true);
        localStorage.setItem("Time_4_PM_5_PM", false);
      }
      if (event.target.value == "4 PM - 5 PM") {
        localStorage.setItem("timeslot", event.target.value);
        localStorage.setItem("Time_9_AM_10_AM", false);
        localStorage.setItem("Time_10_AM_11_AM", false);
        localStorage.setItem("Time_11_AM_12_PM", false);
        localStorage.setItem("Time_12_PM_1_PM", false);
        localStorage.setItem("Time_1_PM_2_PM", false);
        localStorage.setItem("Time_2_PM_3_PM", false);
        localStorage.setItem("Time_3_PM_4_PM", false);
        localStorage.setItem("Time_4_PM_5_PM", true);
      }
    }
  };

  const handleDateChange = (newDate) => {
    setSelectedSlot("");

    const providerName = localStorage.getItem("provider_name");
    const practitionerName = localStorage.getItem("practitioner_name");

    if (!providerName || !practitionerName) {
      alert(
        "Please select a provider and practitioner before choosing a date."
      );
      return;
    } else {
      if (!newDate) {
        // if value is null, reset state
        setSelectedDate(null);
        localStorage.removeItem("date");
        return;
      }

      const today = dayjs().tz("Asia/Kolkata").startOf("day");
      const date = dayjs(newDate).tz("Asia/Kolkata").startOf("day");
      const twoMonthsAhead = today.add(2, "month");
      const dateSubstring = date.format("YYYY-MM-DD");

      if (date.isBefore(today) || date.isAfter(twoMonthsAhead)) {
        alert(
          "Please select a date that is not greater than today and not more than 2 months from today."
        );
        setSelectedDate(null);
        return;
      }
      // alert("new date",dateSubstring)
      setSelectedDate(dateSubstring);
      verify(dateSubstring);
      localStorage.setItem("date", dateSubstring);
    }
  };

  const verify = (dateSubstring) => {
    setSelectedSlot("");
    const slots = [
      "9 AM - 10 AM",
      "10 AM - 11 AM",
      "11 AM - 12 PM",
      "12 PM - 1 PM",
      "1 PM - 2 PM",
      "2 PM - 3 PM",
      "3 PM - 4 PM",
      "4 PM - 5 PM",
    ];

    const providerId = localStorage.getItem("provider_id");
    const practitionerId = localStorage.getItem("practitioner_id");
    const dateSelect = dateSubstring;

    const appointments = data.filter((appointment) => {
      return (
        appointment.Practitioner_id === practitionerId &&
        appointment.Provider_id === providerId &&
        appointment.App_Date === dateSelect
      );
    });

    const reservedSlots = appointments.map((appointment) => appointment.Timing);

    const availableSlots = slots.filter(
      (slot) => !reservedSlots.includes(slot)
    );

    console.log("Reserved slots:", reservedSlots);
    console.log("Available slots:", availableSlots);

    settimeslot(availableSlots);
  };

  const handleChange = (event) => {
    setselectedprovider(event.target.value);
    localStorage.removeItem("practitioner_name");
    localStorage.removeItem("practitioner_id");
    localStorage.removeItem("practitioner_name");
    localStorage.removeItem("practitioner_speciality");
    localStorage.removeItem("practitioner_email");
    localStorage.removeItem("date");
    localStorage.removeItem("timeslot");

    setSelectedDate("");
    setSelectedSlot("");
    provider = event.target.value;
    console.log(provider);
    setProvidername(provider);
    localStorage.setItem("provider_name", provider);
    var final_prac = new Array();
    let Prac_id_list = new Array();
    let Prac_list_index = -1;
    for (var i = 0; i < finaldata.length; i++) {
      // console.log(response[i]);
      Prac_list_index = Prac_id_list.indexOf(finaldata[i].Practitioner_id);
      if (Prac_list_index == -1 && finaldata[i].Provider_name == provider) {
        final_prac.push(finaldata[i]);
        Prac_id_list.push(finaldata[i].Practitioner_id);
        localStorage.setItem("provider_id", finaldata[i].Provider_id);
        localStorage.setItem(
          "provider_contact_number",
          finaldata[i].Provider_contact_number
        );
      }
    }
    setpracdata(final_prac);
  };

  return (
    <div>
      <CModal show={modal} onClose={toggle}>
        <CModalHeader closeButton>
          Please select the Provider and Available slots
        </CModalHeader>
        <CModalBody>
          Choose the Hospital and Available slots before selecting the
          Practitioner...
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={toggle}>
            Ok
          </CButton>
        </CModalFooter>
      </CModal>

      <CRow>
        {/* <CCol sm="1" md="1" lg="1" onClick={handleGoBack}><ArrowCircleLeftIcon/></CCol>
      <CCol sm="10" md="10" lg="10"><h1 className="title"><strong>Practitioner Information</strong></h1></CCol>
      <CCol sm="1" md="1" lg="1" alignItems="right" onClick={handleGoAhead}><ArrowCircleRightIcon/></CCol> */}
        <CCol>
          <h1 className="title">
            <strong>Practitioner Information</strong>
          </h1>
        </CCol>
      </CRow>
      <br />
      <br />
      <h4>Condition Name : {localStorage.getItem("condition_name")}</h4>

      {/* <CRow>
        <CCol className="navbar justify-content-between">
          <p className="navbar-brand">
            <b>Select Visit Date and Time</b>
          </p>
        </CCol>
      </CRow> */}

      <CRow>
        <CCol
          sm="12"
          md="6"
          lg="3"
        >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
         <DesktopDatePicker
              label="Available Date"
              inputFormat="DD/MM/YYYY"
              value={selectedDate ? selectedDate : null}
              disablePast={true}
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
          <br />
          <br />
        </CCol>

        <CCol sm="12"
          md="6"
          lg="3">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer
            components={['MobileTimePicker', 'MobileTimePicker', 'MobileTimePicker']}
            sx={{ minWidth: 100 }}>
            
            <MobileTimePicker label={'"hours"'} views={['hours']} />
          
          </DemoContainer>
        </LocalizationProvider>
        </CCol>
      </CRow>
      {/* <CRow>
        <CCol sm="12" md="12" lg="6">
          <Map/>
          <FormControl sx={{ minWidth: "100%" }}>
            <InputLabel id="demo-simple-select-label">Provider Name</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="provider name"
              onChange={handleChange}
            >
              {uniqueProviderName.map((row, index) => {
                return <MenuItem value={row}>{row}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </CCol>
      </CRow> */}
      <br />
      <CRow>
        <CCol className="navbar justify-content-between">
          <p className="navbar-brand">
            <b>Select Practitioner</b>
          </p>
        </CCol>
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
                stroke: "rgba(255, 0, 0, 0.5)",
              },
            }),
          }}
        >
        </LoadingOverlay>

        {finalprac.map((row, index) => {
          return (
            <CCol sm="6" md="6" lg="4">
              <CCardGroup
                className="mb-4"
                style={{
                  cursor: "pointer",
                }}
  
                onClick={(e) => {
                  redirecttoConsent(
                    e,
                    row.Patient_name,
                    row.Practitioner_name,
                    row.guardian_email
                  );
                  localStorage.setItem(
                    "practitioner_name",
                    row.Practitioner_name
                  );
                  localStorage.setItem(
                    "practitioner_id",
                     row.Practitioner_id
                  );
                  localStorage.setItem(
                    "practitioner_name",
                    row.Practitioner_name
                  );
                  localStorage.setItem(
                    "practitioner_speciality",
                    row.Practitioner_Speciality
                  );
                  localStorage.setItem(
                    "practitioner_email",
                    row.practitioner_email
                  );
                }}
              >
                <CWidgetProgressIcon
                  color="gradient-success"
                  inverse
                  style={{ color: "black" }}
                >
                  <CIcon
                    name="cil-userFollow"
                    style={{ float: "left" }}
                    height="24"
                  />
                  <p
                    style={{
                      fontSize: "75%",
                      textAlign: "left",
                      marginLeft: "50px",
                    }}
                  >
                    {row.Practitioner_name}
                  </p>
                  <p
                    sx={{ minWidth: "10 rem" , display: 'flex', justifyContent: 'space-between'}}
                    style={{ fontSize: "50%", textAlign: "left" }}
                  >
                    {row.Practitioner_Speciality}
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      style={{
                        cursor: "pointer",
                        padding: "1%",
                        fontWeight: "bolder",
                        float: "right"
                      }}
                      // onClick={(e) => { redirecttoConsent( e, row.Patient_name, row.Practitioner_name, row.guardian_email ); localStorage.setItem( "practitioner_name", row.Practitioner_name ); localStorage.setItem( "practitioner_id", row.Practitioner_id ); localStorage.setItem( "practitioner_name", row.Practitioner_name ); localStorage.setItem( "practitioner_speciality", row.Practitioner_Speciality ); localStorage.setItem( "practitioner_email", row.practitioner_email ); }}>
                    >
                      Select
                    </button>
                  </p>
                </CWidgetProgressIcon>
              </CCardGroup>
            </CCol>
          );
        })}
      </CRow>

      <CRow>
        <CCol>
          <PatientAppointment />
        </CCol>
      </CRow>

      <Consent></Consent>
    </div>
  );
}
