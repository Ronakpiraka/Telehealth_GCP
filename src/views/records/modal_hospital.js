import React, {useEffect, useState } from 'react'
import './PatientInfo.css';
import 'antd/dist/antd.css';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';

export default function ProviderInform() {
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
    
//     const [checked, setChecked] = useState(true);

//   const handleChange = (event) => {
//     setChecked(event.target.checked);
//   };

    return (
      <>
            <p style={{fontSize:'22px', textAlign:'center'}}><strong>Provider Details</strong></p>

          <Paper>
            <TableContainer>
            <Table>
              <TableHead>
                <TableRow style={{ padding: '0px' }}>
                {/* <TableCell align="center" style={{ fontWeight: 'bold', width: '400px' }}>Id</TableCell> */}
                <TableCell style={{ fontWeight: 'bold'}}>Code</TableCell>
                <TableCell style={{ fontWeight: 'bold'}}>Contact No</TableCell>
                <TableCell style={{ fontWeight: 'bold'}}>Address</TableCell>
                <TableCell style={{ fontWeight: 'bold'}}>Specialization</TableCell>
                <TableCell style={{ fontWeight: 'bold'}}>Specialist</TableCell>
                <TableCell style={{ fontWeight: 'bold'}}>Select Provider</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                        <StyledTableRow>
                            <StyledTableCell align="left">PCP9755</StyledTableCell>
                            <StyledTableCell align="left">978-580-1342</StyledTableCell>
                            <StyledTableCell align="left">7 BARON WAY</StyledTableCell>
                            <StyledTableCell align="left">Otolaryngologist</StyledTableCell>
                            <StyledTableCell align="left">Dr.Lorenzo669 Rempel203</StyledTableCell>
                            <StyledTableCell align="center">
                                <Checkbox value="PCP9755" />
                            </StyledTableCell>
                        </StyledTableRow>

                        <StyledTableRow>
                            <StyledTableCell align="left">PCP10332</StyledTableCell>
                            <StyledTableCell align="left">781-585-8492</StyledTableCell>
                            <StyledTableCell align="left">19 ANNASNAPPITT DR</StyledTableCell>
                            <StyledTableCell align="left">Pulmonologist</StyledTableCell>
                            <StyledTableCell align="left">Dr.Lanny564 Huels583</StyledTableCell>
                            <StyledTableCell align="center">
                                <Checkbox value="PCP10332" />
                            </StyledTableCell>
                        </StyledTableRow>
                        				
                        <StyledTableRow>
                            <StyledTableCell align="left">PCP30027</StyledTableCell>
                            <StyledTableCell align="left">978-897-9797</StyledTableCell>
                            <StyledTableCell align="left">A BALANCED WAY</StyledTableCell>
                            <StyledTableCell align="left">Respiratory Therapist</StyledTableCell>
                            <StyledTableCell align="left">Dr.Kristy290 Swift555</StyledTableCell>
                            <StyledTableCell align="center">
                                <Checkbox value="PCP30027" />
                            </StyledTableCell>
                        </StyledTableRow>

                        <StyledTableRow>
                            <StyledTableCell align="left">PCP22470</StyledTableCell>
                            <StyledTableCell align="left">978-667-7711</StyledTableCell>
                            <StyledTableCell align="left">NEIGHBORHOOD PEDIATRICS</StyledTableCell>
                            <StyledTableCell align="left">Gastroenterologist</StyledTableCell>
                            <StyledTableCell align="left">Dr.Tresa661 Wehner319</StyledTableCell>
                            <StyledTableCell align="center">
                                <Checkbox value="PCP22470" />
                            </StyledTableCell>
                        </StyledTableRow>

                        <StyledTableRow>
                            <StyledTableCell align="left">PCP26525</StyledTableCell>
                            <StyledTableCell align="left">781-236-2094</StyledTableCell>
                            <StyledTableCell align="left">84 JERUSALEM RD</StyledTableCell>
                            <StyledTableCell align="left">Infectious disease specialist</StyledTableCell>
                            <StyledTableCell align="left">Dr.Sumiko254 Bahringer146</StyledTableCell>
                            <StyledTableCell align="center">
                                <Checkbox value="PCP26525" />
                            </StyledTableCell>
                        </StyledTableRow>
                   
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

         </>
    )
}
