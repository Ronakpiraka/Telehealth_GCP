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

const WidgetsDropdown = lazy(() => import('../widgets/WidgetsDropdown.js'))
// const WidgetsBrand = lazy(() => import('../widgets/WidgetsBrand.js'))

const Dashboard = () => {

  const [dashdetails, setdashdetails] = React.useState([]);

  async function fetchdashdetailsdata() {

    console.log("check function")
    var requestOptions = {
      method: 'GET'
    };

    const res = await fetch("https://dashboarddata-sh4iojyb3q-uc.a.run.app", requestOptions)
    const result = await res.json()
    console.log(result);
    // .then((resp) => resp.json())
    // .then((response) => {
    setdashdetails(result[0])
    //   console.log(dashdetails)
    // })
    // .catch(error => console.log('error', error));
  }

  useEffect(() => {
    // console.log("hello useeffect")
    fetchdashdetailsdata();
  }, [])

  console.log(dashdetails)

  return (
    <>
      <CRow>
      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-primary"
          header={dashdetails.total_patient_count}
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
          header={dashdetails.High_Risk_count}
          text="High Risk Patients"
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
          header={dashdetails.Med_Risk_count}
          text="Medium Risk Patients"
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
          header={dashdetails.Low_Risk_count}
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
            header={dashdetails.active_count}
            text="Providers"
            color="gradient-info"
            inverse
          >
            <CIcon name="cil-people" height="36" />
          </CWidgetProgressIcon>
          <CWidgetProgressIcon
            header={dashdetails.active_count}
            text="Practitioners"
            color="gradient-success"
            inverse
          >
            <CIcon name="cil-userFollow" height="36" />
          </CWidgetProgressIcon>
          <CWidgetProgressIcon
            header={dashdetails.Provider_count}
            text="Condition"
            color="gradient-warning"
            inverse
          >
            <CIcon name="cil-basket" height="36" />
          </CWidgetProgressIcon>
          <CWidgetProgressIcon
            header={dashdetails.care_insights_count}
            text="Procedures"
            color="gradient-primary"
            inverse
          >
            <CIcon name="cil-chartPie" height="36" />
          </CWidgetProgressIcon>
          <CWidgetProgressIcon
            header={dashdetails.claims_count}
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
          <Iframe width="100%" height="550px" src="https://datastudio.google.com/embed/reporting/16901bed-1e96-44c2-82c4-b92d4797b0ac/page/tEnnC" frameborder="0" style="border:0" allowfullscreen/>
        </CCardBody>
      </CCard>

    </>
  )
}

export default Dashboard