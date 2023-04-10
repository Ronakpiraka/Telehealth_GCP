import React, { useEffect, useState } from "react";
import * as ReactDOM from 'react-dom';
import Notify from './Notify'
import { useHistory, useLocation } from "react-router-dom";
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject } from '@syncfusion/ej2-react-schedule';

export default function Calender() {

    const [data, setdata] = useState();

    useEffect(() => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
          fetch("https://emailnotifications-sh4iojyb3q-uc.a.run.app/", requestOptions)
            .then(response => response.json())
            .then(data => {
                // Parse the API response to the format expected by the Scheduler component
                const events = data.map(event => ({
                  Id: event.Patient_id,
                  Subject: 'Online meeting with Practitioner '+event.Practitioner_name,
                  StartTime: event.App_Date,
                  EndTime: event.App_Date,
                  Status: 'Incomplete',
                  Priority: 'High',
                  Location: "https://meet.google.com/ypu-vavo-riu",
                  Description:  "Appointment is setup with practitioner "+event.Practitioner_name+". Please join the meeting through this online link: https://meet.google.com/ypu-vavo-riu"
                }))
                setdata(events)
            })
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
      }, []);

      console.log(data)
    return (
        <>
            <ScheduleComponent height='550px' currentView='Month'  eventSettings={{ dataSource: data }}>
                <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
            </ScheduleComponent>
        </>
    )
}