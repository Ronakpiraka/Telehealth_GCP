import React, {useEffect } from 'react'
import Charts from '../charts/Charts';
import DoughnutChart from '../charts/DoughnutChart'

export default function Insights() {
  var dashboard;
  var QuickSightEmbedding = require("amazon-quicksight-embedding-sdk");

  const [data, setdata]=React.useState([]);

  const fetchQSPrevData = () => {
    var requestOptions = {
      method: 'GET'
    };

    fetch("https://ev5we6ai81.execute-api.us-east-1.amazonaws.com/test-QS/anonymous-embed-sample2?mode=getUrl", requestOptions)
    .then((resp) => resp.json())
    .then((response) => {
      setdata(response.EmbedUrl)
      console.log(data)
    })
    .catch(error => console.log('error', error));
  }

  useEffect(() => { 
    fetchQSPrevData();
 },[])

 console.log(data)

  return (
    <div>
   <a href={data} target="_blank"><DoughnutChart/></a>
     {/* <img width="100%" height="450px" src={continuousimg}/> */}
     {/* <div id="embeddingContainer">{embedDashboard}</div>  */}
  
    {/* <iframe width="100%" height="450px" src={data} frameborder="0" allowFullScreen="true"></iframe>  */}
    {/* <a href="https://us-east-1.quicksight.aws.amazon.com/sn/dashboards/48be7a89-9b91-4b84-9154-545472a06a73/views/0e87f279-51a8-4e8d-83b6-42bcfe2d0d05" target="_blank"><Charts/></a>
   
    {/* <div>
        <DoughnutChart/>
    </div> */}
    {/* <iframe width="100%" height="450px" url="https://cvzg49w5bc.execute-api.us-east-1.amazonaws.com/test-QS/qsresource-sample"></iframe>  */}
    
    </div>
  )
}
