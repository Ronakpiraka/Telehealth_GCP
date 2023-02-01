import React, {useEffect } from 'react'
import Charts from '../charts/Charts';
export default function Insights() {
  var dashboard;
  var QuickSightEmbedding = require("amazon-quicksight-embedding-sdk");
  const [data, setdata]=React.useState([]);
  const [p_data, setp_data]=React.useState([]);
  useEffect(() => { 

     },[])

     return (
    <div>
      <Charts/>
      <p style={{color:'red'}}>Note: Click on the corner of the displayed reports to get a detailed view of the report </p>
    </div>
  )
}
