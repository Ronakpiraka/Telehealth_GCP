import React from 'react'
import CIcon from '@coreui/icons-react'

const _nav =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Patients',
    to: '/records/patients',
    icon: 'cil-group',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Providers',
    to: '/records/providers',
    icon: 'cil-hospital',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Care Insights',
    to: '/insights',
    icon: 'cil-puzzle',
  },
  // {
  //   _tag: 'CSidebarNavDropdown',
  //   name: 'Reports',
  //   route: '/reports',
  //   icon: 'cil-puzzle',
  //   _children: [
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Hospital Insights',
  //       to: '/reports/report1',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Doctor Engagements',
  //       to: '/reports/report2',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Patient Demography',
  //       to: '/reports/report3',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Doctor Insights',
  //       to: '/reports/report4',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Patient Care',
  //       to: '/reports/report5',
  //     }
  //   ]
  // },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Devices']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Device Management',
    to: '/device/devices',
    icon: 'cil-calculator',
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Notification']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Email Notifications',
    to: '/notifications/email',
    icon: 'cil-bell',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Video Consultations',
    to: '/notifications',
    icon: 'cil-bell',
    badge: {
      color: 'warning',
      text: '+1',
    }
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Services']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Ambulance Service',
    to: '/services/ambulance',
    icon: 'cil-location-pin',
  },
]

export default _nav
