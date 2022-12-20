import React from 'react';

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const Patients = React.lazy(() => import('./views/records/Patients'));
const Providers = React.lazy(() => import('./views/records/Providers'));
const PatientDetails = React.lazy(() => import('./views/records/PatientDetails'));
const Reports = React.lazy(() => import('./views/reports/Reports.js'));
const Insights = React.lazy(() => import('./views/insights/continuous'));
const Login = React.lazy(() => import('../src/containers/Userlogin'));
const Continuous = React.lazy(() => import('./views/insights/continuousFrame'));
const Preventive = React.lazy(() => import('./views/insights/preventiveFrame'));
const ProviderInsights = React.lazy(() => import('./views/reports/ProviderInsights'));
const PractitionerEngagements = React.lazy(() => import('./views/reports/PractitionerEngagements'));
const PractitionerInsights = React.lazy(() => import('./views/reports/PractitionerInsights'));
const PatientCare = React.lazy(() => import('./views/reports/PatientCare'));
const PatientDemography = React.lazy(() => import('./views/reports/PatientDemography'));
const Device = React.lazy(() => import('./views/device/Device'));
const Notification = React.lazy(() => import('./views/notifications/calendar.jsx'));
const AmbulanceService = React.lazy(() => import('./views/services/AmbulanceService'));
const AmbulanceInform = React.lazy(() => import('./views/services/AmbulanceInform'));
const Ambulancedetails = React.lazy(() => import('./views/services/AmbulanceDetails'));
const EmailNotification = React.lazy(() => import('./views/notifications/EmailNotifications'));
// const Modal = React.lazy(() => import('./views/records/modal.js'));

const routes = [
  { path: '/login', name: 'Login', component: Login },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/records/patients', name: 'Patients', component: Patients, exact: true },
  { path: '/records/providers', name: 'Providers', component: Providers, exact: true },
  { path: '/records/patientdetails', name: 'Patientdetails', component: PatientDetails, exact: true },
  { path: '/insights', name: 'insights', component: Insights, exact: true },
  { path: '/insights/preventive', name: 'PreventiveCare', component: Preventive, exact: true },
  { path: '/insights/continuous', name: 'ContinuousCare', component: Continuous, exact: true },
  { path: '/device/devices', name: 'Devices', component: Device, exact: true },
  // { path: '/reports', name: 'Reports', component: Reports, exact: true },
  // { path: '/Modal', name: 'Modal', component: Modal },
  { path: '/reports/ProviderInsights', name: 'ProviderInsights', component: ProviderInsights, exact: true },
  { path: '/reports/PractitionerEngagements', name: 'PractitionerEngagements', component: PractitionerEngagements, exact: true },
  { path: '/reports/PatientDemography', name: 'PatientDemography', component: PatientDemography, exact: true },
  { path: '/reports/PractitionerInsights', name: 'PractitionerInsights', component: PractitionerInsights, exact: true },
  { path: '/reports/PatientCare', name: 'PatientCare', component: PatientCare, exact: true },
  { path: '/notifications/email', name: 'Email', component: EmailNotification, exact: true },
  { path: '/notifications', name: 'Notifications', component: Notification, exact: true },
  { path: '/services/ambulance', name: 'AmbulanceService', component: AmbulanceService, exact: true },
  { path: '/services/ambulanceinfo', name: 'AmbulanceInfo', component: AmbulanceInform, exact: true },
  { path: '/services/ambulancedetails', name: 'Ambulancedetails', component: Ambulancedetails, exact: true}
]

export default routes;
