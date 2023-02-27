import * as React from 'react';
import Radio from '@mui/material/Radio';
import "../records/patients.css";
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Button } from 'antd';
import { useHistory, useLocation } from "react-router-dom";
import SignatureCanvas from 'react-signature-canvas';
import ReactDOM from 'react-dom';
import styles from './Consent.css'
import Signature from './signature'

export default function RadioButtonsGroup() {
   
    const history = useHistory();
    const redirecttoConsent= () => {
        var url = `/notifications/email`;
        history.push(`${url}`);
     }
     
            return (
            <><FormControl>
                <FormLabel id="demo-radio-buttons-group-label"><b>Consent Form</b></FormLabel>
                <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="I dont"
                name="radio-buttons-group"
            >
                <FormControlLabel value="I do" control={<Radio />} label="I give my consent to share my EHR records with practitioner as well as provider ." />
                <FormControlLabel value="I do limited " control={<Radio />} label="I give my consent to share my EHR records with practitioner as well as provider for a period of 15 days prior to the completion of my appointment . " />
                <FormControlLabel value="I dont" control={<Radio />} label="I would not like my records to be disclosed." />
            </RadioGroup>
            <br></br>
            <FormLabel id="demo-radio-buttons-group-label"><b>Connected Care</b></FormLabel>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="Yes"
                name="radio-buttons-group"
            >   <p><b>Are you interested for vital tracking?</b></p>
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
             <br></br>  
            </RadioGroup>
            <title>Signature Pad</title>
            <form class="signature-pad-form" action="#" method="POST">
            <p><b>Signature</b></p>
            <Signature></Signature>
            
         </form>
        </FormControl><button type="button" className="btn btn-secondary btn-sm" style={{ cursor: 'pointer', padding: '1%', fontWeight: 'bolder' }} onClick={(e) => { redirecttoConsent(e); } }>Submit</button></>
        
  )
  
}

