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
import Map from './Markers'
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
// import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
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
import DatePicker from 'react-datepicker/dist/react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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
  // const StyledTableCell = withStyles((theme) => ({
  //   body: {
  //     fontSize: 14,
  //   },
  // }))(TableCell);
  // const StyledTableRow = withStyles((theme) => ({
  //   root: {
  //     "&:nth-of-type(odd)": {
  //       backgroundColor: theme.palette.action.hover,
  //     },
  //   },
  // }))(TableRow);
  // const StyledTableCell = withStyles((theme) => ({
  //   body: {
  //     fontSize: 14,
  //   },
  // }))(TableCell);
  // const StyledTableRow = withStyles((theme) => ({
  //   root: {
  //     "&:nth-of-type(odd)": {
  //       backgroundColor: theme.palette.action.hover,
  //     },
  //   },
  // }))(TableRow);

  // dayjs.extend(utc);
  // dayjs.extend(timezone);
  // dayjs.extend(localizedFormat);
  // dayjs.extend(utc);
  // dayjs.extend(timezone);
  // dayjs.extend(localizedFormat);

  const [data, setdata] = React.useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [finaldata, setfinaldata] = React.useState([]);
  const [selectedDate, setSelectedDate] = React.useState();
  const [finalprac, setpracdata] = React.useState([]);
  const [modal, setModal] = useState(false);
  const [timeslot, settimeslot] = React.useState([]);
  const [pincode, setPincode] = useState('');

  // const [selectedCard, setSelectedCard] = useState(null);
  // const history = useHistory();
  const [providername, setProvidername] = useState();
  // const [selectedTime, setTime] = React.useState("");
  const [selectedProvider, setselectedprovider] = React.useState("");
  const [selectedSlot, setSelectedSlot] = React.useState("");
  const [showModal, setShowModal] = useState(false);
  const [availableSlots, setavailableSlots] = React.useState("");

  const [matchedSlot, setMatchedSlot] = useState("");
  const [locations, setlocations] = useState("");
  const [enteredTime, setEnteredTime] = useState("");


  var stat, flags, Pname, conditionName;
  const location = useLocation();
  var provider = "";

  const toggle = () => {
    setModal(!modal);
  };


  // const HourPicker = ({ selected, onChange }) => (
  //   <DatePicker
  //   selected={selected}
  //   onChange={onChange}
  //   showTimeSelect
  //   timeFormat="HH:mm"
  //   timeIntervals={60}
  //   showDisabledMonthNavigation
  //   dateFormat="MMMM d, yyyy h:mm aa"
  //   withPortal
  //   placeholderText="Click to select a date"
  //   isClearable={true}
  //   />
  // );


  // const HourPicker = ({ selected, onChange }) => (
  //   <DatePicker
  //   selected={selected}
  //   onChange={onChange}
  //   showTimeSelect
  //   timeFormat="HH:mm"
  //   timeIntervals={60}
  //   showDisabledMonthNavigation
  //   dateFormat="MMMM d, yyyy h:mm aa"
  //   withPortal
  //   placeholderText="Click to select a date"
  //   isClearable={true}
  //   />
  // );

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



  // useEffect(() => {
  //   flags = location.search.split("^")[1];
  //   // conditionName = location.search.split("=")[1].split("%")[0];
  //   conditionName = localStorage.getItem("condition_name");
  //   // date = localStorage.getItem("");
  //   // time = localStorage.getItem("");
  //   console.log("condition", conditionName);

  //   Pname = sessionStorage.getItem("Patient");
  //   console.log(Pname, conditionName);

  //   const res = fetch("https://appointmentbook-sh4iojyb3q-uc.a.run.app ", {
  //     method: "GET",
  //   })
  //     .then((resp) => resp.json())
  //     .then((response) => {
  //       let Provider_id_list = new Array();
  //       let Provider_list_index = -1;
  //       // let Patient_condition = "";
  //       var final_data = new Array();
  //       console.log(response);
  //       for (var i = 0; i < response.length; i++) {
  //         // console.log(response[i]);
  //         Provider_list_index = Provider_id_list.indexOf(
  //           response[i].Provider_id
  //         );
  //         if (
  //           Provider_list_index == -1 &&
  //           response[i].Condition_name === conditionName
  //           // &&response[i].App_Date === date &&
  //           // response[i].timeslot === conditionName
  //         ) {
  //           final_data.push(response[i]);
  //           Provider_id_list.push(response[i].Provider_id);
  //         }
  //       }
  //       console.log(final_data);
  //       setfinaldata(final_data);
  //       setpracdata(final_data);
  //       setisLoading(false);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);


  // useEffect(() => {
  //   flags = location.search.split("^")[1];
  //   // conditionName = location.search.split("=")[1].split("%")[0];
  //   conditionName = localStorage.getItem("condition_name");
  //   // date = localStorage.getItem("");
  //   // time = localStorage.getItem("");
  //   console.log("condition", conditionName);

  //   Pname = sessionStorage.getItem("Patient");
  //   console.log(Pname, conditionName);

  //   const res = fetch("https://appointmentbook-sh4iojyb3q-uc.a.run.app ", {
  //     method: "GET",
  //   })
  //     .then((resp) => resp.json())
  //     .then((response) => {
  //       let Provider_id_list = new Array();
  //       let Provider_list_index = -1;
  //       // let Patient_condition = "";
  //       var final_data = new Array();
  //       console.log(response);
  //       for (var i = 0; i < response.length; i++) {
  //         // console.log(response[i]);
  //         Provider_list_index = Provider_id_list.indexOf(
  //           response[i].Provider_id
  //         );
  //         if (
  //           Provider_list_index == -1 &&
  //           response[i].Condition_name === conditionName
  //           // &&response[i].App_Date === date &&
  //           // response[i].timeslot === conditionName
  //         ) {
  //           final_data.push(response[i]);
  //           Provider_id_list.push(response[i].Provider_id);
  //         }
  //       }
  //       console.log(final_data);
  //       setfinaldata(final_data);
  //       setpracdata(final_data);
  //       setisLoading(false);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);
  useEffect(() => {
    flags = location.search.split("^")[1];
    // conditionName = location.search.split("=")[1].split("%")[0];
    conditionName = localStorage.getItem("condition_name");
    // date = localStorage.getItem("");
    // time = localStorage.getItem("");
    console.log("condition", conditionName);

    Pname = sessionStorage.getItem("Patient");
    console.log(Pname, conditionName);

    const res = fetch("https://appointmentbook-sh4iojyb3q-uc.a.run.app ", {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((response) => {
        console.log(response);
        setfinaldata(response);
        setisLoading(false);
        console.log(response);
        setfinaldata(response);
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

  const redirecttoConsent = () => { };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  // const handleChangeSlot = (event) => {
  //   const date = localStorage.getItem("date");
  //   if (!date) {
  //     alert("Please select a date first");
  //     setSelectedDate("");
  //     // setSelectedSlot("");
  //     return;
  //   } else {
  //     console.log(event.target.value);
  //     setSelectedSlot(event.target.value);
  //     // onSelectedSlotChange(event.target.value);
  //     if (event.target.value == "9 AM - 10 AM") {
  //       localStorage.setItem("timeslot", event.target.value);
  //       localStorage.setItem("Time_9_AM_10_AM", true);
  //       localStorage.setItem("Time_10_AM_11_AM", false);
  //       localStorage.setItem("Time_11_AM_12_PM", false);
  //       localStorage.setItem("Time_12_PM_1_PM", false);
  //       localStorage.setItem("Time_1_PM_2_PM", false);
  //       localStorage.setItem("Time_2_PM_3_PM", false);
  //       localStorage.setItem("Time_3_PM_4_PM", false);
  //       localStorage.setItem("Time_4_PM_5_PM", false);
  //     }
  //     if (event.target.value == "10 AM - 11 AM") {
  //       localStorage.setItem("timeslot", event.target.value);
  //       localStorage.setItem("Time_9_AM_10_AM", false);
  //       localStorage.setItem("Time_10_AM_11_AM", true);
  //       localStorage.setItem("Time_11_AM_12_PM", false);
  //       localStorage.setItem("Time_12_PM_1_PM", false);
  //       localStorage.setItem("Time_1_PM_2_PM", false);
  //       localStorage.setItem("Time_2_PM_3_PM", false);
  //       localStorage.setItem("Time_3_PM_4_PM", false);
  //       localStorage.setItem("Time_4_PM_5_PM", false);
  //     }
  //     if (event.target.value == "11 AM - 12 PM") {
  //       localStorage.setItem("timeslot", event.target.value);
  //       localStorage.setItem("Time_9_AM_10_AM", false);
  //       localStorage.setItem("Time_10_AM_11_AM", false);
  //       localStorage.setItem("Time_11_AM_12_PM", true);
  //       localStorage.setItem("Time_12_PM_1_PM", false);
  //       localStorage.setItem("Time_1_PM_2_PM", false);
  //       localStorage.setItem("Time_2_PM_3_PM", false);
  //       localStorage.setItem("Time_3_PM_4_PM", false);
  //       localStorage.setItem("Time_4_PM_5_PM", false);
  //     }
  //     if (event.target.value == "12 PM - 1 PM") {
  //       localStorage.setItem("timeslot", event.target.value);
  //       localStorage.setItem("Time_9_AM_10_AM", false);
  //       localStorage.setItem("Time_10_AM_11_AM", false);
  //       localStorage.setItem("Time_11_AM_12_PM", false);
  //       localStorage.setItem("Time_12_PM_1_PM", true);
  //       localStorage.setItem("Time_1_PM_2_PM", false);
  //       localStorage.setItem("Time_2_PM_3_PM", false);
  //       localStorage.setItem("Time_3_PM_4_PM", false);
  //       localStorage.setItem("Time_4_PM_5_PM", false);
  //     }
  //     if (event.target.value == "1 PM - 2 PM") {
  //       localStorage.setItem("timeslot", event.target.value);
  //       localStorage.setItem("Time_9_AM_10_AM", false);
  //       localStorage.setItem("Time_10_AM_11_AM", false);
  //       localStorage.setItem("Time_11_AM_12_PM", false);
  //       localStorage.setItem("Time_12_PM_1_PM", false);
  //       localStorage.setItem("Time_1_PM_2_PM", true);
  //       localStorage.setItem("Time_2_PM_3_PM", false);
  //       localStorage.setItem("Time_3_PM_4_PM", false);
  //       localStorage.setItem("Time_4_PM_5_PM", false);
  //     }
  //     if (event.target.value == "2 PM - 3 PM") {
  //       localStorage.setItem("timeslot", event.target.value);
  //       localStorage.setItem("Time_9_AM_10_AM", false);
  //       localStorage.setItem("Time_10_AM_11_AM", false);
  //       localStorage.setItem("Time_11_AM_12_PM", false);
  //       localStorage.setItem("Time_12_PM_1_PM", false);
  //       localStorage.setItem("Time_1_PM_2_PM", false);
  //       localStorage.setItem("Time_2_PM_3_PM", true);
  //       localStorage.setItem("Time_3_PM_4_PM", false);
  //       localStorage.setItem("Time_4_PM_5_PM", false);
  //     }
  //     if (event.target.value == "3 PM - 4 PM") {
  //       localStorage.setItem("timeslot", event.target.value);
  //       localStorage.setItem("Time_9_AM_10_AM", false);
  //       localStorage.setItem("Time_10_AM_11_AM", false);
  //       localStorage.setItem("Time_11_AM_12_PM", false);
  //       localStorage.setItem("Time_12_PM_1_PM", false);
  //       localStorage.setItem("Time_1_PM_2_PM", false);
  //       localStorage.setItem("Time_2_PM_3_PM", false);
  //       localStorage.setItem("Time_3_PM_4_PM", true);
  //       localStorage.setItem("Time_4_PM_5_PM", false);
  //     }
  //     if (event.target.value == "4 PM - 5 PM") {
  //       localStorage.setItem("timeslot", event.target.value);
  //       localStorage.setItem("Time_9_AM_10_AM", false);
  //       localStorage.setItem("Time_10_AM_11_AM", false);
  //       localStorage.setItem("Time_11_AM_12_PM", false);
  //       localStorage.setItem("Time_12_PM_1_PM", false);
  //       localStorage.setItem("Time_1_PM_2_PM", false);
  //       localStorage.setItem("Time_2_PM_3_PM", false);
  //       localStorage.setItem("Time_3_PM_4_PM", false);
  //       localStorage.setItem("Time_4_PM_5_PM", true);
  //     }
  //   }
  // };
  // const handleChangeSlot = (event) => {
  //   const date = localStorage.getItem("date");
  //   if (!date) {
  //     alert("Please select a date first");
  //     setSelectedDate("");
  //     // setSelectedSlot("");
  //     return;
  //   } else {
  //     console.log(event.target.value);
  //     setSelectedSlot(event.target.value);
  //     // onSelectedSlotChange(event.target.value);
  //     if (event.target.value == "9 AM - 10 AM") {
  //       localStorage.setItem("timeslot", event.target.value);
  //       localStorage.setItem("Time_9_AM_10_AM", true);
  //       localStorage.setItem("Time_10_AM_11_AM", false);
  //       localStorage.setItem("Time_11_AM_12_PM", false);
  //       localStorage.setItem("Time_12_PM_1_PM", false);
  //       localStorage.setItem("Time_1_PM_2_PM", false);
  //       localStorage.setItem("Time_2_PM_3_PM", false);
  //       localStorage.setItem("Time_3_PM_4_PM", false);
  //       localStorage.setItem("Time_4_PM_5_PM", false);
  //     }
  //     if (event.target.value == "10 AM - 11 AM") {
  //       localStorage.setItem("timeslot", event.target.value);
  //       localStorage.setItem("Time_9_AM_10_AM", false);
  //       localStorage.setItem("Time_10_AM_11_AM", true);
  //       localStorage.setItem("Time_11_AM_12_PM", false);
  //       localStorage.setItem("Time_12_PM_1_PM", false);
  //       localStorage.setItem("Time_1_PM_2_PM", false);
  //       localStorage.setItem("Time_2_PM_3_PM", false);
  //       localStorage.setItem("Time_3_PM_4_PM", false);
  //       localStorage.setItem("Time_4_PM_5_PM", false);
  //     }
  //     if (event.target.value == "11 AM - 12 PM") {
  //       localStorage.setItem("timeslot", event.target.value);
  //       localStorage.setItem("Time_9_AM_10_AM", false);
  //       localStorage.setItem("Time_10_AM_11_AM", false);
  //       localStorage.setItem("Time_11_AM_12_PM", true);
  //       localStorage.setItem("Time_12_PM_1_PM", false);
  //       localStorage.setItem("Time_1_PM_2_PM", false);
  //       localStorage.setItem("Time_2_PM_3_PM", false);
  //       localStorage.setItem("Time_3_PM_4_PM", false);
  //       localStorage.setItem("Time_4_PM_5_PM", false);
  //     }
  //     if (event.target.value == "12 PM - 1 PM") {
  //       localStorage.setItem("timeslot", event.target.value);
  //       localStorage.setItem("Time_9_AM_10_AM", false);
  //       localStorage.setItem("Time_10_AM_11_AM", false);
  //       localStorage.setItem("Time_11_AM_12_PM", false);
  //       localStorage.setItem("Time_12_PM_1_PM", true);
  //       localStorage.setItem("Time_1_PM_2_PM", false);
  //       localStorage.setItem("Time_2_PM_3_PM", false);
  //       localStorage.setItem("Time_3_PM_4_PM", false);
  //       localStorage.setItem("Time_4_PM_5_PM", false);
  //     }
  //     if (event.target.value == "1 PM - 2 PM") {
  //       localStorage.setItem("timeslot", event.target.value);
  //       localStorage.setItem("Time_9_AM_10_AM", false);
  //       localStorage.setItem("Time_10_AM_11_AM", false);
  //       localStorage.setItem("Time_11_AM_12_PM", false);
  //       localStorage.setItem("Time_12_PM_1_PM", false);
  //       localStorage.setItem("Time_1_PM_2_PM", true);
  //       localStorage.setItem("Time_2_PM_3_PM", false);
  //       localStorage.setItem("Time_3_PM_4_PM", false);
  //       localStorage.setItem("Time_4_PM_5_PM", false);
  //     }
  //     if (event.target.value == "2 PM - 3 PM") {
  //       localStorage.setItem("timeslot", event.target.value);
  //       localStorage.setItem("Time_9_AM_10_AM", false);
  //       localStorage.setItem("Time_10_AM_11_AM", false);
  //       localStorage.setItem("Time_11_AM_12_PM", false);
  //       localStorage.setItem("Time_12_PM_1_PM", false);
  //       localStorage.setItem("Time_1_PM_2_PM", false);
  //       localStorage.setItem("Time_2_PM_3_PM", true);
  //       localStorage.setItem("Time_3_PM_4_PM", false);
  //       localStorage.setItem("Time_4_PM_5_PM", false);
  //     }
  //     if (event.target.value == "3 PM - 4 PM") {
  //       localStorage.setItem("timeslot", event.target.value);
  //       localStorage.setItem("Time_9_AM_10_AM", false);
  //       localStorage.setItem("Time_10_AM_11_AM", false);
  //       localStorage.setItem("Time_11_AM_12_PM", false);
  //       localStorage.setItem("Time_12_PM_1_PM", false);
  //       localStorage.setItem("Time_1_PM_2_PM", false);
  //       localStorage.setItem("Time_2_PM_3_PM", false);
  //       localStorage.setItem("Time_3_PM_4_PM", true);
  //       localStorage.setItem("Time_4_PM_5_PM", false);
  //     }
  //     if (event.target.value == "4 PM - 5 PM") {
  //       localStorage.setItem("timeslot", event.target.value);
  //       localStorage.setItem("Time_9_AM_10_AM", false);
  //       localStorage.setItem("Time_10_AM_11_AM", false);
  //       localStorage.setItem("Time_11_AM_12_PM", false);
  //       localStorage.setItem("Time_12_PM_1_PM", false);
  //       localStorage.setItem("Time_1_PM_2_PM", false);
  //       localStorage.setItem("Time_2_PM_3_PM", false);
  //       localStorage.setItem("Time_3_PM_4_PM", false);
  //       localStorage.setItem("Time_4_PM_5_PM", true);
  //     }
  //   }
  // };

  const handleHourChange = (date) => {
    setSelectedDate(date);
    console.log("selecteddate", date)
    console.log("selecteddate", date)
  }

  // const handleDateChange = (newDate) => {
  //   setSelectedSlot("");

  //   const providerName = localStorage.getItem("provider_name");
  //   const practitionerName = localStorage.getItem("practitioner_name");

  //   // if (!providerName || !practitionerName) {
  //   //   alert(
  //   //     "Please select a provider and practitioner before choosing a date."
  //   //   );
  //   //   return;
  //   // } else {
  //   if (!newDate) {
  //     // if value is null, reset state
  //     setSelectedDate(null);
  //     localStorage.removeItem("date");
  //     return;
  //   }
  // const handleDateChange = (newDate) => {
  //   setSelectedSlot("");

  //   const providerName = localStorage.getItem("provider_name");
  //   const practitionerName = localStorage.getItem("practitioner_name");

  //   // if (!providerName || !practitionerName) {
  //   //   alert(
  //   //     "Please select a provider and practitioner before choosing a date."
  //   //   );
  //   //   return;
  //   // } else {
  //   if (!newDate) {
  //     // if value is null, reset state
  //     setSelectedDate(null);
  //     localStorage.removeItem("date");
  //     return;
  //   }

  // const today = dayjs().tz("Asia/Kolkata").startOf("day");
  // console.log(today)
  // const date = dayjs(newDate).tz("Asia/Kolkata").startOf("day");
  // const twoMonthsAhead = today.add(2, "month");
  // const dateSubstring = date.format("YYYY-MM-DD");
  // const today = dayjs().tz("Asia/Kolkata").startOf("day");
  // console.log(today)
  // const date = dayjs(newDate).tz("Asia/Kolkata").startOf("day");
  // const twoMonthsAhead = today.add(2, "month");
  // const dateSubstring = date.format("YYYY-MM-DD");

  // if (date.isBefore(today) || date.isAfter(twoMonthsAhead)) {
  // if (date.isBefore(today) || date.isAfter(twoMonthsAhead)) {
  //   alert(
  //     "Please select a date that is not greater than today and not more than 2 months from today."
  //     "Please select a date that is not greater than today and not more than 2 months from today."
  //   );
  //   setSelectedDate(null);
  //   setSelectedDate(null);
  //   return;
  // }
  // }
  // alert("new date",dateSubstring)
  //   setSelectedDate(dateSubstring);
  //   verify(dateSubstring);
  //   localStorage.setItem("date", dateSubstring);
  //   // }
  // };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    localStorage.setItem('selectedDateTime', date.toISOString());
    const storedValue = localStorage.getItem('selectedDateTime');
    const [storedDate, storedTime] = storedValue.split('T');
    localStorage.setItem('selectedDate', storedDate);
    localStorage.setItem('selectedTime', storedTime);
    const [storedHour, storedMinute] = storedTime.split(':');
    localStorage.setItem('selectedhour', storedHour);

  };

  const timeSlots = [
    { a: "9:0", b: "17:0", c: "1:0" },
    { a: "10:0", b: "18:0", c: "2:0" },
    { a: "11:0", b: "19:0", c: "3:0" },
    { a: "12:0", b: "20:0", c: "4:0" },
    { a: "13:0", b: "21:0", c: "5:0" },
    { a: "14:0", b: "22:0", c: "6:0" },
    { a: "15:0", b: "23:0", c: "7:0" },
    { a: "16:0", b: "00:0", c: "8:0" },
  ];

  const handleTimeChange = (date) => {
    setEnteredTime(date);
    const dateObj = new Date(date);
    const timeString = dateObj.getHours() + ":" + dateObj.getMinutes();
    console.log(timeString)
    var count = 0
    conditionName = localStorage.getItem("condition_name");
    let myArray = [];
    // Loop through the timeSlots array and check if the entered time matches any of the time slots
    for (let i = 0; i < timeSlots.length; i++) {
      if (timeSlots[i].a === timeString) {
        console.log("Slot A");
        const slotARows = finaldata.filter(row => {
          if (row.Practitioner_Slot === "A" && row.Condition_name === conditionName) {
            count++
            console.log(row.Practitioner_Slot)
            myArray.push(row)
          }
          const slotALocations = slotARows.map(row => ({
            lat: row.Provider_lat,
            lng: row.Provider_long
          }));
          setlocations(slotALocations)
        });
      }
      else if (timeSlots[i].b === timeString) {
        console.log("Slot B");
        const slotBRows = finaldata.filter(row => {
          if (row.Practitioner_Slot === "B" && row.Condition_name === conditionName)
            count++
          console.log(row)
          myArray.push(row)
        });
      }
      else if (timeSlots[i].c === timeString) {
        console.log("Slot C");
        const slotCRows = finaldata.filter(row => {
          if (row.Practitioner_Slot === "C" && row.Condition_name === conditionName)
            count++
          console.log(row)
          myArray.push(row)
        });
      }
      else {
        console.log("No Match", timeslot[i], timeString)
      }
    }
    console.log(count)
    setpracdata(myArray)
    //   setSelectedDate(dateSubstring);
    //   verify(dateSubstring);
    //   localStorage.setItem("date", dateSubstring);
    //   // }
    // };

    
    const timeSlots = [
      
      { a: "9", b: "17", c: "1" },
      { a: "10", b: "18", c: "2" },
      { a: "11", b: "19", c: "3" },
      { a: "12", b: "20", c: "4" },
      { a: "13", b: "21", c: "5" },
      { a: "14", b: "22", c: "6" },
      { a: "15", b: "23", c: "7" },
      { a: "16", b: "00", c: "8" },
    ];

    const handleTimeChange = (date) => {
      setEnteredTime(date);
      const dateObj = new Date(date);
      const timeString = dateObj.getHours() + ":" + dateObj.getMinutes();
      console.log(timeString)
      var count = 0
      conditionName = localStorage.getItem("condition_name");
      let myArray = [];
      // Loop through the timeSlots array and check if the entered time matches any of the time slots
      for (let i = 0; i < timeSlots.length; i++) {
        if (timeSlots[i].a === timeString) {
          console.log("Slot A");
          const slotARows = finaldata.filter(row => {
            if (row.Practitioner_Slot === "A" && row.Condition_name === conditionName) {
              count++
              console.log(row.Practitioner_Slot)
              myArray.push(row)
            }
            const slotALocations = slotARows.map(row => ({
              lat: row.Provider_lat,
              lng: row.Provider_long
            }));
            setlocations(slotALocations)
          });
        }
        else if (timeSlots[i].b === timeString) {
          console.log("Slot B");
          const slotBRows = finaldata.filter(row => {
            if (row.Practitioner_Slot === "B" && row.Condition_name === conditionName)
              count++
            console.log(row)
            myArray.push(row)
          });
        }
        else if (timeSlots[i].c === timeString) {
          console.log("Slot C");
          const slotCRows = finaldata.filter(row => {
            if (row.Practitioner_Slot === "C" && row.Condition_name === conditionName)
              count++
            console.log(row)
            myArray.push(row)
          });
        }
        else {
          console.log("No Match", timeslot[i], timeString)
        }
      }
      console.log(count)
      setpracdata(myArray)
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

    function handlezipSubmit(e) {
      e.preventDefault();
      console.log(pincode); // replace with your desired action, e.g. submit to server
    }

    const handleTimePickerChange = (newValue) => {
      setSelectedSlot(newValue);
      localStorage.setItem('selectedSlot', newValue);
    }
   
    

  // const handleChange = (event) => {
  //   setselectedprovider(event.target.value);
  //   localStorage.removeItem("practitioner_name");
  //   localStorage.removeItem("practitioner_id");
  //   localStorage.removeItem("practitioner_name");
  //   localStorage.removeItem("practitioner_speciality");
  //   localStorage.removeItem("practitioner_email");
  //   // localStorage.removeItem("date");
  //   // localStorage.removeItem("timeslot");
  //   // setSelectedDate("");
  //   // setSelectedSlot("");
  //   provider = event.target.value;
  //   console.log(provider);
  //   setProvidername(provider);
  //   localStorage.setItem("provider_name", provider);
  //   var final_prac = new Array();
  //   let Prac_id_list = new Array();
  //   let Prac_list_index = -1;
  //   for (var i = 0; i < finaldata.length; i++) {
  //     // console.log(response[i]);
  //     Prac_list_index = Prac_id_list.indexOf(finaldata[i].Practitioner_id);
  //     if (Prac_list_index == -1 && finaldata[i].Provider_name == provider) {
  //       final_prac.push(finaldata[i]);
  //       Prac_id_list.push(finaldata[i].Practitioner_id);
  //       localStorage.setItem("provider_id", finaldata[i].Provider_id);
  //       localStorage.setItem(
  //         "provider_contact_number",
  //         finaldata[i].Provider_contact_number
  //       );
  //     }
  //   }
  //   setpracdata(final_prac);
  // };
  // const handleChange = (event) => {
  //   setselectedprovider(event.target.value);
  //   localStorage.removeItem("practitioner_name");
  //   localStorage.removeItem("practitioner_id");
  //   localStorage.removeItem("practitioner_name");
  //   localStorage.removeItem("practitioner_speciality");
  //   localStorage.removeItem("practitioner_email");
  //   // localStorage.removeItem("date");
  //   // localStorage.removeItem("timeslot");
  //   // setSelectedDate("");
  //   // setSelectedSlot("");
  //   provider = event.target.value;
  //   console.log(provider);
  //   setProvidername(provider);
  //   localStorage.setItem("provider_name", provider);
  //   var final_prac = new Array();
  //   let Prac_id_list = new Array();
  //   let Prac_list_index = -1;
  //   for (var i = 0; i < finaldata.length; i++) {
  //     // console.log(response[i]);
  //     Prac_list_index = Prac_id_list.indexOf(finaldata[i].Practitioner_id);
  //     if (Prac_list_index == -1 && finaldata[i].Provider_name == provider) {
  //       final_prac.push(finaldata[i]);
  //       Prac_id_list.push(finaldata[i].Practitioner_id);
  //       localStorage.setItem("provider_id", finaldata[i].Provider_id);
  //       localStorage.setItem(
  //         "provider_contact_number",
  //         finaldata[i].Provider_contact_number
  //       );
  //     }
  //   }
  //   setpracdata(final_prac);
  // };
  }
  return (
    <div>
      <CModal show={modal} onClose={toggle}>
        <CModalHeader closeButton>
          Please select the Provider and Practitioner
        </CModalHeader>
        <CModalBody>
          Choose the Hospital before selecting the Practitioner...
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={toggle}>
            Ok
          </CButton>
        </CModalFooter>
      </CModal>

      <CRow>
        <CCol>
          <h1 className="title">
            <strong>Critical Practitioner Information</strong>
          </h1>
        </CCol>
      </CRow>
      <br />
      <br />
      <h4>Condition Name : {localStorage.getItem("condition_name")}</h4>


      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['MobileDateTimePicker', 'MobileDateTimePicker']}>
        <MobileDateTimePicker
          label={'Date & Time'}
          openTo="hours"
          ampm={false}
          minutesStep={60}
          value={selectedDate}
          disablePast = {true}
          onChange={handleDateChange}
        />
      </DemoContainer>
    </LocalizationProvider>

      <br />
      <div>
        <Map
          containerElement={<div style={{ height: `500px`, width: "100%" }} />}
          mapElement={<div style={{ height: `100%` }} />}
          markers={locations}
        />
      </div>
      {/* <Map/> */}

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
        ></LoadingOverlay>

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
                  localStorage.setItem("practitioner_id", row.Practitioner_id);
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
                    sx={{
                      minWidth: "10 rem",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
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
                        float: "right",
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
      <CRow>
        <CCol>
          <Consent />
        </CCol>
      </CRow>
    </div>
  );
}

