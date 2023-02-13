import React, {useEffect } from 'react';
import './PatientInfo.css';
import 'antd/dist/antd.css';

export default function showmodal(props) {
    const { patientId } = props;
    console.log(patientId);
    const iframeurl = "https://lookerstudio.google.com/embed/reporting/c4611298-10ab-4b55-9625-33805ce06003/page/tEnnC?params=%7B%22df22%22:%22include%25EE%2580%25800%25EE%2580%2580IN%25EE%2580%2580"+patientId+"%22%7D"
    console.log(iframeurl)
    return (
      
      <>
        <h1 align="center"><b>Health Care Record</b></h1>
        <iframe src={iframeurl} width="800" height="450" allowFullScreen/>      
      </>
    )
}