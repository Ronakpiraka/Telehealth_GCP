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

export default function ProviderInform() {
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
    
        const [data, setdata]=React.useState([]);
        const [collapsed, setcollapsed]=React.useState(false);
        const [searchTerm, setsearchTerm]=React.useState('');
        const [page, setpage]=React.useState(0);
        const [rowsPerPage, setRowsPerPage] = React.useState(5);
        const [ordPlaced, setordPlaced]=React.useState(2);
        const classes = useStyles();
    
        const { Header, Sider, Content } = Layout;
        const { Search } = Input;

          // const menu = (
          //   <Menu onClick={handleMenuClick}>
          //     <Menu.Item icon={<UserOutlined/>}>
          //         <Link to="/">Logout</Link>
          //     </Menu.Item>
          // </Menu>
          //   );
      
          // function handleMenuClick(e) {
          //     message.info('Logout Successful');
          //   }
    
          const handleChangePage = (event, newPage) => {
            setpage(newPage);
          };
        
          const handleChangeRowsPerPage = event => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setpage(0);
          };

          const fetchproviderdata = () => {
            var requestOptions = {
              method: 'GET'
            };
      
            fetch("https://tthvndwmkh.execute-api.us-east-1.amazonaws.com/rpm-api?bucket=rpm-aws-synthea&key=providerinformation.json", requestOptions)
            .then((resp) => resp.json())
            .then((response) => {
              setdata(response.data)
              console.log(data)
            })
            .catch(error => console.log('error', error));
          }
    
        useEffect(() => { 

           fetchproviderdata();
        })

    return (
      <>
        {/* <Sider width={230} trigger={null} collapsible collapsed={collapsed}>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['3']}>
          <Menu.Item key="1" icon={<DashboardIcon style={{fontSize:'24px'}}/>} >
            <Link to="/dashboard">Dashboard </Link>
            </Menu.Item>

            <Menu.Item key="2" icon={<TableOutlined style={{fontSize:'24px'}}/>}>
            <Link to="/patientinfo">Patients</Link>
            </Menu.Item>
            
            <Menu.Item key="3" icon={<TableOutlined style={{fontSize:'24px'}}/>} >
              <Link to="/providerinfo">Providers</Link>
            </Menu.Item>

            <Menu.Item key="4" icon={<AreaChartOutlined style={{fontSize:'24px'}}/>}>
              <Link to ="/insights">Care Insights</Link>
            </Menu.Item>

            <Menu.Item key="5" icon={<DevicesOtherIcon style={{fontSize:'24px'}}/>}>
            <Link to="/device">Device Management</Link>
            </Menu.Item>

            <Menu.Item key="6" icon={<VideocamIcon style={{fontSize:'24px'}}/>}>
              <Link to ="/consultation">Video Consultations</Link>
            </Menu.Item>

            <Menu.Item key="7" icon={<AssessmentRoundedIcon style={{fontSize:'24px'}}/>}>
            <Link to="/reports">Reports</Link>
            </Menu.Item>

            <Menu.Item key="8" icon={<AirportShuttleIcon style={{fontSize:'24px'}}/>}>
                <Link to ="/ambulanceservices">Ambulance Services</Link>
            </Menu.Item>
          </Menu>
    </Sider> */}

        {/* <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
          <div style={{float:"left", marginLeft:"5px", fontWeight:"bolder"}}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                  className: 'trigger',
                  onClick: toggle,
                })}
            </div>
             <p style={{fontSize:'26px', color:"#1890ff", marginLeft:"200px"}}>Remote Patient Monitoring
             <div style={{float:"right", margin:'8px'}}>
              <Dropdown overlay={menu} >
                <a className="ant-dropdown-link" > 
                <Avatar src="/broken-image.jpg" className={classes.large} style={{backgroundColor: '#1890ff'}}/>
                </a>
              </Dropdown>
            </div>
            <h6 style={{fontSize:"16px", color:"black", float:"right", marginRight:"5px"}}>Welcome Steve</h6>
            <span style={{float: "right", display: "inline-block", margin: "20px -120px", fontSize: "16px"}}>Care Services Admin</span>
             </p>
          </Header>
        
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 500,
            }}
          >  */}

            <p style={{fontSize:'22px', textAlign:'center'}}><strong>Provider Details</strong></p>

          <Paper>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search by Code..."
                classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
                onChange={(e)=>{setsearchTerm(e.target.value)}}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
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
                </TableRow>
              </TableHead>

              <TableBody>
                {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).filter(val=>{
                  if(searchTerm === "")
                  {
                    return val;
                  }
                  else if((val.id.toLowerCase().includes(searchTerm.toLowerCase())) ||
                  (val.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
                  (val.phone.toLowerCase().includes(searchTerm.toLowerCase())) ||
                  (val.address.toLowerCase().includes(searchTerm.toLowerCase())) ||
                  (val.special.toLowerCase().includes(searchTerm.toLowerCase())) ||
                  (val.specialist.toLowerCase().includes(searchTerm.toLowerCase()))
                  ){
                     return val  
                  }
                })
                  .map((row, index) => {
                    return(
                      <StyledTableRow>
                        {/* <TableCell align="left">{row.id}</TableCell> */}
                        <StyledTableCell align="left">{row.name}</StyledTableCell>
                        <StyledTableCell align="left">{row.phone}</StyledTableCell>
                        <StyledTableCell align="left">{row.address}</StyledTableCell>
                        <StyledTableCell align="left">{row.special}</StyledTableCell>
                        <StyledTableCell align="left">{row.specialist}</StyledTableCell>
                      </StyledTableRow>
                    )
                  })
                 }
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={ordPlaced}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
         {/* </Content> */}
         </>
        // </Layout> 

     
    )
}
