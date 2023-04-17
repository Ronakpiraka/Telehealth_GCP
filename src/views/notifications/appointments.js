import React, { useEffect, useRef, useState } from "react";
import { Layout, Menu, Input } from "antd";
// import FormControl from "@mui/material/FormControl";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import "react-toastify/dist/ReactToastify.css";
import { alpha } from "@material-ui/core/styles";
import emailjs from "@emailjs/browser";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { toast } from "react-toastify";
import { useHistory, useLocation } from "react-router-dom";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import LoadingOverlay from "react-loading-overlay";
import { CBadge, CButton } from "@coreui/react";
import { Checkbox } from "@material-ui/core";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import "../records/patients.css";
import { CModal } from "@coreui/react";
import { CModalFooter } from "@coreui/react";
import { CModalHeader } from "@coreui/react";
import { CModalTitle } from "@coreui/react";
import DeviceConsent from "../notifications/DeviceConsent";
import { CModalBody } from "@coreui/react";
import CryptoJS from "crypto-js";
import {
  CCard,
  CCardBody,
  CCardGroup,
  CWidgetDropdown,
  CCol,
  CRow,
  CWidgetProgressIcon,
} from "@coreui/react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import OutlinedInput from "@mui/material/OutlinedInput";
// import ForwardIcon from '@mui/icons-material/Forward';
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
export default function Appointment() {
  const modalstyle = {
    position: "relative",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      "& > *": {
        // height: 50,
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
      width: "80%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "50%",
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
      width: "60%",
      [theme.breakpoints.up("sm")]: {
        width: "100ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));

  const [data, setdata] = React.useState([]);
  const [searchTerm, setsearchTerm] = React.useState("");
  const classes = useStyles();
  const history = useHistory();
  const [isLoading, setisLoading] = useState(true);
  const [PatientName, setPatientName] = React.useState("");
  const [personName, setPersonName] = React.useState("");
  const [modal, setModal] = useState(false);
  const [MRN, setMRN] = useState("");
  const [patientMrn, setpatientMrn] = useState("");
  const [decryptedMRN, setdecryptedMRN] = useState("");
  const [decryptedName, setdecryptedName] = useState("");
  const [decryptedEmail, setdecryptedEmail] = useState("");
  const [patientemail, setPatientEmail] = useState("");
  const [deviceId, setDeviceId] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [connectedCareValue, setConnectedCareValue] = useState("No");
  const [deviceIdValue, setDeviceIdValue] = useState("No");
  const location = useLocation();
  const [selectedDevices, setSelectedDevices] = useState();
  const [deviceIdPromptOpen, setDeviceIdPromptOpen] = useState();
  // const [connectedCareValue, setConnectedCareValue] = useState("No");
  const [orderDetails, setOrderDetails] = useState("");
  const [conditionName, setConditionName] = React.useState([]);
  const [page, setpage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [ordPlaced, setordPlaced] = React.useState(5);
  const [collapsed, setcollapsed] = React.useState(false);
  const [allPurchaseOrderDetails, setAllPurchaseOrderDetails] = useState("");
  const [posts, setPosts] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState();
  const [singlepatientid, setsinglepatientid] = useState("");

  const toggle = () => {
    setModal(!modal);
  };

  let paramString = location.search.split("?")[1];
  console.log(paramString);

  useEffect(() => {
    if (paramString != undefined) {
      try {
        const secretKey = "hellotelehealth";

        var mrn = location.search.split("mabc=")[1].split("&")[0];
        setpatientMrn(mrn);

        let patientname = location.search.split("pabc=")[1].split("&")[0];
        setPatientName(patientname);

        let patientEmail = location.search.split("exyz=")[1].split("&")[0];
        setPatientEmail(patientEmail);

        setdecryptedMRN(
          CryptoJS.AES.decrypt(patientMrn, secretKey).toString(
            CryptoJS.enc.Utf8
          )
        );
        setdecryptedName(
          CryptoJS.AES.decrypt(PatientName, secretKey).toString(
            CryptoJS.enc.Utf8
          )
        );
        setdecryptedEmail(
          CryptoJS.AES.decrypt(patientemail, secretKey).toString(
            CryptoJS.enc.Utf8
          )
        );
        localStorage.setItem("Patient_name", decryptedName);
        sessionStorage.setItem("Patient_name", decryptedName);
        localStorage.setItem("Patient_MRN", decryptedMRN);
        localStorage.setItem("Patient_email", decryptedEmail);
      } catch (err) {
        console.log(err);
      }
    }
  });

  useEffect(() => {
    // if (paramString == undefined) {
    const res = fetch("https://appointmentbook-sh4iojyb3q-uc.a.run.app", {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((response) => {
        let final_data = new Array();
        let Patient_id_list = new Array();
        let Patient_list_index = -1;
        for (var i = 0; i < response.length; i++) {
          Patient_list_index = Patient_id_list.indexOf(response[i].Patient_id);
          if (Patient_list_index == -1) {
            final_data.push(response[i]);
            Patient_id_list.push(response[i].Patient_id);
          } else {
            let lst_encounter = new Date(
              final_data[Patient_list_index].Encounter_start
            );
            let new_encounter = new Date(response[i].Encounter_start);
            if (new_encounter > lst_encounter) {
              final_data[Patient_list_index] = response[i];
            }
          }
        }
        setdata(final_data);
        console.log(data);
        setisLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
    // }
  }, []);
  console.log(data);

  const uniquePatientName = Array.from(
    new Set(data.map((item) => JSON.stringify(item)))
  ).map((item) => JSON.parse(item));

  uniquePatientName.sort((a, b) => {
    if (a.Patient_name < b.Patient_name) {
      return -1;
    } else if (a.Patient_name > b.Patient_name) {
      return 1;
    } else {
      return 0;
    }
  });

  // const uniquePractitionerName = Array.from(new Set(final_data.map(item => JSON.stringify(item.Practitioner_name)))).map(item => JSON.parse(item));
  // const handleChangePage = (event, newPage) => {
  //   setpage(newPage);
  // };

  // const handleChangeRowsPerPage = event => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setpage(0);
  // };

  // const senddata = (name, doctor, guardian_email) => {
  //   var url = `/notifications?Patient_name=${name}&doctor=${doctor}`;
  //   history.push(`${url}`);
  // }

  // const handleGoBack = () => {
  //   var url = `/notifications/Consent`;
  //   history.push(`${url}`); //url from OPE team
  // };

  // const handleGoAhead = () => {
  //   var url = `/Practitionerbookings`;
  //   history.push(`${url}`);
  // };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(value);
    // localStorage.setItem("Patient_name",value)
    console.log("selected patient", value);
    let selectedPatientData = data.filter((temp) => temp.Patient_name == value);
    // console.log(selectedPatientData.);
    setMRN(selectedPatientData[0].Medical_Record_Number);
    // setpatientemail(selectedPatientData[0].)
    localStorage.setItem("Patient_name", selectedPatientData[0].Patient_name);
    localStorage.setItem(
      "Patient_MRN",
      selectedPatientData[0].Medical_Record_Number
    );
    localStorage.setItem("Patient_email", "telehealthgcp@gmail.com");
  };

  // const slots = [{ slot: '9 AM - 10 AM' }, { slot: '10 AM - 11 AM' }, { slot: '11 AM - 12 PM' }, { slot: '12 PM - 1 PM' }, { slot: '1 PM - 2 PM' }, { slot: '2 PM - 3 PM' }, { slot: '3 PM - 4 PM' }, { slot: '4 PM - 5 PM' }];
 

  const device_details = [
    { code: "528388", Display: "Pulse Oximeter" },
    { code: "528391", Display: "Blood Pressure Cuff" },
    { code: "528404", Display: "Body Composition Analyzer" },
    { code: "528425", Display: "Cardiovascular Device" },
    { code: "528402", Display: "Coagulation meter" },
    { code: "528409", Display: "Continuous Glucose Monitor" },
    { code: "528390", Display: "Electro cardiograph" },
    { code: "528457", Display: "Generic 20601 Device" },
    { code: "528401", Display: "Glucose Monitor" },
    { code: "528455", Display: "Independent Activity/Living Hub" },
    { code: "528403", Display: "Insulin Pump" },
    { code: "528405", Display: "Peak Flow meter" },
    { code: "528397", Display: "Respiration rate" },
    { code: "528408", Display: "Sleep Apnea Breathing Equipment" },
    { code: "528426", Display: "Strength Equipment" },
    { code: "528392", Display: "Thermometer" },
    { code: "528399", Display: "Weight Scale" },
  ];

  const handledeviceclicks = (isChecked, deviceName, deviceCode) => {
    if (isChecked) {
      setSelectedDevices([...selectedDevices, deviceName]);
    } else { 
      setSelectedDevices(selectedDevices.filter((name) => name !== deviceName));
    }
  };

  useEffect(() => {
    if (connectedCareValue === 'No') {
      setSelectedDevices([]);
      localStorage.removeItem('devices');
    }
  }, [connectedCareValue]);
  
  useEffect(() => {
    const storedDevices = localStorage.getItem("devices");
    if (storedDevices) {
      setSelectedDevices(JSON.parse(storedDevices));
    }
  }, []);

  useEffect(() => {
    
    localStorage.setItem("devices",JSON.stringify(selectedDevices));
    console.log(localStorage.getItem('devices'));
    console.log(typeof(localStorage.getItem('devices')));
  }, [selectedDevices]);

  const assignNewDeviceIdAndShare = () => {
    const newDeviceId = Math.floor(Math.random() * 10000000000000000); // generate a random 6-digit number for the new device ID
    const message = `your new device ID is ${newDeviceId}. We will send this ID to you via email shortly.`;
    const value = localStorage.setItem("deviceid", newDeviceId);
    // const message = `Your new device ID is newDeviceId. We will send this ID to you via email shortly.`;
    return message;
  };

  const condition_name = [
    { condition: "Prediabetes", code: "15777000" },
    { condition: "Diabetes", code: "44054006", device_code: "528388" },
    { condition: "Viral sinusitis (disorder)", code: "444814009" },
    { condition: "Acute viral pharyngitis (disorder)", code: "195662009" },
    { condition: "Acute bronchitis (disorder)", code: "10509002" },
    { condition: "Anemia (disorder)", code: "271737000" },
    { condition: "Body mass index 30+ - obesity (finding)", code: "162864005" },
    { condition: "Hypertension", code: "59621000" },
    { condition: "Chronic sinusitis (disorder)", code: "40055000" },
    { condition: "Miscarriage in first trimester", code: "19169002" },
    { condition: "Normal pregnancy", code: "72892002" },
    { condition: "Streptococcal sore throat (disorder)", code: "43878008" },
    { condition: "Otitis media", code: "65363002" },
    { condition: "Hyperlipidemia", code: "55822004" },
    { condition: "Sprain of ankle", code: "44465007" },
  ];

  const handleCloseModal = () => {
    if (
      connectedCareValue === "Yes" &&
      deviceIdValue === "Yes" &&
      deviceId.length !== 14
    ) {
      alert("please enter a valid device id");
      setDeviceId("");
    } else {
      setShowModal(!showModal);
    }
  };

  const handleYesChange = () => {
    setDeviceIdValue("Yes");
    setDeviceIdPromptOpen(true);
    localStorage.setItem("deviceid", "No ID provided");
  };

  const handleNoChange = () => {
    setDeviceIdValue("No");
    setDeviceIdPromptOpen(false);
    assignNewDeviceIdAndShare();
  };

  const handleDeviceIdInputChange = (e) => {
    setDeviceId(e.target.value);
    if (e.target.value === "") {
      localStorage.setItem("deviceid", "Please enter a Valid ID");
    } else {
      localStorage.setItem("deviceid", e.target.value);
    }
  };

  // const handledeviceclicks = (e, Display, code) => {
  //   setDeviceId(code);
  // };
  const redirecttoPractitionerbooking = (e, condition, code) => {
    localStorage.setItem("condition_name", condition);
    localStorage.setItem("condition_code", code);

    if (personName !== "" || decryptedName !== "") {
      if (
        connectedCareValue === "Yes" 
        // && deviceIdValue === "Yes" &&
        // deviceId.length !== 14
      ) {
        var url = `/CriticalPractitionerbookings?condition=${condition}`;
        history.push(`${url}`);
        // alert("please enter a valid device id");
        // setDeviceId("");
      } else {
        var url = `/Practitionerbookings?condition=${condition}`;
        history.push(`${url}`);
      }

      // handleCloseModal();
      // var url = `/Practitionerbookings?condition=${condition}`;
      // history.push(`${url}`);
    } else {
      setModal(!modal);
      console.log(modal);
    }
  };

  const handleConnectedCareChange = (event) => {
    setConnectedCareValue(event.target.value);
    localStorage.setItem("connectedCareValue", event.target.value);
    if (personName !== "" || decryptedName !== "") {
      // Allow user to choose for connected care
    } else {
      
      alert("Please select a patient first.");
      setConnectedCareValue("");
    }
  };

  return (
    <div>
      <CModal show={modal} onClose={toggle}>
        <CModalHeader closeButton>
          Please select a Patient and connected care
        </CModalHeader>
        <CModalBody>
          Choose the Patient and choose their connected care status before
          selecting the condition...
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={toggle}>
            Ok
          </CButton>
        </CModalFooter>
      </CModal>
      <h1 className="title">
        <strong>Book Appointment</strong>
      </h1>
      <br />

      <CRow>
        {decryptedName && (
          <>
            <CCol sm="4" md="6" lg="4" sx={{ minWidth: 250 }}>
              <div className="navbar justify-content-between">
                <p className="navbar-brand">
                  <b>Patient Name: </b>
                </p>
              </div>
            </CCol>

            <CCol sm="8" md="6" lg="8">
              <div className="navbar justify-content-between">
                <p className="navbar-brand">
                  {/* <FormControl> */}
                  {/* <InputLabel id="demo-simple-select-label"> */}
                  <b>{decryptedName}</b>
                  {/* </InputLabel> */}
                  {/* </FormControl> */}
                </p>
              </div>
            </CCol>
          </>
        )}
        {!decryptedName && (
          <>
            <CCol sm="4" md="6" lg="4" sx={{ minWidth: 250 }}>
              {/* <CCol> */}
              <div className="navbar justify-content-between">
                <p className="navbar-brand">
                  <b>Select Patient Name: </b>
                </p>
              </div>
            </CCol>

            <CCol sm="8" md="6" lg="6">
              <FormControl sx={{ minWidth: 400 }}>
                <InputLabel labelid="demo-simple-select-label">
                  Patient Name
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Patient Name"
                  onChange={handleChange}
                >
                  {uniquePatientName.map((row, index) => {
                    return (
                      <MenuItem value={row.Patient_name}>
                        {row.Patient_name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </CCol>
          </>
        )}
        <CCol sm="4" md="6" lg="4" sx={{ minWidth: 250 }}>
          <span className="navbar justify-content-between">
            <p className="navbar-brand">
              <b>Medical Record Number: </b>
            </p>
          </span>
        </CCol>
        {!decryptedMRN && (
          <CCol sm="8" md="6" lg="6">
            <span className="navbar justify-content-between">
              <p className="navbar-brand">{MRN && <b>{MRN}</b>}</p>
            </span>
          </CCol>
        )}

        {decryptedMRN && (
          <CCol sm="4" md="6" lg="6">
            <span className="navbar justify-content-between">
              <p className="navbar-brand">{decryptedMRN}</p>
            </span>
          </CCol>
        )}
      </CRow>

      <CRow>
        <CCol sm="4" md="6" lg="4" sx={{ minWidth: 250 }}>
          <span className="navbar justify-content-between">
            <p className="navbar-brand">
              <b>Does the patient wants to opt for Connected/ Critical Care?</b>
            </p>
          </span>
        </CCol>
      </CRow>

      <FormControl>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
          value={connectedCareValue}
          onChange={handleConnectedCareChange}
        >
          <CRow>
            <CCol></CCol>
            <CRow>
              <CCol sm="4" md="6" lg="4">
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              </CCol>

              <CCol sm="4" md="6" lg="4">
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </CCol>
            </CRow>
          </CRow>
        </RadioGroup>
        {connectedCareValue === "Yes" && (
          <div>
            <span className="navbar justify-content-between">
              <p className="navbar-brand">
                <b>Choose the device you want: </b>
              </p>
            </span>
            <CRow>
              {device_details.map((row, index) => {
                return (
                  <CCol sm="6" md="4" lg="2" key={index}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedDevices.includes(row.Display)}
                          onChange={(e) => {
                            handledeviceclicks(
                              e.target.checked,
                              row.Display,
                              row.code
                            );
                          }}
                          name={row.Display}
                        />
                      }
                      label={row.Display}
                      // disabled={row.code !== "528388"}
                    />
                  </CCol>
                );
              })}
            </CRow>
          </div>
          
        )}
        {/* </FormControl> */}

        {/* {connectedCareValue === "Yes" && (
          <div>
            <span className="navbar justify-content-between">
              <p className="navbar-brand">
                <b>Do you have a Medical device?</b>
              </p>
            </span> 
             <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="device-id-group"
              value={deviceIdValue}
              onChange={(e) =>
                e.target.value === "Yes" ? handleYesChange() : handleNoChange()
              }
            >
              <CRow>
                <CCol></CCol>
                <CRow>
                  <CCol sm="4" md="6" lg="4">
                    <FormControlLabel
                      value="Yes"
                      control={<Radio />}
                      label="Yes"
                    />
                  </CCol>
                  </CRow>
                <CCol></CCol>
                <CRow> 
                  <CCol sm="4" md="6" lg="4">
                    <FormControlLabel
                      value="No"
                      control={<Radio />}
                      label="No"
                    />
                  </CCol>
                </CRow>
              </CRow>
            </RadioGroup>
            {deviceIdPromptOpen && (
              <CRow>
                <CCol></CCol>
                <CRow>
                  <CCol style={{ color: "red" }}>
                    Please enter your device ID :{" "}
                    <input
                      type="text"
                      className="input-box"
                      onChange={handleDeviceIdInputChange}
                      value={deviceId}
                      style={{ width: "400px" }}
                    />
                  </CCol>
                </CRow>
              </CRow>
            )}
            {!deviceIdPromptOpen && (
              <CRow>
                <CRow>
                  <CCol></CCol> 
                <CCol>
                  <span className="navbar justify-content-between">
                    <p className="navbar-brand">
                       <b>Do you have a Medical device?</b>
                      We are assigning you a new id and{" "}
                      {assignNewDeviceIdAndShare()}
                    </p>
                  </span> 
                   <h5 style={{ fontFamily: "sans-serif", color: "red" }}>
                      We are assigning you a new id and{" "}
                      {assignNewDeviceIdAndShare()}
                    </h5> 
                </CCol>
              </CRow>
              // </CRow>
            )}
          </div> 
        )} */}
      </FormControl>
      <CRow>
        <CCol>
          <span className="navbar justify-content-between">
            <div
              sm="4"
              md="4"
              lg="3"
              className="navbar-brand"
              sx={{ minWidth: 230 }}
            >
              <b>Select your Condition:</b>
            </div>

            <div sm="1" md="1" lg="1" className={classes.search}>
              <div sm="7" md="7" lg="8" className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search by Condition Name..."
                classes={{ root: classes.inputRoot, input: classes.inputInput }}
                onChange={(e) => {
                  setsearchTerm(e.target.value);
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
          </span>
        </CCol>
      </CRow>

      <LoadingOverlay
        active={isLoading}
        spinner
        text="Loading the content..."
        styles={{
          height: "50%",
          spinner: (base) => ({
            ...base,
            width: "50px",
            "& svg circle": {
              stroke: "rgba(255, 0, 0, 0.5)",
            },
          }),
        }}
      >
        <CRow>
          {condition_name
            .filter((val) => {
              if (searchTerm === "") {
                return val;
              } else if (
                val.condition.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return val;
              }
            })
            .map((row, index) => {
              return (
                <CCol sm="12" md="8" lg="4">
                  <CWidgetDropdown
                    type="button"
                    color="gradient-info"
                    text={row.condition}
                    onClick={(e) => {
                      redirecttoPractitionerbooking(e, row.condition, row.code);
                    }}
                    style={{
                      minHeight: "80px",
                      fontSize: "16px",
                      cursor: "pointer",
                    }}
                  >
                    {" "}
                    <ArrowForwardIosIcon />
                  </CWidgetDropdown>
                </CCol>
              );
            })}
        </CRow>
      </LoadingOverlay>
    </div>
  );
}
