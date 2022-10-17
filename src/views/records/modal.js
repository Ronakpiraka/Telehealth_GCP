import React, {useEffect } from 'react'
import { Layout, Menu, Input  } from 'antd';
import Avatar from '@material-ui/core/Avatar';
import {Link} from "react-router-dom";
import './PatientInfo.css';
import 'antd/dist/antd.css';
import {TableOutlined,UserOutlined,AreaChartOutlined} from '@ant-design/icons';
import { Dropdown, message } from 'antd';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AirportShuttleIcon from '@material-ui/icons/AirportShuttle';
import AssessmentRoundedIcon from '@material-ui/icons/AssessmentRounded';
import VideocamIcon from '@material-ui/icons/Videocam';
import DevicesOtherIcon from '@material-ui/icons/DevicesOther';
import DashboardIcon from '@material-ui/icons/Dashboard';
import {MenuUnfoldOutlined,MenuFoldOutlined} from '@ant-design/icons';
import InputBase from '@material-ui/core/InputBase';
import { alpha} from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import jsonData from '../../t3.json';

export default function ModalInform() {
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
    
        const classes = useStyles();
        const jsondata = jsonData.entry;
        console.log(jsondata);

    return (
      <>
            <p style={{fontSize:'22px', textAlign:'center'}}><strong>Patient Monitoring Details</strong></p>

          <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow style={{ padding: '0px' }}>
                <TableCell style={{ fontWeight: 'bold'}}>Name</TableCell>
                <TableCell style={{ fontWeight: 'bold'}}>Details</TableCell>
                <TableCell style={{ fontWeight: 'bold'}}>Date</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {jsondata.map((row, index) => {
                    return(
                      <StyledTableRow>
                        {/* <TableCell align="left">{row.id}</TableCell> */}
                        <StyledTableCell align="left">Arthur650 Ortiz186</StyledTableCell>
                        <StyledTableCell align="left">{(row.resource.text.div).replace(", datetime: 2021-09-09 10:29:18.316868", "")}</StyledTableCell>
                        <StyledTableCell align="left">2021-09-09</StyledTableCell>
                      </StyledTableRow>
                    )
                  })
                 }
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

         </>
     
    )
}
