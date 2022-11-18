import React , {useEffect} from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableContainer from '@material-ui/core/TableContainer';
import {TableOutlined,UserOutlined, AreaChartOutlined} from '@ant-design/icons';
import { Layout, Menu} from 'antd';
import { BsFillPersonFill } from "react-icons/bs";
import Input from '@material-ui/core/Input';
import {Link} from "react-router-dom";
import {useHistory} from "react-router-dom";
import { Dropdown, message } from 'antd';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Row from './Row';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import InputBase from '@material-ui/core/InputBase';
import { alpha} from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

export default function PatientInform() {
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
    const [collapsed, setcollapsed]=React.useState(false);
    const [searchTerm, setsearchTerm]=React.useState('');
    const [page, setpage]=React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [ordPlaced, setordPlaced]=React.useState(5);
    const classes = useStyles();
    const history = useHistory();

    const { Header, Sider, Content } = Layout;
    const { Search } = Input;
    var url;

    const fetchpatientdata = () => {
      // console.log("check function")

      var requestOptions = {
        method: 'GET'
      };

      fetch("https://us-central1-telehealth-365911.cloudfunctions.net/fetchpatientdata", requestOptions)
      .then((resp) => resp.json())
      .then((response) => {
        setdata(response)
        // console.log(data)
        
        // console.log( eval(JSON.stringify(data)));
      })
      .catch(error => console.log('error', error));
    }

    useEffect(() => { 
      //console.log("hello useeffect")
      fetchpatientdata();
    })

    const redirectToPatientDetails = (e, Patient_id) => {
      url = `/records/patientdetails?Patient_id=${Patient_id}`;
      history.push(`${url}`);
    }

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

    const menu = (
        <Menu onClick={handleMenuClick}>
          <Menu.Item icon={<UserOutlined/>}>
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

      function toggle(){
        setcollapsed(!collapsed)
      };


    return (
    <>
        <p style={{fontSize:'22px', textAlign:'center'}}><strong>Patient Engagement</strong></p>

          <Paper>
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
                    onChange={(e)=>{setsearchTerm(e.target.value)}}
                    inputProps={{ 'aria-label': 'search' }}
                  />
            </div>
            <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                <TableRow style={{ padding: '0px' }}>
                <TableCell style={{ fontWeight: 'bold'}}>Full Name</TableCell>
                <TableCell style={{ fontWeight: 'bold'}}>Address</TableCell>
                <TableCell style={{ fontWeight: 'bold'}}>Age</TableCell>
                <TableCell style={{ fontWeight: 'bold'}}>Phone Number</TableCell>
                <TableCell style={{ fontWeight: 'bold'}}>Remote Care</TableCell>
                <TableCell style={{ fontWeight: 'bold'}}>Consent Form</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).filter(val=>{
                  if(searchTerm === "")
                  {
                    return val;
                  }
                  else if ((val.Patient_Address.toLowerCase().includes(searchTerm.toLowerCase())) ||
                  (val.Full_name.toLowerCase().includes(searchTerm.toLowerCase()))
                  ){
                     return val  
                  }
                })
                  .map((row, index) => {
                    return(
                    <TableRow>
                      <StyledTableCell align="left" component="th" scope="row" style={{width:"25%"}}>
                      <BsFillPersonFill size={25}/> &nbsp;&nbsp;
                        <a
                            onClick={(e) => { redirectToPatientDetails(e, row.Patient_id)}}
                            target="_blank"
                            style={{ padding: '0px 0px 0px 0px', fontWeight: 'bold', color: 'blue'}}
                            onMouseOver={function (event) { let target = event.target; target.style.color = 'blue'; target.style.cursor = 'pointer'; }}
                            onMouseOut={function (event) { let target = event.target; target.style.color = 'black'; }}
                          >
                            {/* main patient data */}
                            {row.Full_name}
                        </a>
                      </StyledTableCell>
                      <StyledTableCell align="left">{row.Patient_Address}</StyledTableCell>
                      <StyledTableCell align="left">{row.Patient_Age}</StyledTableCell>
                      <StyledTableCell align="left" style={{width:'150px'}}>{row.Contact_number}</StyledTableCell>
                      <StyledTableCell align="left">{displayCheckedBox(row)}</StyledTableCell>
                      <StyledTableCell align="left">{displayCheckedBox(row)}</StyledTableCell>
                    </TableRow>
                       );
                      })}
                     
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