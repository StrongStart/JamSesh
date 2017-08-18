import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import style from 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import axios from 'axios';
import { CALENDAR_ID, API_KEY } from '../GoogleConfig.js';
const url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}`;


BigCalendar.momentLocalizer(moment);

export default class Calendar extends Component {
  constructor() {
    super();
    this.state = {
      events: [],
    };
    this.getEvents = this.getEvents.bind(this);
  }
  componentDidMount() {
    this.getEvents((e) => {
      this.setState({
        events: e,
      });
    });
  }
  getEvents(callback) {
    axios
    .get(url)
    .then((res) => {
      const events = [];
      res.data.items.forEach(event => {
        const start = new Date(event.start.date || event.start.dateTime);
        const end = new Date(event.end.date || event.end.dateTime);
        events.push({
          start,
          end,
          title: event.summary,
        });
      });
      callback(events);
    })
    .catch(err => {
      console.error(err);
    });
  }
  render() {
    return (
      <div className="container">
        <BigCalendar
          style={{ style, height: '600px' }}
          events={this.state.events}
          defaultDate={new Date()}
        />
      </div>
    );
  }
}
