import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import {useHistory} from "react-router-dom";
import {TableOutlined,UserOutlined, AreaChartOutlined} from '@ant-design/icons';
import { Layout, Menu} from 'antd';
import {Link} from "react-router-dom";
import { Dropdown, Button, message } from 'antd';
import DevicesOtherIcon from '@material-ui/icons/DevicesOther';
import AssessmentRoundedIcon from '@material-ui/icons/AssessmentRounded';
import AirportShuttleIcon from '@material-ui/icons/AirportShuttle';
import { makeStyles } from '@material-ui/core/styles';
import VideocamIcon from '@material-ui/icons/Videocam';
import "./Dashboard.css";
import Image from '../services/images/ambulance.jpeg'
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

    const [isLoading, setisLoading]=React.useState(false);
    const [collapsed, setcollapsed]=React.useState(false);
    const [isError, setisError]=React.useState(false);
    const [data, setdata]=React.useState([]);
    const [IsModalVisible, setIsModalVisible]=React.useState(false);
    const [searchTerm, setsearchTerm]=React.useState('');
    const [page, setpage]=React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [ordPlaced, setordPlaced]=React.useState(2);
    const [open, setopen]=React.useState(false);
    const history = useHistory();
    const classes = useStyles();

    const { Header, Sider, Content } = Layout;

    const menu = (
      <Menu onClick={handleMenuClick}>
        <Menu.Item icon={<UserOutlined/>}>
          <Link to="/">Logout</Link>
        </Menu.Item>
    </Menu>
      );

      function toggle(){
        setcollapsed(!collapsed)
      };

     function handleMenuClick(e) {
        message.info('Logout Successful');
      }

    return (
    <Layout>
        {/* <Sider width={230} trigger={null} collapsible collapsed={collapsed}>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['8']}>
          
          <Menu.Item key="1" icon={<DashboardIcon style={{fontSize:'24px'}}/>}>
            <Link to="/dashboard">Dashboard </Link>
            </Menu.Item>

            <Menu.Item key="2" icon={<TableOutlined style={{fontSize:'24px'}}/>}>
              <Link to="/patientinfo">Patients </Link>
            </Menu.Item>
            
            <Menu.Item key="3" icon={<TableOutlined style={{fontSize:'24px'}}/>}>
              <Link to="/providerinfo">Providers </Link>
            </Menu.Item>

            <Menu.Item key="4" icon={<AreaChartOutlined style={{fontSize:'24px'}}/>}>
              <Link to ="/insights">Care Insights</Link>
            </Menu.Item>

            <Menu.Item key="5" icon={<DevicesOtherIcon style={{fontSize:'24px'}}/>}>
            <Link to="/device">Device Management</Link>
            </Menu.Item>

            <Menu.Item key="6" icon={<VideocamIcon style={{fontSize:'24px'}}/>}>
            <Link to ="/consultation">Video Consultation</Link>
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
             <p style={{fontSize:'26px', color: '#1890ff', marginLeft:"200px"}}>Remote Patient Monitoring
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
              minHeight: 550,
            }}> */}
            <h1 style={{fontSize:'20px', textAlign:'center', fontWeight: 'bold'}}>24/7 Ambulance Services</h1>
            <div>
            <center><img src={Image} style={{alignItems:'center', justifyContent:'center'}} alt="Ambulance" width="80%"/></center>

            <p style={{fontSize:'16px', color: 'grey', fontWeight: 'bold', textAlign:'center', paddingTop: '5px', margin: '0px'}}>With our 24*7 ambulance service, we ensure to make it quick and hassle-free by offering affordable ambulance service.</p>
            <p style={{fontSize:'20px', color: '#CA3433', fontWeight: 'bold', textAlign:'center', margin: '0px'}}>Contact : 1800-2063-4040</p>
            </div>
            
           <center style={{marginBottom: '12px'}}>
              <Link to="/services/ambulanceinfo" >
                <button type="button" class="btn btn-primary btn-sm" >More Details</button>
              </Link>
            </center>
            {/* </Content>
        </Layout> */}
           
      </Layout>
    )
}
