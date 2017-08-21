import React, { Component } from 'react';

export default class Calendar extends Component {
  constructor() {
    super();
    this.state = {
      events: [],
    };
  }
  render() {
    return (
      <div className="container">
        <iframe
          className="calendar"
          src="https://calendar.google.com/calendar/embed?src=lfhaqtrds93ei95e6g7qrbf0no%40group.calendar.google.com&ctz=America/Chicago" 
        >
        </iframe>
      </div>
    );
  }
}
