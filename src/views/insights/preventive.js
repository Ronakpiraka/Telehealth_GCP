import React, {useEffect } from 'react'
import Charts from '../charts/Charts';
import DoughnutChart from '../charts/DoughnutChart'
import Iframe from 'react-iframe'

export default function Insights() {
  var dashboard;
  var QuickSightEmbedding = require("amazon-quicksight-embedding-sdk");

  const [data, setdata]=React.useState([]);

  return (
    <div>
      <Charts/>
      <Iframe width="100%" height="450px" src="https://lookerstudio.google.com/embed/reporting/c4611298-10ab-4b55-9625-33805ce06003/page/tEnnC" frameborder="0" style="border:0" allowfullscreen/>
    </div>
  )
}
