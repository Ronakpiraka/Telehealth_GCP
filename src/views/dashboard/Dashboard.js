import React, { lazy, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardGroup,
  CWidgetDropdown,
  CCol,
  CRow,
  CWidgetProgressIcon,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import Iframe from 'react-iframe'
import ChartLineSimple from '../charts/ChartLineSimple'
import ChartBarSimple from '../charts/ChartBarSimple'
import {useHistory, useLocation} from "react-router-dom";

const WidgetsDropdown = lazy(() => import('../widgets/WidgetsDropdown.js'))
// const WidgetsBrand = lazy(() => import('../widgets/WidgetsBrand.js'))

const Dashboard = () => {

  const [dashdetails, setdashdetails] = React.useState([]);
  const history = useHistory();

  async function fetchdashdetails() {
    var accessToken = sessionStorage.getItem("Accesstoken");
    const dashboardData = await fetch("https://bigquery.googleapis.com/bigquery/v2/projects/telehealth-365911/datasets/telehealth-365911.FHIR_Synthea.Patient/data", {
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Authorization': 'Bearer ' + accessToken
      }
    })
    .then(resp=>{
      setdashdetails(resp)
      console.log(dashdetails)  
    })
    .catch(error => {
      console.log(error)
    });
  }
  

  useEffect(() => {
    fetchdashdetails();
  }, [])

  console.log(dashdetails)

  return (
    <>
      <CRow>
      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-primary"
          header={dashdetails.Patient_count}
          text="Total Patients"
          footerSlot={
            <ChartLineSimple
              pointed
              className="c-chart-wrapper mt-3 mx-3"
              style={{height: '70px'}}
              dataPoints={[65, 59, 84, 84, 51, 55, 40]}
              pointHoverBackgroundColor="primary"
              label="Members"
              labels="months"
            />
          }
        >
        </CWidgetDropdown>
      </CCol>
      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-danger"
          header={dashdetails.high_risk_count}
          text="Critical Patients"
          footerSlot={
            <ChartBarSimple
              className="mt-3 mx-3"
              style={{height: '70px'}}
              backgroundColor="rgb(250, 152, 152)"
              label="Members"
              labels="months"
            />
          }
        >
        </CWidgetDropdown>
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-warning"
          header={dashdetails.med_risk_count}
          text="Non - Critical Patients"
          footerSlot={
            <ChartLineSimple
              className="mt-3"
              style={{height: '70px'}}
              backgroundColor="rgba(255,255,255,.2)"
              dataPoints={[78, 81, 80, 45, 34, 12, 40]}
              options={{ elements: { line: { borderWidth: 2.5 }}}}
              pointHoverBackgroundColor="warning"
              label="Members"
              labels="months"
            />
          }
        >
        </CWidgetDropdown>
      </CCol>
      
      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-info"
          header={dashdetails.low_risk_count}
          text="Low Risk Patients"
          footerSlot={
            <ChartLineSimple
              pointed
              className="mt-3 mx-3"
              style={{height: '70px'}}
              dataPoints={[1, 18, 9, 17, 34, 22, 11]}
              pointHoverBackgroundColor="info"
              options={{ elements: { line: { tension: 0.00001 }}}}
              label="Members"
              labels="months"
            />
          }
        >
        </CWidgetDropdown>
      </CCol>
    </CRow>

      <CCard>

        <CCardGroup className="mb-4">
          <CWidgetProgressIcon
            header={dashdetails.Provider_count}
            text="Providers"
            color="gradient-info"
            inverse
          >
            <CIcon name="cil-people" height="36" />
          </CWidgetProgressIcon>
          <CWidgetProgressIcon
            header={dashdetails.Practitioner_count}
            text="Practitioners"
            color="gradient-success"
            inverse
          >
            <CIcon name="cil-userFollow" height="36" />
          </CWidgetProgressIcon>
          <CWidgetProgressIcon
            header={dashdetails.Condition_count}
            text="Condition"
            color="gradient-warning"
            inverse
          >
            <CIcon name="cil-basket" height="36" />
          </CWidgetProgressIcon>
          <CWidgetProgressIcon
            header={dashdetails.Procedure_count}
            text="Procedures"
            color="gradient-primary"
            inverse
          >
            <CIcon name="cil-chartPie" height="36" />
          </CWidgetProgressIcon>
          <CWidgetProgressIcon
            header={dashdetails.Vaccines_ad}
            text="Vaccines"
            color="gradient-danger"
            inverse
          >
            <CIcon name="cil-speedometer" height="36" />
          </CWidgetProgressIcon>
        </CCardGroup>
        <CCardBody>
          <CRow>
            <CCol sm="5">
              <h3 id="traffic" className="card-title mb-0">Continuous Care</h3>
              {/* <div className="small text-muted">September 2021</div> */}
            </CCol>
          </CRow>
          {/* <MainChartExample style={{height: '300px', marginTop: '40px'}}/> */}
          <Iframe width="100%" height="550px" src="https://datastudio.google.com/embed/reporting/c6041d77-a0b2-42dd-86da-6489602b5870/page/tEnnC" frameborder="0" style="border:0" allowfullscreen/>
        </CCardBody>
      </CCard>

    </>
  )
}

export default Dashboard;