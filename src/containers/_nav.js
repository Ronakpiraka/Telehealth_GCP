import React from 'react'
import CIcon from '@coreui/icons-react'
import HistoryIcon from '@mui/icons-material/History';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';

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
    _tag: 'CSidebarNavDropdown',
    name: 'Care Insights',
    to: '/insights',
    icon: 'cil-puzzle',
    _children: [
          {
            _tag: 'CSidebarNavItem',
            name: 'Continuous Care',
            to: '/insights/continuous',
          },
          {
            _tag: 'CSidebarNavItem',
            name: 'Preventive Care',
            to: '/insights/preventive'
          }
        ]

  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Reports',
    route: '/reports',
    icon: <AssessmentOutlinedIcon style={{marginRight:'16px'}}/>,
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Provider Insights',
        to: '/reports/ProviderInsights',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Practitioner Engagements',
        to: '/reports/PractitionerEngagements',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Patient Demography',
        to: '/reports/PatientDemography',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Practitioner Insights',
        to: '/reports/PractitionerInsights',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Patient Care',
        to: '/reports/PatientCare',
      }
    ]
  },
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
    name: 'Book Appointment',
    to: '/bookAppointment',
    icon: 'cil-bell',
    badge: {
      color: 'success',
      text: '+5',
    }
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Appointment History',
    to: '/notifications/email',
    icon: <HistoryIcon style={{marginRight:'16px'}}/>,
    badge: {
      color: 'success',
      text: sessionStorage.getItem('appointmentsToday'),
    }
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Calender Notification',
    to: '/notifications',
    icon: 'cil-calendar',
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
