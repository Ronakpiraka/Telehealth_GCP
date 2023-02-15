import React , {useEffect} from 'react'
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
import {withStyles } from '@material-ui/core/styles';
import "./patients.css"; 

export default function Prow(props) {
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

    const { prow , data} = props;
    const [open, setopen] = React.useState(false);
    // const [Practdetails, setPractdetails] = React.useState([]);
    var url;

    const [u_provider_code, set_u_provider_code] = React.useState([]);

    var pradet = data.filter(val => {
      if (val.Provider_code === prow.Provider_code) {
        return val;
      }  
    })
    
    return (
      <React.Fragment>
       <TableRow>
          <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setopen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {/* <StyledTableCell align="left" style={{width:"5%"}}></StyledTableCell> */}
        <StyledTableCell style={{ width: '28%' }}>{prow.Provider_name}</StyledTableCell>
        <StyledTableCell style={{ width: '28%' }}>{prow.Provider_code}</StyledTableCell>
        <StyledTableCell style={{ width: '28%' }}>{prow.Provider_Address}</StyledTableCell>
        <StyledTableCell style={{ width: '16%', textAlign: 'center'}}>{prow.Provider_number}</StyledTableCell>
      </TableRow>
      <StyledTableRow>
      <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box margin={1}>
            <Table size="small" aria-label="provider">
              <TableHead style={{ fontWeight: 'bold', color:"blue", margin: "22px" }}>     Practitioner Details:  </TableHead>
                <StyledTableRow>
                  <StyledTableCell/>
                  <StyledTableCell style={{ fontWeight: 'bold',width: '28%'}}>Practitioner Name</StyledTableCell>
                  <StyledTableCell style={{ fontWeight: 'bold',width: '28%'}}>Specialisation</StyledTableCell>
                  <StyledTableCell style={{ fontWeight: 'bold',width: '28%'}}>Email ID</StyledTableCell>
                </StyledTableRow>
                  {pradet.map((item)=> 
                  <StyledTableRow key = {item.Practitioner_name} > 
                  
                  <StyledTableCell/>
                    <StyledTableCell style={{ width: '28%'}}>{item.Practitioner_name}</StyledTableCell>
                    <StyledTableCell style={{ width: '28%'}}>{item.Specialization}</StyledTableCell>
                    <StyledTableCell style={{ width: '28%'}}>{item.Practitioner_Email}</StyledTableCell>
                  </StyledTableRow>
                  )}
            </Table>
          </Box>
        </Collapse>
      </StyledTableCell>
    </StyledTableRow>
  </React.Fragment>
    );
  }
