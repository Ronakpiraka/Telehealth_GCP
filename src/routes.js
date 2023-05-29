import React from 'react';

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const Patients = React.lazy(() => import('./views/records/Patients'));
const CPatients = React.lazy(() => import('./views/records/CPatients'));
const Providers = React.lazy(() => import('./views/records/Providers'));
const PatientDetails = React.lazy(() => import('./views/records/PatientDetails'));
const Reports = React.lazy(() => import('./views/reports/Reports.js'));
const Insights = React.lazy(() => import('./views/insights/continuous'));
const Login = React.lazy(() => import('../src/containers/Userlogin'));
const Logout = React.lazy(() => import('../src/containers/logout'));
const Continuous = React.lazy(() => import('./views/insights/continuousFrame'));
const Preventive = React.lazy(() => import('./views/insights/preventiveFrame'));
const ProviderInsights = React.lazy(() => import('./views/reports/ProviderInsights'));
const PractitionerEngagements = React.lazy(() => import('./views/reports/PractitionerEngagements'));
const PractitionerInsights = React.lazy(() => import('./views/reports/PractitionerInsights'));
const PatientCare = React.lazy(() => import('./views/reports/PatientCare'));
const PatientDemography = React.lazy(() => import('./views/reports/PatientDemography'));
const Device = React.lazy(() => import('./views/device/Device'));
const Notification = React.lazy(() => import('./views/notifications/calendar'));
const CalendarSchedule = React.lazy(() => import('./views/notifications/CalenderSchedule'));
const AmbulanceService = React.lazy(() => import('./views/services/AmbulanceService'));
const AmbulanceInform = React.lazy(() => import('./views/services/AmbulanceInform'));
const Ambulancedetails = React.lazy(() => import('./views/services/AmbulanceDetails'));
const AllAppointments = React.lazy(() => import('./views/notifications/AllAppointments'));
const PastAppointments = React.lazy(()=> import('./views/notifications/PastAppointments'));
const TodayAppointments = React.lazy(() => import('./views/notifications/TodayAppointments'));
const UpcomingAppointments = React.lazy(()=> import('./views/notifications/UpcomingAppointments'));
const PatientAppointments = React.lazy(()=> import('./views/notifications/PatientAppointments'));
const Appointment = React.lazy(()=> import('./views/notifications/appointments'));
const Practitionerbookings = React.lazy(()=> import('./views/notifications/Practitionerbooking'));
const CriticalPractitionerbookings = React.lazy(()=> import('./views/notifications/CriticalPractitionerbooking'));
// const Modal = React.lazy(() => import('./views/records/modal.js'));
const Consent = React.lazy(()=> import('./views/notifications/Consent'));
const routes = [
  
  { path: '/logout', name: 'Logout', component: Logout },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/records/patients', name: 'Patients', component: Patients, exact: true },
  { path: '/records/cpatients', name: 'CPatients', component: CPatients, exact: true },
  { path: '/records/providers', name: 'Providers', component: Providers, exact: true },
  { path: '/records/patientdetails', name: 'Patientdetails', component: PatientDetails, exact: true },
  { path: '/insights', name: 'insights', component: Insights, exact: true },
  { path: '/insights/preventive', name: 'PreventiveCare', component: Preventive, exact: true },
  { path: '/insights/continuous', name: 'ContinuousCare', component: Continuous, exact: true },
  { path: '/device/devices', name: 'Devices', component: Device, exact: true },
  { path: '/bookAppointment', name: 'Appointment Booking', component: Appointment, exact: true },
  { path: '/Practitionerbookings', name: 'Appointment Booking / Practitioner Booking', component: Practitionerbookings, exact: true },
  { path: '/CriticalPractitionerbookings', name: 'Appointment Booking / Urgent Practitioner Booking', component: CriticalPractitionerbookings, exact: true },
  { path: '/notifications/CalenderSchedule', name:'CalenderSchedule', component: CalendarSchedule, exact: true },
  { path: '/reports/ProviderInsights', name: 'ProviderInsights', component: ProviderInsights, exact: true },
  { path: '/reports/PractitionerEngagements', name: 'PractitionerEngagements', component: PractitionerEngagements, exact: true },
  { path: '/reports/PatientDemography', name: 'PatientDemography', component: PatientDemography, exact: true },
  { path: '/reports/PractitionerInsights', name: 'PractitionerInsights', component: PractitionerInsights, exact: true },
  { path: '/reports/PatientCare', name: 'PatientCare', component: PatientCare, exact: true },
  { path: '/notifications/allappointments', name: 'All Appointments', component: AllAppointments, exact: true },
  { path: '/notifications/past', name: 'Appointment History', component: PastAppointments, exact: true },
  { path: '/notifications/today', name: "Today's Appointments", component: TodayAppointments, exact: true },
  { path: '/notifications/upcoming', name: 'Upcoming Appointments', component: UpcomingAppointments, exact: true },
  { path: '/notifications', name: '', component: Notification, exact: true },
  { path: '/notifications/PatientAppointments', name: 'Patient Appointments', component: PatientAppointments, exact: true },
  { path: '/notifications/Consent', name: 'Appointment Booking / Consent', component: Consent , exact: true },
  { path: '/services/ambulance', name: 'AmbulanceService', component: AmbulanceService, exact: true },
  { path: '/services/ambulanceinfo', name: 'AmbulanceInfo', component: AmbulanceInform, exact: true },
  { path: '/services/ambulancedetails', name: 'Ambulancedetails', component: Ambulancedetails, exact: true}
]

export default routes;
