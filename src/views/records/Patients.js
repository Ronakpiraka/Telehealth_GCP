import React, { useEffect, useState } from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableContainer from '@material-ui/core/TableContainer';
import { TableOutlined, UserOutlined, AreaChartOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import Input from '@material-ui/core/Input';
import { Link } from "react-router-dom";
import {useHistory} from "react-router-dom";
import { Dropdown, message } from 'antd';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AssessmentRoundedIcon from '@material-ui/icons/AssessmentRounded';
import AirportShuttleIcon from '@material-ui/icons/AirportShuttle';
import VideocamIcon from '@material-ui/icons/Videocam';
import DevicesOtherIcon from '@material-ui/icons/DevicesOther';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Row from './Row';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import InputBase from '@material-ui/core/InputBase';
import { alpha } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Modal from '@mui/material/Modal';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import ShowModal from './showmodal';
import {
  CBadge
} from '@coreui/react';

export default function PatientInform() {
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
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    };

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
      float: 'right',
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
  const [data, setdata] = React.useState([]);
  const [collapsed, setcollapsed] = React.useState(false);
  const [searchTerm, setsearchTerm] = React.useState('');
  const [page, setpage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [ordPlaced, setordPlaced] = React.useState(5);
  const classes = useStyles();
  const [visits, setvisits] = React.useState([]);
  const [modalopen, setmodalopen] = useState(false);
  const [showMessage, setshowMessage] = useState(true);
  const [iframeurl, setiframeurl] = useState();
  const { Search } = Input;
  var url;
  const history = useHistory();

  const sendVisitsBack = (visitsRet) => {
    setvisits(visitsRet);
  }

  const modalhandleOpen = (event) => {
    setmodalopen(true);
    setshowMessage(true);
    const patientId = event.target.dataset.patientId;
    console.log(patientId);
    setiframeurl(patientId);
  }

  const modalhandleClose = () => {
    setmodalopen(false);
  }

  const handleChange = event => {
    setshowMessage(false);
    event.preventDefault();
  }

  const sortedData = data.sort((a, b) => {
    if (a.RemoteCareText.toLowerCase() > b.RemoteCareText.toLowerCase()) {
      return -1;
    }
    if (a.RemoteCareText.toLowerCase() < b.RemoteCareText.toLowerCase()) {
      return 1;
    }
    return 0;
  });

  const fetchpatientdata = () => {
    console.log("check function")
    var requestOptions = {
      method: 'GET'
    };
    fetch("https://patientdata-sh4iojyb3q-uc.a.run.app", requestOptions)
      .then((resp) => resp.json())
      .then((response) => {
        setdata(response)
        // setsorteddata(data.sort((a, b) => (a.RemoteCareText.toLowerCase() > b.RemoteCareText.toLowerCase() ? -1 : 1)));
        // console.log(sorteddata)
        //sorteddata.reverse();
        // console.log( eval(JSON.stringify(data)));
      })
      .catch(error => console.log('error', error));

      // sortedData();
  }

  const RemoteStatus=(status)=>{
    if(status === "Vitals Tracking")
    {
      return(
        <CBadge color="info" className="mfs-auto" fontSize='22px' align='center' >{status}</CBadge>
      )
    }
    else if(status === "Not Tracking")
    {
      return(
        <CBadge color="warning" className="mfs-auto" fontSize='22px' align='center'>{status}</CBadge>
      )
    }
    else{
      return(
        <CBadge color="danger" className="mfs-auto" fontSize='22px' align='center'>{status}</CBadge>
      )
    }
  }
    

  useEffect(() => {
    fetchpatientdata();
  },[])

  console.log(data)

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item icon={<UserOutlined />}>
        <Link to="/">Logout</Link>
      </Menu.Item>
    </Menu>
  );

    function handleMenuClick(e) {
      message.info('Logout Successful');
    }

    const handleChangePage = (event, newPage) => {
      setpage(newPage);
    };

    const handleChangeRowsPerPage = event => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setpage(0);
    };

    function toggle() {
      setcollapsed(!collapsed)
    };

  const redirectToPatientDetails = (e, Patient_id) => {
    url = `/records/patientdetails?Patient_id=${Patient_id}`;
    history.push(`${url}`);
  }

  return (
    <>
      <h2 style={{ textAlign:'center', color:'#4f5d73' }}><strong>Patient Details</strong></h2>
      <Modal
          open={modalopen}
          onClose={modalhandleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          onClick={handleChange}
        >
          <Box sx={modalstyle}>
          <Typography id="modal-modal-description" >
            {showMessage && <ShowModal patientId={iframeurl}/>}
          </Typography>
          </Box>
        </Modal>
      
      <Paper style={{ width: '100%', overflow: 'hidden' }}>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search by Name..."
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            onChange={(e) => { setsearchTerm(e.target.value) }}
            inputProps={{ 'aria-label': 'search' }}
          />
        </div>
        <TableContainer style={{ maxHeight: 300 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <StyledTableRow style={{ padding: '0px' }}>
                {/* <TableCell /> */}
                {/* <TableCell align="center" style={{ fontWeight: 'bold'}}>Id</TableCell> */}
                <StyledTableCell style={{ fontWeight: 'bold', width: '26%' }}>Name</StyledTableCell>
                <StyledTableCell style={{ fontWeight: 'bold', width: '26%' }}>Address</StyledTableCell>
                <StyledTableCell style={{ fontWeight: 'bold', width: '4%' }}>Age</StyledTableCell>
                <StyledTableCell style={{ fontWeight: 'bold', width: '14%' }}>Contact No</StyledTableCell>
                <StyledTableCell style={{ fontWeight: 'bold', width: '15%' }}>Remote Care</StyledTableCell>
                <StyledTableCell style={{ fontWeight: 'bold', width: '15%' }}>Additional Info</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              <>
                {sortedData.filter(val => {
                  if (searchTerm === "") {
                    return val;
                  }
                  else if ((val.Full_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
                    (val.Patient_Address.toLowerCase().includes(searchTerm.toLowerCase())) ||
                    (val.Patient_Age.toString().toLowerCase().includes(searchTerm.toLowerCase())) ||
                    (val.Contact_number.toLowerCase().includes(searchTerm.toLowerCase())) ||
                    (val.RemoteCareText.toLowerCase().includes(searchTerm.toLowerCase())) ||
                    (val.ConsentFormText.toLowerCase().includes(searchTerm.toLowerCase()))
                  ) {
                    return val
                  }
                 }).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                    <StyledTableRow key={row.Patient_id}>
                      {/* <StyledTableCell>
                      <IconButton aria-label="expand row" size="small" onClick={() => setopen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                      </IconButton>
                    </StyledTableCell> */}
                    <StyledTableCell align="left" component="th" scope="row" style={{width:"25%"}} >
                      {/* <a
                          onClick={(e) => { redirectToPatientDetails(e, row.Patient_id)}}
                          target="_blank"
                          style={{ padding: '0px 0px 0px 0px', color: "#0d6efd" }}
                          onMouseOver={function (event) { let target = event.target; target.style.color = '#0d6efd'; target.style.cursor = 'pointer'; }}
                          onMouseOut={function (event) { let target = event.target; target.style.color = '#0d6efd'; }}
                        >
                          <b>{row.Full_name}</b>
                      </a> */}
                      <a data-patient-id={row.Patient_id} onClick={modalhandleOpen}>{row.Full_name}</a>
                    </StyledTableCell>
                    <StyledTableCell align="left" >{row.Patient_Address}</StyledTableCell>
                    <StyledTableCell align="left">{row.Patient_Age}</StyledTableCell>
                    <StyledTableCell align="left" >{row.Contact_number}</StyledTableCell>
                    <StyledTableCell align="left" aria-sort='asc'>{RemoteStatus(row.RemoteCareText)}</StyledTableCell>
                    <StyledTableCell align="left" aria-sort='desc'><button type="button"  data-patient-id={row.Patient_id} className="btn btn-primary btn-sm" onClick={modalhandleOpen}>More Details</button></StyledTableCell>
                    </StyledTableRow>
                    );
                  })}
                  </>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {/*  </Content> */}
    </>
    // </Layout>
  )
}