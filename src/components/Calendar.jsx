import { Component, React } from 'react';
import moment from 'moment';
import BigCalendar from 'react-big-calendar';
import style from 'react-big-calendar/lib/css/react-big-calendar.css';

BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(moment)
);
class Calendar extends Component {
  render() {
    return (
      <BigCalendar
        style={{ style }}
        events={[]}
      />
    );
  }
}
export default Calendar;
