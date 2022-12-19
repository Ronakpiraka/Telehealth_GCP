import React , {useEffect, useState} from 'react'
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import {useHistory} from "react-router-dom";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {withStyles } from '@material-ui/core/styles';
import Modal from '@mui/material/Modal';
import Avatar from '@material-ui/core/Avatar';
import { BsFillPersonFill } from "react-icons/bs";
import ShowModal from './showmodal';

export default function Row(props) {
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
    width: '70%',
    height: '70%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    };

    const { row, sendVisitsBack } = props;
    const [open, setopen] = React.useState(false);
    const [visits, setvisits] = React.useState([]);
    const [visits_new, setvisits_new] = React.useState([])
    const history = useHistory();
    const [modalopen, setmodalopen] = useState(false);
    const [showMessage, setshowMessage] = useState(true);
    const [showMessage2, setshowMessage2] = useState(false);
    const [iframeurl, setiframeurl] = useState();
    var url;
    
    const redirectToPatientDetails = (e, Patient_id) => {
      url = `/records/patientdetails?Patient_id=${Patient_id}`;
      history.push(`${url}`);
    }

    const modalhandleOpen = () => {
        setmodalopen(true);
        setshowMessage(true);
        setshowMessage2(false);
    }

    const modalhandleClose = () => {
        setmodalopen(false);
    }

  const handleChange = event => {
    setshowMessage(false);
    setshowMessage2(true);
    event.preventDefault();
  }

  const fetchvisitsdata = () => {
    console.log("check function")
    var requestOptions = {
      method: 'GET'
    };
    fetch("https://patientvisit-sh4iojyb3q-uc.a.run.app", requestOptions)
    .then((resp) => resp.json())
    .then((response) => {
    setvisits(response)
    console.log(visits)
    })
    .catch(error => console.log('error', error));
  }
  useEffect(() => { 
    fetchvisitsdata();
  },[])
  useEffect(() => {
    const visits_temp = visits.filter(function(item) {
      if (item.patientId == row.Patient_id){
        return item
      }
    })
    setvisits_new(visits_temp)
  }, [visits])
  
  const displayCheckedBox = (row) => {
      if(row.RemoteCareStatus)//change the logic here
      {
        return (
          <FormControlLabel disabled control={<Checkbox checked name="checkedEvent" style={{color:'#1890ff'}}/>}/>
        )
      }
      else{
        return(
          <FormControlLabel disabled control={<Checkbox name="checkedEvent" />}/>
        )
      }
  }   
    return (
      <React.Fragment>
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
            {showMessage && <ShowModal patientId={row.patientId}/>}
          </Typography>
          </Box>
        </Modal>
       <TableRow>
        {/* <TableCell>
        <IconButton aria-label="expand row" size="small" onClick={() => setopen(!open)}>
          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      </TableCell> */}
      <TableCell align="left" component="th" scope="row" style={{width:"25%"}}>
        <a
            onClick={(e) => { redirectToPatientDetails(e, row.Patient_id)}}
            target="_blank"
            style={{ padding: '0px 0px 0px 0px', color: "#0d6efd" }}
            onMouseOver={function (event) { let target = event.target; target.style.color = '#0d6efd'; target.style.cursor = 'pointer'; }}
            onMouseOut={function (event) { let target = event.target; target.style.color = '#0d6efd'; }}
          >
            {/* main patient data */}
            <b>{row.Full_name}</b>
        </a>
      </TableCell>
      <StyledTableCell align="left" >{row.Patient_Address}</StyledTableCell>
      <StyledTableCell align="left">{row.Patient_Age}</StyledTableCell>
      <StyledTableCell align="left" >{row.Contact_number}</StyledTableCell>
      {/* <StyledTableCell align="left" >{row.Contact_number}</StyledTableCell> */}
      {/* <StyledTableCell align="left" >{row.Contact_number}</StyledTableCell>
      <StyledTableCell align="left" >{row.Contact_number}</StyledTableCell> */}
      {/* <StyledTableCell align="left" aria-sort='desc'>{row.RemoteCareText}</StyledTableCell> */}
      <StyledTableCell align="left" aria-sort='desc'><button type="button" class="btn btn-primary btn-sm" onClick={(e) => { modalhandleOpen()}}>More Details</button></StyledTableCell>
      </TableRow>
      <StyledTableRow>
      <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box margin={1}>
            <Table size="small" aria-label="provider">
              <TableHead>
              </TableHead>
              <TableBody>
                <TableRow>
                   {/* <TableCell component="th" scope="row">{item.id}</TableCell> */}
                   <TableCell style={{ fontWeight: 'bold', width: '25%'}}>Provider Name</TableCell>
                   <TableCell style={{ fontWeight: 'bold', width: '20%'}}>Practitioner Name</TableCell>
                   <TableCell style={{ fontWeight: 'bold', width: '20%'}}>Reason of Visit</TableCell>
                   <TableCell style={{ fontWeight: 'bold', width: '15%'}}>Start Time</TableCell>
                   <TableCell style={{ fontWeight: 'bold', width: '20%'}}>End Time</TableCell>
                   </TableRow>
                {/* {console.log(data.org)} row.Patient_id*/}
                {visits_new.length > 0 && visits_new.map((item) =>
                   <StyledTableRow key={item.patientId}>
                   {/* <TableCell component="th" scope="row">{item.id}</TableCell> */}
                   <StyledTableCell style={{width:"25%"}}>{item.Provider_name}</StyledTableCell>
                   <StyledTableCell style={{width:"20%"}}>{item.Practitioner_name}</StyledTableCell>
                   <StyledTableCell style={{width:"20%"}}>{item.Reason_name}</StyledTableCell>
                   <StyledTableCell style={{width:"15%"}}>{item.Encounter_start}</StyledTableCell>
                   <StyledTableCell style={{width:"20%"}}>{item.Encounter_end}</StyledTableCell>
                   </StyledTableRow>
                 )
                 }
              </TableBody>
            </Table>
          </Box>
        </Collapse>
      </StyledTableCell>
    </StyledTableRow>
  </React.Fragment>
    );
  }