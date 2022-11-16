import React , {useEffect} from 'react'
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
import Avatar from '@material-ui/core/Avatar';
import { BsFillPersonFill } from "react-icons/bs";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import { useState } from 'react';

export default function Row(props) {

  // const [inputValue, setInputValue] = useState('');
  // const handleInput = e => {
  //   const formattedPhoneNumber = formattedPhoneNumber(e.target.value);
  //   setInputValue(formattedPhoneNumber);
  // };
  // return <input onChange = {e => handleInput(e)} value = {inputValue} />;
  
  // function formattedPhoneNumber(value){
  //   if (!value) return value;
  //   const phoneNumber = value.replace(/[^\d]/g,'');
  //   const phoneNumberLength = phoneNumber.length;
  //   if (phoneNumberLength < 4) return phoneNumber;
  //   if (phoneNumberLength < 7) {
  //     return '${phoneNumber.slice(0,3)}-${phoneNumber.slice(3)}';
  //   }
  //   return '${phoneNumber.slice(0,3)}-${phoneNumber.slice(3,6)}-${phoneNumber.slice(6,10)}';  
  // }

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

    const { row } = props;
    // console.log(row);
    const [open, setopen] = React.useState(false);
    const history = useHistory();

    var url;

    const redirectToPatientDetails = (e, Patient_id) => {
      url = `/records/patientdetails?Patient_id=${Patient_id}`;
      history.push(`${url}`);
  }
  const [visits, setvisits] = React.useState([]);
  const fetchvisitsdata = () => {
    console.log("check function")
  var requestOptions = {
    method: 'GET'
  };

  fetch("https://us-central1-telehealth-365911.cloudfunctions.net/fetchPatientVisits", requestOptions)
  .then((resp) => resp.json())
  .then((response) => {
    setvisits(response)
    console.log(visits)
    
    // console.log( eval(JSON.stringify(data)));
  })
  .catch(error => console.log('error', error));
  }
  useEffect(() => { 
    // console.log("hello useeffect")
    fetchvisitsdata();
  })

  
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

  const ShowStatus = (status) => {
      if(status == "finished")
      {
        return (
          <CheckCircleIcon style={{color:'green'}}/>
        )
      }
      else{
        return(
          <PendingIcon style={{color:'yellow'}}/>
        )
      }
  }   

  
    const visits_new = visits.filter(function(item) {
      if (item.patientId == row.Patient_id){
        return item
      }
    })

    return (
      <React.Fragment>

    
      {/* <Row row={data}/> */}
       <TableRow>
        <TableCell>
        <IconButton aria-label="expand row" size="small" onClick={() => setopen(!open)}>
          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      </TableCell> 
      
      {/* <TableCell>{row.id}</TableCell> */}
      <TableCell align="left" component="th" scope="row" style={{width:"25%"}}>
      <BsFillPersonFill size={25}/> &nbsp;&nbsp;
        <a
            onClick={(e) => { redirectToPatientDetails(e, row.Patient_id)}}
            target="_blank"
            style={{ padding: '0px 0px 0px 0px' }}
            onMouseOver={function (event) { let target = event.target; target.style.color = 'blue'; target.style.cursor = 'pointer'; }}
            onMouseOut={function (event) { let target = event.target; target.style.color = 'black'; }}
          >
            {/* main patient data */}
            {row.Full_name}
        </a>
      </TableCell>
      <StyledTableCell align="left" >{row.Patient_Address}</StyledTableCell>
      <StyledTableCell align="left">{row.Patient_Age}</StyledTableCell>
      <StyledTableCell align="left" style={{width:'150px'}}>{row.Contact_number}</StyledTableCell>
      <StyledTableCell align="left">{displayCheckedBox(row)}</StyledTableCell>
      <StyledTableCell align="left">{displayCheckedBox(row)}</StyledTableCell>
    </TableRow>
    
    <StyledTableRow>
      <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box margin={1}>
            {/* <Typography variant="h6" gutterBottom component="div" style={{fontSize:"20px", color:"#1890ff"}}>
              Patient Visits
            </Typography> */}
            <Table size="small" aria-label="provider">
              <TableHead>
              </TableHead>
              <TableBody>
                <TableRow key="{item.patientId}">
                   {/* <TableCell component="th" scope="row">{item.id}</TableCell> */}
                   <TableCell style={{ fontWeight: 'bold'}}>Provider name</TableCell>
                   <TableCell style={{ fontWeight: 'bold'}}>Practitioner name</TableCell>
                   <TableCell style={{ fontWeight: 'bold'}}>Condition name</TableCell>
                   <TableCell style={{ fontWeight: 'bold'}}>Encounter start</TableCell>
                   <TableCell style={{ fontWeight: 'bold'}}>Encounter end</TableCell>
                   <TableCell style={{ fontWeight: 'bold'}}>Status</TableCell>
                   </TableRow>
               {/* {console.log(data.org)} row.Patient_id*/}
                {visits_new.length > 0 && visits_new.map((item) => 
                  
                   <StyledTableRow key={item.patientId}>
                   {/* <TableCell component="th" scope="row">{item.id}</TableCell> */}
                   <StyledTableCell style={{width:"25%"}}>{item.Provider_name}</StyledTableCell>
                   <StyledTableCell style={{width:"25%"}}>{item.Practitioner_name}</StyledTableCell>
                   <StyledTableCell style={{width:"20%"}}>{item.Reason_name}</StyledTableCell>
                   <StyledTableCell style={{width:"15%"}}>{item.Encounter_start}</StyledTableCell>
                   <StyledTableCell style={{width:"15%"}}>{item.Encounter_end}</StyledTableCell>
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

