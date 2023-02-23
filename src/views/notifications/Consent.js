import * as React from 'react';
import Radio from '@mui/material/Radio';
import "./Consent.css"
import "../records/patients.css";
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Button } from 'antd';
import { useHistory, useLocation } from "react-router-dom";
export default function RadioButtonsGroup() {
    const history = useHistory();
    const redirecttoConsent= () => {
        var url = `/notifications/email`;
        history.push(`${url}`);
     }
     const canvas = document.querySelector('canvas');
     const form = document.querySelector('.signature-pad-form');
     const clearButton = document.querySelector('.clear-button');
     const ctx = canvas.getContext('2d');
     let writingMode = false;
     canvas.addEventListener('pointerdown', handlePointerDown, {passive: true});
     canvas.addEventListener('pointerup', handlePointerUp, {passive: true});
     canvas.addEventListener('pointermove', handlePointerMove, {passive: true});
     const handlePointerDown = (event) => {
        writingMode = true;
        ctx.beginPath();
        const [positionX, positionY] = getCursorPosition(event);
        ctx.moveTo(positionX, positionY);
      }
      const handlePointerUp = () => {
        writingMode = false;
      }
      const handlePointerMove = (event) => {
        if (!writingMode) return
        const [positionX, positionY] = getCursorPosition(event);
        ctx.lineTo(positionX, positionY);
        ctx.stroke();
      }
      const getCursorPosition = (event) => {
        positionX = event.clientX - event.target.getBoundingClientRect().x;
        positionY = event.clientY - event.target.getBoundingClientRect().y;
        return [positionX, positionY];
      }
      ctx.lineWidth = 3;
      ctx.lineJoin = ctx.lineCap = 'round';
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        const imageURL = canvas.toDataURL();
        const image = document.createElement('img');
        image.src = imageURL;
        image.height = canvas.height;
        image.width = canvas.width;
        image.style.display = 'block';
        form.appendChild(image);
        clearPad();
      })
      const clearPad = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      clearButton.addEventListener('click', (event) => {
        event.preventDefault();
        clearPad();
      })
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
               
            </RadioGroup>
            <title>Signature Pad</title>
            <form class="signature-pad-form" action="#" method="POST">
            <p><b>Signature</b></p>
            <canvas height="100" width="300" class="signature-pad"></canvas>
            <p><a href="#" class="clear-button">Clear</a></p>
           
         </form>
        </FormControl><button type="button" className="btn btn-secondary btn-sm" style={{ cursor: 'pointer', padding: '1%', fontWeight: 'bolder' }} onClick={(e) => { redirecttoConsent(e); } }>Submit</button></>
        
  )
  
}
