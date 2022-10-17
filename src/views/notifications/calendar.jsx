import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Notify from './Notify'
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject } from '@syncfusion/ej2-react-schedule';
export default class Calender extends React.Component {
    constructor(props) {
        console.log(props);
        super(...arguments);
        this.data = [{
                Id: 2,
                Subject: 'Meeting with Dr. Kirsten Smith',
                StartTime: new Date(2021, 8, 16, 10, 0),
                EndTime: new Date(2021, 8, 16, 12, 30),
                IsAllDay: false,
                Status: 'Completed',
                Priority: 'High'
            },
            {
                Id: 3,
                Subject: 'Meeting with Dr. Lorenzo',
                StartTime: new Date(2021, 8, 20, 12, 0),
                EndTime: new Date(2021, 8, 20, 12, 30),
                IsAllDay: false,
                Status: 'Pending',
                Priority: 'High'
            },
            {
                Id: 4,
                Subject: 'Meeting with'+this.props.name,
                StartTime: new Date(2021, 8, 20, 12, 0),
                EndTime: new Date(2021, 8, 20, 12, 30),
                IsAllDay: false,
                Status: 'Pending',
                Priority: 'High'
            }
        ];
    }
    render() {
        return (
        <>
            <Notify/>
        <ScheduleComponent height='550px' currentView='Month' eventSettings={{ dataSource: this.data,
            fields: {
                id: 'Id',
                subject: { name: 'Subject' },
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
}