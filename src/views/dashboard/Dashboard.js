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

import MainChartExample from '../charts/MainChartExample.js'

const WidgetsDropdown = lazy(() => import('../widgets/WidgetsDropdown.js'))
// const WidgetsBrand = lazy(() => import('../widgets/WidgetsBrand.js'))

const Dashboard = () => {
  return (
    <>
      <WidgetsDropdown />
      <CCard>
        <CCardBody>
          <CRow>
            <CCol sm="5">
              <h3 id="traffic" className="card-title mb-0">Preventive Care</h3>
              <div className="small text-muted">September 2021</div>
            </CCol>
            <CCol sm="7" className="d-none d-md-block">
              {/* <CButton color="primary" className="float-right">
                <CIcon name="cil-cloud-download"/>
              </CButton> */}
              {/* <CButtonGroup className="float-right mr-3">
                {
                  ['Day', 'Month', 'Year'].map(value => (
                    <CButton
                      color="outline-secondary"
                      key={value}
                      className="mx-0"
                      active={value === 'Month'}
                    >
                      {value}
                    </CButton>
                  ))
                }
              </CButtonGroup> */}
            </CCol>
          </CRow>
          <MainChartExample style={{height: '300px', marginTop: '40px'}}/>
        </CCardBody>
      <CCardGroup className="mb-4">
        <CWidgetProgressIcon
          header="850"
          text="New Patients"
          color="gradient-info"
          inverse
        >
          <CIcon name="cil-people" height="36"/>
        </CWidgetProgressIcon>
        <CWidgetProgressIcon
          header="385"
          text="Active Cases"
          color="gradient-success"
          inverse
        >
          <CIcon name="cil-userFollow" height="36"/>
        </CWidgetProgressIcon>
        <CWidgetProgressIcon
          header="1238"
          text="Facilities"
          color="gradient-warning"
          inverse
        >
          <CIcon name="cil-basket" height="36"/>
        </CWidgetProgressIcon>
        <CWidgetProgressIcon
          header="280"
          text="Care Insights"
          color="gradient-primary"
          inverse
        >
          <CIcon name="cil-chartPie" height="36"/>
        </CWidgetProgressIcon>
        <CWidgetProgressIcon
          header="5250"
          text="Insurance Code"
          color="gradient-danger"
          inverse
        >
          <CIcon name="cil-speedometer" height="36"/>
        </CWidgetProgressIcon>
      </CCardGroup>
      </CCard>
    </>
  )
}

export default Dashboard
