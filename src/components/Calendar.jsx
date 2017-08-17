import React, { Component } from 'react';
import moment from 'moment';
import BigCalendar from 'react-big-calendar';
import style from 'react-big-calendar/lib/css/react-big-calendar.css';

BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(moment)
);
class Calendar extends Component {
  render() {
    return (
      <div className="container">
        <h3>Calendar</h3>
        <BigCalendar
          style={{ height: '600px', width: 'auto' }}
          defaultView="month"
          events={[]}
        />
      </div>
    );
  }
}
export default Calendar;
