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

      const [data, setdata]=React.useState([]);
    
      const fetchproviderdata = () => {
        var requestOptions = {
          method: 'GET'
        };
        fetch("https://providerdataupdated-sh4iojyb3q-uc.a.run.app", requestOptions)
        .then((resp) => resp.json())
        .then((response) => {
          setdata(response)
          console.log(data)
        })
        .catch(error => console.log('error', error));
      }
      useEffect(() => { 
        fetchproviderdata();
      },[])

      console.log(data)
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
                <TableCell style={{ fontWeight: 'bold'}}>Provider Name</TableCell>
                <TableCell style={{ fontWeight: 'bold'}}>Contact Number</TableCell>
                <TableCell style={{ fontWeight: 'bold'}}>Address</TableCell>
                {/* <TableCell style={{ fontWeight: 'bold'}}>Specialization</TableCell> */}
                <TableCell style={{ fontWeight: 'bold'}}>Specialist</TableCell>
                <TableCell style={{ fontWeight: 'bold'}}>Select Provider</TableCell>
                </TableRow>
              </TableHead>
        
              <TableBody>
                {data.slice(0, 3).map((row, index)=>{
                  return(
                  <StyledTableRow key={index}>
                    <StyledTableCell align="left">{row.Provider_name}</StyledTableCell>
                    <StyledTableCell align="left">{row.Provider_number}</StyledTableCell>
                    <StyledTableCell align="left">{row.Provider_Address}</StyledTableCell>
                    {/* <StyledTableCell align="left">{row.Specialization}</StyledTableCell> */}
                    <StyledTableCell align="left">{row.Practitioner_name}</StyledTableCell>
                    <StyledTableCell align="center">
                    <Checkbox value={row.Provider_code} />
                    </StyledTableCell>
                  </StyledTableRow>
               
                  )
                })}
                  
                        

                        {/* <StyledTableRow>
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
                        </StyledTableRow> */}
                   
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

         </>
    )
}
