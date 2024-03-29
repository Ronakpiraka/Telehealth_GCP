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
import { useLocation } from "react-router-dom";

const TheHeaderDropdown = () => {

  let name = sessionStorage.getItem('Patient_name');

  const location = useLocation();
  let paramString = location.search.split('mabc=')[1];
  console.log(paramString)  


  return (
    <CDropdown
      inNav
      className="c-header-nav-items mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
      <span style={{marginRight:'15px'}}>
        {paramString && (
          <b>Welcome {name}</b>
        )}
        {!paramString && (
        <b>Welcome Ronak</b>
        )}
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
          Logout
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
          <CIcon name="cil-credit-card" className="mfe-2"/>
          Today's Appointment
          <CBadge color="secondary" className="mfs-auto" marginWidth={'5px'}>{sessionStorage.getItem('appointmentsToday')}</CBadge>
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdown
