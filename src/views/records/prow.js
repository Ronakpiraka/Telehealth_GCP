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

export default function prow(props) {

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

    const redirectToProviderDetails = (e, Provider_code) => {
      url = `/records/patientdetails?Provider_code=${Provider_code}`;
      history.push(`${url}`);
  }
  const [Practdetails, setPractdetails] = React.useState([]);
  const fetchPractdetailsdata = () => {
    console.log("check function")
  var requestOptions = {
    method: 'GET'
  };

  fetch("https://fetchproviderdata21-sh4iojyb3q-uc.a.run.app", requestOptions)
  .then((resp) => resp.json())
  .then((response) => {
    setPractdetails(response)
    console.log(Practdetails)
    
    // console.log( eval(JSON.stringify(data)));
  })
  .catch(error => console.log('error', error));
  }
  useEffect(() => { 
    // console.log("hello useeffect")
    fetchPractdetailsdata();
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

  
    const Practdetails_new = Practdetails.filter(function(item) {
      if (item.Provider_code == prow.Provider_code){
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
      
      <StyledTableCell align="left">{prow.Provider_code}</StyledTableCell>
      {/* <TableCell>{row.id}</TableCell> */}
      <TableCell align="left" component="th" scope="row" style={{width:"25%"}}>
      <BsFillPersonFill size={25}/> &nbsp;&nbsp;
        <a
            onClick={(e) => { redirectToProviderDetails(e, prow.Provider_code)}}
            target="_blank"
            style={{ padding: '0px 0px 0px 0px', fontWeight: 'bold', color: 'blue'}}
            onMouseOver={function (event) { let target = event.target; target.style.color = 'blue'; target.style.cursor = 'pointer'; }}
            onMouseOut={function (event) { let target = event.target; target.style.color = 'black'; }}
          >
            {/* main patient data */}
            {prow.Provider_name}
        </a>
      </TableCell>
      <StyledTableCell align="left">{prow.Provider_Address}</StyledTableCell>
      <StyledTableCell align="left" style={{width:'150px'}}>{prow.Provider_number}</StyledTableCell>
      {/* <StyledTableCell align="left">{displayCheckedBox(row)}</StyledTableCell>
      <StyledTableCell align="left">{displayCheckedBox(row)}</StyledTableCell> */}
    </TableRow>
    
    <StyledTableRow>
      <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box margin={1}>
            {/* <Typography variant="h6" gutterBottom component="div" style={{fontSize:"20px", color:"#1890ff"}}>
              Patient Practdetails
            </Typography> */}
            <Table size="small" aria-label="provider">
              <TableHead>
              <TableCell style={{ fontWeight: 'bold'}}>Practioner Details: </TableCell>
                   
              </TableHead>
              <TableBody>
                <TableRow key="{item.Provider_code}">
                   {/* <TableCell component="th" scope="row">{item.id}</TableCell> */}
                   <TableCell style={{ fontWeight: 'bold'}}>Name</TableCell>
                   <TableCell style={{ fontWeight: 'bold'}}>Specialisation</TableCell>
                   <TableCell style={{ fontWeight: 'bold'}}>Contact details</TableCell>
                   {/* <TableCell style={{ fontWeight: 'bold'}}>Encounter start</TableCell>
                   <TableCell style={{ fontWeight: 'bold'}}>Encounter end</TableCell>
                   <TableCell style={{ fontWeight: 'bold'}}>Status</TableCell> */}
                   </TableRow>
               {/* {console.log(data.org)} row.Provider_code*/}
                {Practdetails_new.length > 0 && Practdetails_new.map((item) => 
                  
                   <StyledTableRow key={item.Provider_code}>
                   {/* <TableCell component="th" scope="row">{item.id}</TableCell> */}
                   <StyledTableCell style={{width:"35%"}}>{item.Practitioner_name}</StyledTableCell>
                   <StyledTableCell style={{width:"25%"}}>{item.Specialization}</StyledTableCell>
                   <StyledTableCell style={{width:"20%"}}>{item.Practitioner_Email}</StyledTableCell>
                   {/* <StyledTableCell style={{width:"15%"}}>{item.Encounter_start}</StyledTableCell>
                   <StyledTableCell style={{width:"15%"}}>{item.Encounter_end}</StyledTableCell> */}
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

