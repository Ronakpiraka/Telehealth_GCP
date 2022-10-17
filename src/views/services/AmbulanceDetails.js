import React , {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.min.css';
import LoadingOverlay from 'react-loading-overlay';
import {Link} from "react-router-dom";
// import "./dashboard.scss";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
// import "./Dashboard.css";
// import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import HotelIcon from '@material-ui/icons/Hotel';
import RepeatIcon from '@material-ui/icons/Repeat';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import DepartureBoardIcon from '@material-ui/icons/DepartureBoard';
import AirlineSeatIndividualSuiteIcon from '@material-ui/icons/AirlineSeatIndividualSuite';
import Maps from './Maps'
import {
    CButton,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CCollapse,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle,
    CFade,
    CForm,
    CFormGroup,
    CFormText,
    CValidFeedback,
    CInvalidFeedback,
    CTextarea,
    CInput,
    CInputFile,
    CInputCheckbox,
    CInputRadio,
    CInputGroup,
    CInputGroupAppend,
    CInputGroupPrepend,
    CDropdown,
    CInputGroupText,
    CLabel,
    CSelect,
    CRow,
    CSwitch
  } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import TableContainer from '@material-ui/core/TableContainer';

  const useStyles = makeStyles((theme) => ({
	typography: {
		padding: theme.spacing(2),
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

export default function PatientDetails(props) {
    const useStyles = makeStyles((theme) => ({
        root: {
          flexGrow: 1,
        },
        menuButton: {
          marginRight: theme.spacing(2),
        },
        title: {
          flexGrow: 1,
        },
        paper: {
            padding: '6px 16px',
        },
        secondaryTail: {
            backgroundColor: theme.palette.secondary.main,
        },
      }));

    const [driverid, setdriverid] = useState('');
    const location = useLocation();

    const classes = useStyles();

    useEffect(() => {
		let driverid = location.search.split('=')[1];
		console.log('-----------------driverid--------------------------------------')
		console.log(driverid)
		console.log('-------------------------------------------------------')
		setdriverid(driverid)
	}, []);

      const displayTable = (id) => {
		  if(id === "U14-GXR")
		  {
			return (
                <StyledTableRow>
                    <StyledTableCell align="left">Mark Otto</StyledTableCell>
                    <StyledTableCell align="left">978-580-1342</StyledTableCell>
                </StyledTableRow>
              
			)
		  }
        else if(id === "W40-XFP"){
            return (
                <StyledTableRow>
                    <StyledTableCell align="left">Jacob Thornton</StyledTableCell>
                    <StyledTableCell align="left">781-585-8492</StyledTableCell>
                </StyledTableRow>
            )
        }
        else if(id === "U38-WKV"){
            return (
                <StyledTableRow>
                    <StyledTableCell align="left">July Dooley</StyledTableCell>
                    <StyledTableCell align="left">978-897-9797</StyledTableCell>
                </StyledTableRow>
            )
        }
        else if(id === "V71-WWF"){
            return (
                <StyledTableRow>
                    <StyledTableCell align="left">Mary Moe</StyledTableCell>
                    <StyledTableCell align="left">978-667-7711</StyledTableCell>
                </StyledTableRow>
            )
        }
        else if(id === "Y54-NLN"){
            return (
                <StyledTableRow>
                    <StyledTableCell align="left">John Doe</StyledTableCell>
                    <StyledTableCell align="left">781-236-2094</StyledTableCell>
                </StyledTableRow>
            )
        }
		else{
			return(
                <div>Details not available</div>
            )
		}}

        return (
            <React.Fragment>
			<section className="content" style={{ padding: '10px 10px 10px 10px', margin: '0px 0px 0px 0px', width: '100%', minHeight: 'calc(70vh - 65px)' }}>
					<LoadingOverlay
						active={false}
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
			
            
			<h4 style={{ fontSize: '18px', fontWeight: 'bold',padding: '15px' }}>
				Ambulance Details : 
            </h4>
            <div>
                <Maps/>
            </div>
		</section>
            
  
            <Timeline align="alternate" style={{width:"50%", float:"left"}}>
                <TimelineItem>
                    <TimelineOppositeContent>
                    <Typography variant="body2" color="textSecondary">
                        9:30 am
                    </Typography>
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                    <TimelineDot>
                        <DepartureBoardIcon />
                    </TimelineDot>
                    <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                    <Paper elevation={3} className={classes.paper}>
                        <Typography variant="h6" component="h1">
                        Departure from Hospital
                        </Typography>
                        <Typography>Call from Patient</Typography>
                    </Paper>
                    </TimelineContent>
                </TimelineItem>

                <TimelineItem>
                    <TimelineOppositeContent>
                    <Typography variant="body2" color="textSecondary">
                        10:00 am
                    </Typography>
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                    <TimelineDot color="primary">
                        <AirlineSeatIndividualSuiteIcon />
                    </TimelineDot>
                    <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                    <Paper elevation={3} className={classes.paper}>
                        <Typography variant="h6" component="h1">
                        Received Patient
                        </Typography>
                        <Typography>Boarded into Ambulance</Typography>
                    </Paper>
                    </TimelineContent>
                </TimelineItem>

                <TimelineItem>
                    <TimelineOppositeContent>
                        <Typography variant="body2" color="textSecondary">
                            10:10 am
                        </Typography>
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                    <TimelineDot color="primary" variant="outlined">
                        <DepartureBoardIcon />
                    </TimelineDot>
                    <TimelineConnector className={classes.secondaryTail} />
                    </TimelineSeparator>
                    <TimelineContent>
                    <Paper elevation={3} className={classes.paper}>
                        <Typography variant="h6" component="h1">
                        Departure
                        </Typography>
                        <Typography>Left from Patient Address</Typography>
                    </Paper>
                    </TimelineContent>
                </TimelineItem>

                <TimelineItem>
                    <TimelineOppositeContent>
                    <Typography variant="body2" color="textSecondary">
                        10:40 am
                    </Typography>
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                    <TimelineDot color="secondary">
                        <RepeatIcon />
                    </TimelineDot>
                    </TimelineSeparator>
                    <TimelineContent>
                    <Paper elevation={3} className={classes.paper}>
                        <Typography variant="h6" component="h1">
                        Arrival
                        </Typography>
                        <Typography>Arrived to the Hospital</Typography>
                    </Paper>
                    </TimelineContent>
                </TimelineItem>

            </Timeline> &nbsp;&nbsp;&nbsp;&nbsp;
            <CRow>
                <CCol>
                <CCard style={{width:"90%", marginLeft:"auto"}}>
                    <CCardHeader>
                    <center>
                    Driver Information
                    </center>
                    </CCardHeader>
                    <CCardBody>
                    <TableContainer>
                        <Table>
                        <TableHead>
                            <TableRow style={{ padding: '0px' }}>
                            <TableCell style={{ fontWeight: 'bold'}}><CIcon name="cil-user" />&nbsp;&nbsp;Drivername</TableCell>
                            <TableCell style={{ fontWeight: 'bold'}}>Mobile Number</TableCell>
                            </TableRow>
                        </TableHead>

                            <TableBody>
                                {displayTable(driverid)}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    </CCardBody>
                </CCard>
                </CCol>
            </CRow>
	</React.Fragment>
    )

}

// export default GoogleApiWrapper({
//  apiKey: ('AIzaSyCBBI-PWfzZgdt_ssWRdibMuju_RH2BD8M')
// })(PatientDetails);
