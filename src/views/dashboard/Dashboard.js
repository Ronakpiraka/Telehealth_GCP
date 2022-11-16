import React, { lazy } from 'react'
import {
  CBadge,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CProgress,
  CCallout,
  CCardGroup,
  CCardFooter,
  CCol,
  CLink,
  CRow,
  CWidgetProgress,
  CWidgetIcon,
  CWidgetProgressIcon,
  CWidgetSimple
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import Iframe from 'react-iframe'
import MainChartExample from '../charts/MainChartExample.js'

const WidgetsDropdown = lazy(() => import('../widgets/WidgetsDropdown.js'))
// const WidgetsBrand = lazy(() => import('../widgets/WidgetsBrand.js'))


export default function Dashboard (){
const [dashdetails, setdashdetails] = React.useState([]);
const fetchdashdetailsdata = () => {
  console.log("check function")
var requestOptions = {
  method: 'GET'
};

fetch("https://us-central1-telehealth-365911.cloudfunctions.net/fetchDashboard", requestOptions)
.then((resp) => resp.json())
.then((response) => {
  setdashdetails(response)
  console.log(dashdetails)
  
  // console.log( eval(JSON.stringify(data)));
})
.catch(error => console.log('error', error));
}
// useEffect(() => { 
//   // console.log("hello useeffect")
//   fetchdashdetailsdata();
// })

// const Dashboard = () => {
  return (
    <div>
      <WidgetsDropdown/>
      <CCard>
        <CCardBody>
        
          <CRow>
            <CCol sm="5">
              <h3 id="traffic" className="card-title mb-0">Preventive Care</h3>
            </CCol>
            <CCol sm="7" className="d-none d-md-block">
            </CCol>
          </CRow>

          <Iframe width="100%" height="380px" src="https://datastudio.google.com/embed/reporting/c4611298-10ab-4b55-9625-33805ce06003/page/tEnnC" frameborder="0" style="border:0" allowfullscreen/>
        </CCardBody>
        {/* {dashdetails.length > 0 && dashdetails.map(item) => { */}
          <CCardGroup className="mb-4">
            <CWidgetProgressIcon
            header ="250"
              // header = {item.total_patient_count}
              text="New Patients"
              color="gradient-info"
              inverse
            >
              <CIcon name="cil-people" height="36" />
            </CWidgetProgressIcon><CWidgetProgressIcon
            header ="250"
              // header={item.active_count}
              text="Active Cases"
              color="gradient-success"
              inverse
            >
                <CIcon name="cil-userFollow" height="36" />
              </CWidgetProgressIcon><CWidgetProgressIcon
                header ="250"
                // header={item.Provider_count}
                text="Facilities"
                color="gradient-warning"
                inverse
              >
                <CIcon name="cil-basket" height="36" />
              </CWidgetProgressIcon><CWidgetProgressIcon
                header ="250"
                // header={item.care_insights_count}
                text="Care Insights"
                color="gradient-primary"
                inverse
              >
                <CIcon name="cil-chartPie" height="36" />
              </CWidgetProgressIcon><CWidgetProgressIcon
                header ="250"
                // header={item.claims_count}
                text="Insurance Code"
                color="gradient-danger"
                inverse
              >
                <CIcon name="cil-speedometer" height="36" />
              </CWidgetProgressIcon>
          </CCardGroup>
        {/* } */}
      </CCard>
      </div>)
    
}
  

