import React, { useEffect, useState } from 'react'
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import Avatar from '@material-ui/core/Avatar';
import img from './1.jpg'
import { useLocation, Link } from "react-router-dom";
import Appointment from '../views/notifications/appointments'
import Logout from './logout'

const TheHeaderDropdown = (props) => {

  const [reloadCount, setReloadCount] = useState(0);
  const Authenticated = sessionStorage.getItem('IsAuthenticated')
  console.log("HD", Authenticated)
  let name = sessionStorage.getItem('Patient_name');
  console.log("HD", name)

  return (
    <CDropdown
    inNav
    className="c-header-nav-items mx-2"
    direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
      <span style={{marginRight:'15px'}}>
        {Authenticated && name === null? 
        <b>Welcome Telehealth Admin</b>
        :
        name !== null ?
        <b>Welcome {name}</b>
        :
        <b>Welcome Guest</b>
        }
      </span>
        <div className="c-avatar">
          <Avatar alt="Remy Sharp" src={img} />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem
          header
          tag="div"
          color="light"
          className="text-center"
        >
          <strong>Account</strong>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-bell" className="mfe-2" />
          <Logout />
        </CDropdownItem>
        <CDropdownItem
          header
          tag="div"
          color="light"
          className="text-center"
        >
          <strong>Settings</strong>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-user" className="mfe-2" />Profile
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-settings" className="mfe-2" />
          Settings
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-credit-card" className="mfe-2" />
          Today's Appointment
          <CBadge color="secondary" className="mfs-auto" marginWidth={'5px'}>{sessionStorage.getItem('appointmentsToday')}</CBadge>
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdown

// import React, { useEffect, useState } from 'react';
// import { CBadge, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CImg } from '@coreui/react';
// import CIcon from '@coreui/icons-react';
// import Avatar from '@material-ui/core/Avatar';
// import img from './1.jpg';
// import { useLocation, Link } from 'react-router-dom';
// import Appointment from '../views/notifications/appointments';
// import Logout from './logout';

// const TheHeaderDropdown = (props) => {
//   const Authenticated = sessionStorage.getItem('IsAuthenticated');
//   const [name, setName] = useState(sessionStorage.getItem('Patient_name'));

//   useEffect(() => {
//     if (name !== null) {
//       setTimeout(() => {
//         window.location.reload();
//       }, 10000);
//     }
//   }, []); // Empty dependency array to execute the effect only once when the component is mounted

//   return (
//     <CDropdown inNav className="c-header-nav-items mx-2" direction="down">
//       <CDropdownToggle className="c-header-nav-link" caret={false}>
//         <span style={{ marginRight: '15px' }}>
//           {Authenticated && name === null ? (
//             <b>Welcome Admin</b>
//           ) : name !== null ? (
//             <b>Welcome {name}</b>
//           ) : (
//             <b>Welcome Guest</b>
//           )}
//         </span>
//         <div className="c-avatar">
//           <Avatar alt="Remy Sharp" src={img} />
//         </div>
//       </CDropdownToggle>
//       <CDropdownMenu className="pt-0" placement="bottom-end">
//         {/* Dropdown menu items */}
//       </CDropdownMenu>
//     </CDropdown>
//   );
// };

// export default TheHeaderDropdown;
