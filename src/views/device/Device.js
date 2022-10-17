
import React from 'react'
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
import {Link} from "react-router-dom";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CIcon from '@coreui/icons-react'
import ChartLineSimple from '../charts/ChartLineSimple'
import ChartBarSimple from '../charts/ChartBarSimple'
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
          flexGrow: 1,
        },
        menuButton: {
          marginRight: theme.spacing(2),
        },
        title: {
          flexGrow: 1,
        },
      }));
      const classes = useStyles();
      

    function createData(device, name) {
        
        return { device, name, };
      }

    const rows = [
        createData('Oxygen and Temperature',"Arthur650_Ortiz186")
      ]

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

      <CRow>
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
      </CRow>

           
            <TableContainer style={{padding:"50px"}}>
            <Table aria-label="collapsible table">
                <TableHead>
                <TableRow style={{ padding: '0px' }}>
                {/* <TableCell align="center" style={{ fontWeight: 'bold'}}>Id</TableCell> */}
                <TableCell style={{fontWeight: 'bold'}}>Device</TableCell>
                <TableCell style={{fontWeight: 'bold'}}>Patient Name</TableCell>
                <TableCell style={{ fontWeight: 'bold'}}>Remote Care</TableCell>
                <TableCell style={{ fontWeight: 'bold'}}>Consent Form</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                <TableCell>{row.device}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell><FormControlLabel disabled control={<Checkbox checked name="checkedEvent" style={{color:'#1890ff'}}/>}/></TableCell>
                <TableCell><FormControlLabel disabled control={<Checkbox checked name="checkedEvent" style={{color:'#1890ff'}}/>}/></TableCell>
                </TableRow>
                ))}
                </TableBody>
                </Table>
                </TableContainer>
                </Paper>
        </Layout>
    )
}
