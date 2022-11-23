import React from 'react'
import Iframe from 'react-iframe'
import {useLocation} from "react-router-dom";
import {useEffect, useState} from 'react'

const Preventive= () => {
    
    const location = useLocation();
    var flags;
    const [singlepatientid, setsinglepatientid] = useState('');

    useEffect(() => {

        flags = location.search.split('^')[1];
    
        console.log(flags)
    
        let singlepatientid = location.search.split('=')[1];
    
        console.log('-----------------singleorderid--------------------------------------')
    
        console.log(singlepatientid)
    
        console.log('-------------------------------------------------------')
    
        setsinglepatientid(singlepatientid)
    
    
    
    })
    if(singlepatientid){
        var insighturl = "https://datastudio.google.com/embed/reporting/c4611298-10ab-4b55-9625-33805ce06003/page/tEnnC?params=%7B%22df2%22:%22include%25EE%2580%25800%25EE%2580%2580IN%25EE%2580%2580"+singlepatientid+"%22%7D"
    }
    else
    {
        var insighturl = "https://datastudio.google.com/embed/reporting/eaef1a6b-44df-407f-920e-4f694336b08c/page/tEnnC"
    }
    

    return(
        <div>
            <Iframe width="100%" height="380px" src={insighturl} frameborder="0" style="border:0" allowfullscreen/>
        </div>
    )
}

export default Preventive