import React from 'react'
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

    const { row } = props;
    console.log(row);
    const [open, setopen] = React.useState(false);
    const history = useHistory();

    var url;

    const redirectToPatientDetails = (e, id) => {
      url = `/records/patientdetails?id=${id}`;
      history.push(`${url}`);
  }

  const displayCheckedBox = (row) => {
    console.log("--------------row")
    console.log(row);
      if(row === "d4a30d91-8283-eddc-799c-d3131f7cf2d7")
      // if(row) 
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
            onClick={(e) => { redirectToPatientDetails(e, row.id)}}
            target="_blank"
            style={{ padding: '0px 0px 0px 0px' }}
            onMouseOver={function (event) { let target = event.target; target.style.color = 'blue'; target.style.cursor = 'pointer'; }}
            onMouseOut={function (event) { let target = event.target; target.style.color = 'black'; }}
          >
            {row.name}
        </a>
      </TableCell>
      <StyledTableCell align="left" >{row.address},{row.state},{row.postalCode},{row.country}</StyledTableCell>
      <StyledTableCell align="left">{row.age}</StyledTableCell>
      <StyledTableCell align="left" style={{width:'150px'}}>{row.phone}</StyledTableCell>
      <StyledTableCell align="left">{displayCheckedBox(row.id)}</StyledTableCell>
      <StyledTableCell align="left">{displayCheckedBox(row.id)}</StyledTableCell>
    </TableRow>
    
    <StyledTableRow>
      <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box margin={1}>
            <Typography variant="h6" gutterBottom component="div" style={{fontSize:"20px", color:"#1890ff"}}>
              Patient Visits
            </Typography>
            <Table size="small" aria-label="provider">
              <TableHead>
                <TableRow >
                  {/* <TableCell style={{ fontWeight: 'bold'}}>Provider Id</TableCell> */}
                  <TableCell style={{ fontWeight: 'bold'}}>Name</TableCell>
                  <TableCell style={{ fontWeight: 'bold'}}>Practitioner</TableCell>
                  <TableCell style={{ fontWeight: 'bold'}}>Reason</TableCell>
                  <TableCell style={{ fontWeight: 'bold'}}>Start Date</TableCell>
                  <TableCell style={{ fontWeight: 'bold'}}>End Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
               {/* {console.log(data.org)} */}
                {row.org.length > 0 && row.org.map((item) => {
                return(
                  
                  <StyledTableRow key={item.id}>
                    {/* <TableCell component="th" scope="row">{item.id}</TableCell> */}
                    <StyledTableCell style={{width:"25%"}}> {item.provider_name}</StyledTableCell>
                    <StyledTableCell>{item.doctor}</StyledTableCell>
                    <StyledTableCell>{item.disease}</StyledTableCell>
                    <StyledTableCell style={{width:"15%"}}>{item.period.start}</StyledTableCell>
                    <StyledTableCell style={{width:"15%"}}>{item.period.end}</StyledTableCell>
                  </StyledTableRow>
                )
                 })}   
              </TableBody>
            </Table>
          </Box>
        </Collapse>
      </StyledTableCell>
    </StyledTableRow>
  </React.Fragment>
    );
  }

