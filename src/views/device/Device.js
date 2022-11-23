
import React , {useEffect} from 'react';
import Paper from '@material-ui/core/Paper';
import { Layout, Menu, Input} from 'antd';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TableContainer from '@material-ui/core/TableContainer';
import { makeStyles,alpha ,withStyles} from '@material-ui/core/styles';

import ChartLineSimple from '../charts/ChartLineSimple'
// import ChartBarSimple from '../charts/ChartBarSimple'
import {
  CWidgetDropdown,
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle
} from '@coreui/react'

export default function Device() {
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
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
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.35),
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.5),
      },
      margin: '10px',
      float : 'right',
      boxShadow: '-4px 8px 20px 0px grey',
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: '98%',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '100ch',
        '&:focus': {
          width: '20ch',
        },
      },
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
      // const classes = useStyles();
      const [data, setdata]=React.useState([]);

      const fetchpatientdata = () => {
        console.log("check function")
  
        var requestOptions = {
          method: 'GET'
        };
  
        fetch("https://device-sh4iojyb3q-uc.a.run.app/", requestOptions)
        .then((resp) => resp.json())
        .then((response) => {
          setdata(response)
          console.log(data)
          
          // console.log( eval(JSON.stringify(data)));
        })
        .catch(error => console.log('error', error));
      }

      useEffect(() => {   
        fetchpatientdata();
      },[])

    const displayCheckedBox = (row) => {
      console.log("--------------row")
      console.log(row);
        if(row.RemoteCareStatus)//change the logic here
        // if(row) 
        {
          return (
            <>
            <FormControlLabel disabled control={<Checkbox checked name="checkedEvent" style={{color:'#1890ff'}}/>}/>
            </>
          )
        }
        else{
          return(
            <FormControlLabel disabled control={<Checkbox name="checkedEvent" />}/>
          )
        }
    }   

    // const displayName = (row) => {
    //   console.log("--------------row")
    //   console.log(row);
    //     if(row.RemoteCareStatus)//change the logic here
    //     // if(row) 
    //     {
    //       return (
    //         <>
    //         <TableCell>Device101</TableCell>
    //         <TableCell>Oxygen and Temperature</TableCell>
    //         <TableCell>{row.Full_name}</TableCell>
    //         <TableCell>Oxygen level goes below the threshold</TableCell>
    //         <TableCell style={{textAlign:"center"}}>{displayCheckedBox(row)}</TableCell>
    //         </>
    //       )
    //     }
    //     else{
    //       return(
    //         <></>
    //       )
    //     }
    // }   

    return (
        <Layout style={{backgroundColor:'black'}}>

            <Paper >
            {/* <div className={classes.root}> */}
            {/* <AppBar position="static">
                <Toolbar>
                    <Link to="/dashboard">
                         <ArrowBackIcon edge="start" className={classes.menuButton} color="inherit" aria-label="menu"/>
                    </Link>
                    <Typography variant="h6" className={classes.title} style={{color:"white"}}>
                        Devices
                    </Typography>
                </Toolbar>
            </AppBar> */}
            {/* </div> */}

            {/* <div class="container">
                <div class="row">
                    <div class="column2">
                        <div class="card">
                        <h3 class="counter" style={{color: '#1890ff', fontWeight: 'bold'}}>Oxygen</h3><br/>
                        <p style={{fontWeight: 'bolder'}}>Min-Oxygen:<span style={{color:"red"}}> 80</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Max-Oxygen:<span style={{color:"red"}}>106</span> </p>
                        </div>
                        
                    </div>
                    <div class="column2">
                        <div class="card">
                        <h3 class="counter" style={{color: '#1890ff', fontWeight: 'bold'}}>Temperature</h3><br/>
                        <p style={{fontWeight: 'bolder'}}>Min-Temp: <span style={{color:"red"}}>94F</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Max-Temp:<span style={{color:"red"}}>103F</span> </p>
                        </div>
                    </div>
                </div>
            </div> */}

      {/* <CRow>
      <CCol sm="6" lg="6">
        <CWidgetDropdown
          color="gradient-primary"
          header="Oxygen"
          text="Min:85  Max:106"
          footerSlot={
            <ChartLineSimple
              pointed
              className="c-chart-wrapper mt-3 mx-3"
              style={{height: '70px'}}
              dataPoints={[85, 90, 84, 80, 92, 96, 80]}
              pointHoverBackgroundColor="primary"
              label="Oxygen"
              labels="months"
            />
          }
        >
        </CWidgetDropdown>
      </CCol>

      <CCol sm="6" lg="6" style={{alignItems:'center'}}>
        <CWidgetDropdown
          color="gradient-info"
          header="Temperature"
          text="Min:100  Max: 105"
          footerSlot={
            <ChartLineSimple
              pointed
              className="mt-3 mx-3"
              style={{height: '70px'}}
              dataPoints={[80, 107, 109, 87, 110, 90, 102]}
              pointHoverBackgroundColor="info"
              options={{ elements: { line: { tension: 0.00001 }}}}
              label="Temperature"
              labels="months"
            />
          }
        >
        </CWidgetDropdown>
      </CCol>
      </CRow> */}

           
            <TableContainer style={{padding:"50px"}}>
            <Table aria-label="collapsible table">
                <TableHead>
                <TableRow style={{ padding: '0px' }}>
                {/* <TableCell align="center" style={{ fontWeight: 'bold'}}>Id</TableCell> */}
                <TableCell style={{fontWeight: 'bold'}}>Device ID</TableCell>
                <TableCell style={{fontWeight: 'bold'}}>Device Name</TableCell>
                <TableCell style={{fontWeight: 'bold'}}>Patient Name</TableCell>
                <TableCell style={{fontWeight: 'bold'}}>Device Value</TableCell>
                <TableCell style={{ fontWeight: 'bold'}}>Message</TableCell>
                <TableCell style={{ fontWeight: 'bold'}}>DateTime</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
              {data.map((row) => (
                <TableRow key={row.Patient_id}>
                  <StyledTableCell align="left">{row.s.device_id}</StyledTableCell>
                  <StyledTableCell align="left">Blood-Oxygen Monitor</StyledTableCell>
                  <StyledTableCell align="left">{row.Full_name}</StyledTableCell>
                  <StyledTableCell align="left">{row.s.device_value}</StyledTableCell>
                  <StyledTableCell align="left">{row.s.message}</StyledTableCell>
                  <StyledTableCell align="left">{row.s.send_time}</StyledTableCell>
                </TableRow>
                ))}
                </TableBody>
                </Table>
                </TableContainer>
                </Paper>
        </Layout>
    )
}
