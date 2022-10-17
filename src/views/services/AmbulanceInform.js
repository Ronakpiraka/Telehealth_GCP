import React from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import TableContainer from '@material-ui/core/TableContainer';
import {useHistory} from "react-router-dom";
import {TableOutlined,HeartOutlined,NotificationOutlined,MailOutlined,UserOutlined, AreaChartOutlined} from '@ant-design/icons';
import { Layout, Menu, Input} from 'antd';
import {Link} from "react-router-dom";
import { Dropdown, message } from 'antd';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AssessmentRoundedIcon from '@material-ui/icons/AssessmentRounded';
import AirportShuttleIcon from '@material-ui/icons/AirportShuttle';
import VideocamIcon from '@material-ui/icons/Videocam';
import DevicesOtherIcon from '@material-ui/icons/DevicesOther';
import DashboardIcon from '@material-ui/icons/Dashboard';
import {MenuUnfoldOutlined,MenuFoldOutlined} from '@ant-design/icons';

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
  }));

const history = useHistory();
  var url;


function createData(no, name, code, contact) {
  return { no, name, code, contact };
}

const rows = [
  createData('U14-GXR', "Mark Otto", 'PCP9755', "978-580-1342"),
  createData('W40-XFP', "Jacob Thornton",'PCP10332', "781-585-8492"),
  createData('U38-WKV', "July Dooley",'PCP30027', "978-897-9797"),
  createData('V71-WWF', "Mary Moe",'PCP22470', "978-667-7711"),
  createData('Y54-NLN', "John Doe",'PCP26525', "781-236-2094"),
]

const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
});
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
    const [collapsed, setcollapsed]=React.useState(false);
    const { Header, Sider, Content } = Layout;
    const { Search } = Input;
    const classes2 = useStyles2();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    const menu = (
        <Menu onClick={handleMenuClick}>
          <Menu.Item icon={<UserOutlined/>}>
            Logout
          </Menu.Item>
        </Menu>
      );

    function handleMenuClick(e) {
        message.info('Logout Successful');
      }

    const redirectToPatientDetails = (e, no) => {
        url = `/services/ambulancedetails?no=${no}`;
        history.push(`${url}`);
    }
    function toggle(){
      setcollapsed(!collapsed)
    };

    return (
    <Layout>
        {/* <Sider width={230} trigger={null} collapsible collapsed={collapsed}>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['8']}>
          
          <Menu.Item key="1" icon={<DashboardIcon style={{fontSize:'24px'}}/> } >
            <Link to="/dashboard">Dashboard </Link>
            </Menu.Item>

            <Menu.Item key="2" icon={<TableOutlined  style={{fontSize:'24px'}}/>}>
              <Link to="/patientinfo">Patients</Link>
            </Menu.Item>
            
            <Menu.Item key="3" icon={<TableOutlined  style={{fontSize:'24px'}}/>}>
              <Link to="/providerinfo">Providers</Link>
            </Menu.Item>

            <Menu.Item key="4" icon={<AreaChartOutlined  style={{fontSize:'24px'}}/>}>
              <Link to ="/insights">Care Insights</Link>
            </Menu.Item>

            <Menu.Item key="5" icon={<DevicesOtherIcon style={{fontSize:'24px'}}/>}>
              <Link to="/device">Device Management</Link>
            </Menu.Item>

            <Menu.Item key="6" icon={<VideocamIcon  style={{fontSize:'24px'}}/>}>
            <Link to ="/consultation">Video Consultations</Link>
            </Menu.Item>

            <Menu.Item key="7" icon={<AssessmentRoundedIcon  style={{fontSize:'24px'}}/>}>
            <Link to ="/reports">Reports</Link>
            </Menu.Item>

            <Menu.Item key="8" icon={<AirportShuttleIcon  style={{fontSize:'24px'}}/>}>
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
              minHeight: 600,
            }}
          > */}
           <h1 style={{fontSize:'22px', textAlign:'center'}}> Ambulance Details</h1>

           <TableContainer component={Paper}>
      <Table className={classes2.table} aria-label="custom pagination table">
      <TableHead>
          <TableRow>
            <TableCell style={{fontWeight: 'bold'}}>Ambulance No</TableCell>
            <TableCell style={{fontWeight: 'bold'}}>Driver Name</TableCell>
            <TableCell style={{fontWeight: 'bold', align: 'center'}}>Provider Code</TableCell>
            <TableCell style={{fontWeight: 'bold', align: 'center'}}>Provider Contact No</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <StyledTableRow key={row.no}>
              <StyledTableCell>
              <a
                onClick={(e) => { redirectToPatientDetails(e, row.no)}}
                target="_blank"
                onMouseOver={function (event) { let target = event.target; target.style.color = 'blue'; target.style.cursor = 'pointer'; }}
                onMouseOut={function (event) { let target = event.target; target.style.color = 'black'; }}
                >
                {row.no}
                </a>
              </StyledTableCell>
              <StyledTableCell>{row.name}</StyledTableCell>
              <StyledTableCell>{row.code}</StyledTableCell>
              <StyledTableCell>{row.contact}</StyledTableCell>
            </StyledTableRow>
          ))}

          {emptyRows > 0 && (
            <StyledTableRow style={{ height: 53 * emptyRows }}>
              <StyledTableCell colSpan={6} />
            </StyledTableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>

        {/* </Content>
        </Layout> */}

      </Layout>
    )
}
