import React, { useEffect, useState } from "react";
import * as ReactDOM from 'react-dom';
import Notify from './Notify'
import { useHistory, useLocation } from "react-router-dom";
import LoadingOverlay from "react-loading-overlay";
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject } from '@syncfusion/ej2-react-schedule';

export default function Calender() {

    const [data, setdata] = useState();
    const [isLoading, setisLoading] = useState(true);
    const modifydate = (value, type) => {
        if (type == 'year') {
            return value.split('-')[0]
        } else if (type == 'month') {
            return value.split('-')[1]
        } else if (type == 'date') {
            return value.split('-')[2]
        }
    }
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
                    Subject: 'Online meeting with Practitioner ' + event.Practitioner_name,
                    StartTime: new Date(parseInt(modifydate(event.App_Date, 'year')), parseInt(modifydate(event.App_Date, 'month'))-1, parseInt(modifydate(event.App_Date, 'date')), parseInt(event.Timing), 0),
                    EndTime: new Date(parseInt(modifydate(event.App_Date,'year')),parseInt(modifydate(event.App_Date,'month'))-1,parseInt(modifydate(event.App_Date,'date')),parseInt(event.Timing)+1,0),
                    Status: 'Incomplete',
                    Priority: 'High',
                    Location: "https://meet.google.com/ypu-vavo-riu",
                    Description: "Appointment is setup with practitioner " + event.Practitioner_name + ". Please join the meeting through this online link: https://meet.google.com/ypu-vavo-riu"
                }))
                setdata({dataSource:events})
                setisLoading(false)
                console.log("event is here", events)
            })
            .catch(error => console.log('error', error));
    }, []);

    return (
        <>
            <ScheduleComponent height='550px' currentView='Month' eventSettings={data}>
                <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
            </ScheduleComponent>
            <LoadingOverlay
                active={isLoading}
                spinner
                text="Loading the content..."
                styles={{
                    height: "100%",
                    spinner: (base) => ({
                        ...base,
                        width: "50px",
                        "& svg circle": {
                            stroke: "rgba(255, 0, 0, 1)",
                        },
                    }),
                }}
      ></LoadingOverlay>
        </>
    )
}