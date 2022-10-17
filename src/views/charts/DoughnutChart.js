import React from 'react'
import {
  CCard,
  CCardBody,
  CCardGroup,
  CCardHeader
} from '@coreui/react'
import {
  CChartBar,
  CChartLine,
  CChartDoughnut,
  CChartRadar,
  CChartPie,
  CChartPolarArea
} from '@coreui/react-chartjs'
// import { DocsLink } from 'src/reusable'

const Charts = () => {

  return (
    <CCardGroup>
      {/* <CCard>
        <CCardHeader>
          Bar Chart
          <DocsLink href="http://www.chartjs.org"/>
        </CCardHeader>
        <CCardBody>
          <CChartBar
            datasets={[
              {
                label: 'GitHub Commits',
                backgroundColor: '#f87979',
                data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
              }
            ]}
            labels="months"
            options={{
              tooltips: {
                enabled: true
              }
            }}
          />
        </CCardBody>
      </CCard> */}

      {/* <CCard>
        <CCardHeader style={{backgroundColor:'#0A2533', color:'white'}}>
        <h2> AWS - Continuous Care</h2>
        </CCardHeader>
        <CCardBody style={{backgroundColor:'#0A2533', color:'white'}}>
          <CChartLine
            datasets={[
              {
                label: 'Oxygen',
                backgroundColor: 'rgb(252, 133, 13)',
                color: 'white',
                data: [30, 39, 10, 50, 30, 70, 35]
              },
              {
                label: 'Temperature',
                backgroundColor: 'rgb(10, 135, 175)',
                color: 'white',
                data: [39, 80, 40, 35, 40, 20, 45]
              }
            ]}
            options={{
              tooltips: {
                enabled: true
              }
            }}
            labels={['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']}
          />
        </CCardBody>
      </CCard> */}

      {/* <a href="https://us-east-1.quicksight.aws.amazon.com/sn/dashboards/9f786544-dc07-4370-8949-c848fcb21ed5/views/bb2141dd-052b-4b19-b0f4-a1ce3d9032a0" target="_blank"> */}
      <CCard>
        <CCardHeader style={{backgroundColor:'#0A2533', color:'white'}}>
         <h3 style={{ color:'white'}}>Preventive Care</h3> 
        </CCardHeader>
        <CCardBody style={{backgroundColor:'#0A2533', color:'white'}}>
          <CChartDoughnut
            datasets={[
              {
                backgroundColor: [
                  '#41B883',
                  '#E46651',
                  '#00D8FF',
                ],
                data: [150, 200, 80]
              }
            ]}
            labels={['Low Risk', 'Medium Risk', 'High Risk']}
            options={{
              tooltips: {
                enabled: true
              }
            }}
          />
        </CCardBody>
      </CCard>

      {/* <CCard>
        <CCardHeader>
          Pie Chart
        </CCardHeader>
        <CCardBody>
          <CChartPie
            datasets={[
              {
                backgroundColor: [
                  '#41B883',
                  '#E46651',
                  '#00D8FF',
                  '#DD1B16'
                ],
                data: [40, 20, 80, 10]
              }
            ]}
            labels={['VueJs', 'EmberJs', 'ReactJs', 'AngularJs']}
            options={{
              tooltips: {
                enabled: true
              }
            }}
          />
        </CCardBody>
      </CCard> */}

      {/* <CCard>
        <CCardHeader>
          Polar Area Chart
        </CCardHeader>
        <CCardBody>
          <CChartPolarArea
            datasets={[
              {
                label: 'My First dataset',
                backgroundColor: 'rgba(179,181,198,0.2)',
                pointBackgroundColor: 'rgba(179,181,198,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: 'rgba(179,181,198,1)',
                pointHoverBorderColor: 'rgba(179,181,198,1)',
                data: [65, 59, 90, 81, 56, 55, 40]
              },
              {
                label: 'My Second dataset',
                backgroundColor: 'rgba(255,99,132,0.2)',
                pointBackgroundColor: 'rgba(255,99,132,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: 'rgba(255,99,132,1)',
                pointHoverBorderColor: 'rgba(255,99,132,1)',
                data: [28, 48, 40, 19, 96, 27, 100]
              }
            ]}
            options={{
              aspectRatio: 1.5,
              tooltips: {
                enabled: true
              }
            }}
            labels={[
              'Eating', 'Drinking', 'Sleeping', 'Designing',
              'Coding', 'Cycling', 'Running'
            ]}
          />
        </CCardBody>
      </CCard> */}

      {/* <CCard>
        <CCardHeader>
          Radar Chart
        </CCardHeader>
        <CCardBody>
          <CChartRadar
            datasets={[
              {
                label: '2019',
                backgroundColor: 'rgba(179,181,198,0.2)',
                borderColor: 'rgba(179,181,198,1)',
                pointBackgroundColor: 'rgba(179,181,198,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(179,181,198,1)',
                tooltipLabelColor: 'rgba(179,181,198,1)',
                data: [65, 59, 90, 81, 56, 55, 40]
              },
              {
                label: '2020',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                pointBackgroundColor: 'rgba(255,99,132,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(255,99,132,1)',
                tooltipLabelColor: 'rgba(255,99,132,1)',
                data: [28, 48, 40, 19, 96, 27, 100]
              }
            ]}
            options={{
              aspectRatio: 1.5,
              tooltips: {
                enabled: true
              }
            }}
            labels={[
              'Eating', 'Drinking', 'Sleeping', 'Designing',
              'Coding', 'Cycling', 'Running'
            ]}
          />
        </CCardBody>
      </CCard> */}
    </CCardGroup>
  )
}

export default Charts
