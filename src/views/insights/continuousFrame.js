import React from 'react'
import Iframe from 'react-iframe'
import {useLocation} from "react-router-dom";
import {useEffect, useState} from 'react'

const Continuous= () => {
    const location = useLocation();
    var flags;
    const [singlepatientid, setsinglepatientid] = useState('');

    useEffect(() => {

        flags = location.search.split('^')[1];
        // console.log(flags)
        let singlepatientid = location.search.split('=')[1];
        setsinglepatientid(singlepatientid)
    },[])
    if(singlepatientid)
    {    
        var insighturl ="https://lookerstudio.google.com/embed/reporting/16901bed-1e96-44c2-82c4-b92d4797b0ac/page/tEnnC?params=%7B%22df4%22:%22include%25EE%2580%25800%25EE%2580%2580IN%25EE%2580%2580"+singlepatientid+"%22%7D"
    }
    else
    {
        var insighturl = "https://lookerstudio.google.com/embed/reporting/c6041d77-a0b2-42dd-86da-6489602b5870/page/tEnnC"
    }
    
    return(

        <div>
            <h1 align="center"><b>Continuous Care</b></h1>
            <Iframe width="100%" height="380px" src={insighturl} frameborder="0" style="border:0" allowfullscreen/>
        </div>
    )
}

export default Continuous