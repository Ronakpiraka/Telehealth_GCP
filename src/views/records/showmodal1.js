import React, {useEffect } from 'react';
import './PatientInfo.css';
import 'antd/dist/antd.css';

export default function showmodal1(props) {
    const { patientId } = props;
    console.log(patientId);
    const iframeurl = "https://datastudio.google.com/embed/reporting/16901bed-1e96-44c2-82c4-b92d4797b0ac/page/tEnnC?params=%7B%22df4%22:%22include%25EE%2580%25800%25EE%2580%2580IN%25EE%2580%2580"+patientId+"%22%7D"
    console.log(iframeurl)
    return (
      
      <>
        <h1 align="center"><b>Critical Care Record</b></h1>
        <iframe src={iframeurl} width="800" height="450" allowFullScreen/>      
      </>
    )
}