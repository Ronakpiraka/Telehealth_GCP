import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Notify from './Notify'
import {useHistory, useLocation} from "react-router-dom";
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject } from '@syncfusion/ej2-react-schedule';

export default function Calender() {
        var url
        console.log(url);
        const location = useLocation();
        let patient_name = location.search.split('=')[1];
        let doctor = location.search.split('=')[2];
        // const data = props.name;
        console.log(patient_name,doctor)
        const data = [
            {
                Id: 1,
                Subject: 'Meeting with '+ doctor,
                StartTime: new Date(),
                EndTime: new Date(),
                IsAllDay: false,
                Status: 'Incomplete',
                Priority: 'High',
                Location: "https://meet.google.com/ypu-vavo-riu",
                Description:  "Immediate consultation is setup with provider. Join using this meeting link."
            }
            
        ]
        // data = {props}
        // console.log(data)
        // this.data = [{
        //         Id: 2,
        //         Subject: 'Meeting with Dr. Kirsten Smith',
        //         StartTime: new Date(2021, 8, 16, 10, 0),
        //         EndTime: new Date(2021, 8, 16, 12, 30),
        //         IsAllDay: false,
        //         Status: 'Completed',
        //         Priority: 'High'
        //     },
        //     {
        //         Id: 3,
        //         Subject: 'Meeting with Dr. Lorenzo',
        //         StartTime: new Date(2021, 8, 20, 12, 0),
        //         EndTime: new Date(2021, 8, 20, 12, 30),
        //         IsAllDay: false,
        //         Status: 'Pending',
        //         Priority: 'High'
        //     },
        //     {
        //         Id: 4,
        //         Subject: 'Meeting with'+this.props.name,
        //         StartTime: new Date(2021, 8, 20, 12, 0),
        //         EndTime: new Date(2021, 8, 20, 12, 30),
        //         IsAllDay: false,
        //         Status: 'Pending',
        //         Priority: 'High'
        //     }
        // ];
        return (
        <>
        <ScheduleComponent height='550px' currentView='Month' eventSettings={{ dataSource: data,
            fields: {
                id: 'Id',
                subject: { name :'Subject'},
                isAllDay: { name: 'IsAllDay' },
                startTime: { name: 'StartTime' },
                endTime: { name: 'EndTime' }
            }
        }}>
      <Inject services={[Day, Week, WorkWeek, Month, Agenda]}/>
    </ScheduleComponent>;
    </>
    )
}